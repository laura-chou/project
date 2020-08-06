import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import multer from 'multer'
import md5 from 'md5'
import dotenv from 'dotenv'
import path from 'path'
import FTPStorage from 'multer-ftp'
import fs from 'fs'
import db from './db.js'

dotenv.config()

const MongoStore = connectMongo(session)

const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))
app.use(session({
  secret: 'project',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  // session 有效期間
  cookie: {
    // 1000 毫秒 = 一秒鐘
    // 1000 毫秒 * 60 = 一分鐘
    // 1000 毫秒 * 60 * 30 = 三十分鐘
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未修改的 session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true,
  resave: true
}))

let storage
let imageName = ''
if (process.env.FTP === 'false') {
  // 開發環境將上傳檔案放本機
  storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'images/')
    },
    filename (req, file, cb) {
      cb(null, imageName + Date.now() + path.extname(file.originalname))
    }
  })
} else {
  // heroku 將上傳檔案放伺服器
  storage = new FTPStorage({
    // 上傳伺服器的路徑
    basepath: '/',
    // FTP 設定
    ftp: {
      host: process.env.FTP_HOST,
      secure: false,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD
    },
    destination (req, file, options, cb) {
      cb(null, options.basepath + imageName + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter (req, file, cb) {
    if (!file.mimetype.includes('image')) {
      // 觸發 multer 錯誤，不接受檔案
      // LIMIT_FORMAT 是自訂的錯誤 CODE，跟內建的錯誤 CODE 格式統一
      cb(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

app.listen(process.env.PORT, () => {
  console.log('已啟動')
})
// 新增使用者
app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    await db.users.create({
      account: req.body.account,
      password: md5(req.body.password)
    })
    res.status(200)
    res.send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 登入
app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )
    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: '' })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號或密碼錯誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 登出
app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
  // res.send(req.session.user !== undefined)
})

// 取得關於我們
app.get('/about', async (req, res) => {
  try {
    db.about.find({}, function (err, about) {
      if (!err && about.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', about })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得最新消息
app.get('/news', async (req, res) => {
  try {
    db.news.find({}, function (err, news) {
      if (!err && news.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', news })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得菜單
app.get('/menu', async (req, res) => {
  try {
    db.menu.find({}, function (err, menu) {
      if (!err && menu.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', menu })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得店家位置
app.get('/location', async (req, res) => {
  try {
    db.location.find({}, function (err, location) {
      if (!err && location.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', location })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得快取訂單
app.get('/takeaway', async (req, res) => {
  try {
    db.takeaway.find({}, function (err, takeaway) {
      if (!err && takeaway.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', takeaway })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得聯絡我們
app.get('/contact', async (req, res) => {
  try {
    db.contact.find({}, function (err, contact) {
      if (!err && contact.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', contact })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 取得其他
app.get('/other', async (req, res) => {
  try {
    db.other.find({}, function (err, other) {
      if (!err && other.length > 0) {
        res.status(200)
        res.send({ success: true, message: '所有項目', other })
      } else {
        res.status(400)
        res.send({ success: false, message: '資料庫沒有資料' })
      }
    })
  } catch (error) {
    // 找不到東西
    res.status(404)
    res.send({ success: false, message: '找不到' })
  }
})
// 顯示圖片
app.get('/file/:name', async (req, res) => {
  if (process.env.FTP === 'false') {
    const path = process.cwd() + '/images/' + req.params.name
    const exists = fs.existsSync(path)
    if (exists) {
      res.status(200)
      res.sendFile(path)
    } else {
      res.status(404)
      res.send({ success: false, message: '找不到圖片' })
    }
  } else {
    res.redirect('http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.name)
  }
})
// 新增聯絡我們
app.post('/new_contact', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  if (req.body.name === '' || req.body.email === '' || req.body.message === '') {
    res.status(400)
    res.send({ success: false, message: '欄位未填寫' })
    return
  }
  try {
    const result = await db.contact.create(
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: req.body.date
      }
    )
    console.log('新增聯絡我們\n' + result)
    res.status(200)
    res.send({ success: true, message: '送出成功' })
  } catch (error) {
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.status(400)
    res.send({ success: false, message })
  }
})
// 新增快取訂單
app.post('/new_order', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await db.takeaway.create(
      {
        date: req.body.date,
        order_time: req.body.order_time,
        customer: req.body.customer,
        phone: req.body.phone,
        take_time: req.body.take_time,
        items: req.body.items,
        total: req.body.total
      }
    )
    console.log('新增快取訂單\n' + result)
    res.status(200)
    res.send({ success: true, message: '送出成功' })
  } catch (error) {
    const key = Object.keys(error.errors)[0]
    const message = error.errors[key].message
    res.status(400)
    res.send({ success: false, message })
  }
})
// 新增關於我們
app.post('/add_about', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  imageName = 'about'
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let name = ''
        if (req.file === undefined) {
          name = req.body.image
        } else {
          if (process.env.FTP === 'true') {
            name = path.basename(req.file.path)
          } else {
            name = req.file.filename
          }
        }
        const result = await db.about.create(
          {
            image: name,
            introduction: req.body.introduction
          }
        )
        res.status(200)
        res.send({ success: true, message: '儲存成功', name, _id: result._id })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// 刪除關於我們
app.delete('/delete_about/:id', async (req, res) => {
  try {
    const result = await db.about.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// 刪除最新消息
app.delete('/delete_news/:id', async (req, res) => {
  try {
    const result = await db.news.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 修改最新消息
app.patch('/update_news/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.news.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '儲存成功', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})
// 新增最新消息
app.post('/add_news', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.news.create(
      {
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
        url: req.body.url
      }
    )
    res.status(200)
    res.send({ success: true, message: '新增成功', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})
// 修改店家位置
app.patch('/update_location/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.location.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '儲存成功', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})
// 刪除快取訂單
app.delete('/delete_takeaway/:id', async (req, res) => {
  try {
    const result = await db.takeaway.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 刪除聯絡我們
app.delete('/delete_contact/:id', async (req, res) => {
  try {
    const result = await db.contact.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 新增其他
app.post('/add_other', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  imageName = 'other'
  upload.array('image', 5)(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        const pic = ['', '', '', '', '']
        // 原本圖片字串轉陣列
        const filenamearr = req.body.filename.split(',')
        // 找出未更改的圖片
        for (let i = 0; i < filenamearr.length; i++) {
          for (const nochange of req.body.image) {
            if (filenamearr[i] === nochange) {
              pic[i] = nochange
            }
          }
        }
        let index = 0
        for (let i = 0; i < pic.length; i++) {
          if (pic[i] === '') {
            pic[i] = path.basename(req.files[index].path)
            index++
          }
        }
        const body = req.body
        const notesarr = body.take_away_notes.split('===')
        const other = await db.other.create(
          {
            logo_img: pic[0],
            carousel: [pic[1], pic[2], pic[3]],
            take_away_img: pic[4],
            take_away_notes: [notesarr[0], notesarr[1], notesarr[2]],
            open_time: body.open_time,
            phone: body.phone,
            fb: body.fb,
            ig: body.ig
          }
        )
        res.status(200)
        res.send({ success: true, message: '儲存成功', other })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// 刪除其他
app.delete('/delete_other/:id', async (req, res) => {
  try {
    const result = await db.other.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 刪除菜單
app.delete('/delete_menu/:id', async (req, res) => {
  try {
    const result = await db.menu.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404)
      res.send({ success: true, message: '找不到資料' })
    } else {
      res.status(200)
      res.send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      // ID 格式不是 MongoDB 的格式
      res.status(400)
      res.send({ success: false, message: 'ID 格式錯誤' })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})
// 新增菜單
// 新增關於我們
app.post('/add_menu', async (req, res) => {
  if (!req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  imageName = 'menu'
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      // 上傳錯誤
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else {
        message = '格式不符'
      }
      res.status(400)
      res.send({ success: false, message })
    } else if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        console.log(req.body)
        console.log(req.file)
        let filename = ''
        if (process.env.FTP === 'true') {
          filename = path.basename(req.file.path)
        } else {
          filename = req.file.filename
        }
        const result = await db.menu.create(
          {
            name: req.body.name,
            image: filename,
            notes: req.body.notes,
            price: parseInt(req.body.price)
          }
        )
        res.status(200)
        res.send({ success: true, message: '儲存成功', result, _id: result._id })
      } catch (error) {
        if (error.name === 'ValidationError') {
          // 資料格式錯誤
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400)
          res.send({ success: false, message })
        } else {
          // 伺服器錯誤
          res.status(500)
          res.send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
})
// 修改菜單
app.patch('/update_menu/:id', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }
  try {
    const result = await db.menu.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200)
    res.send({ success: true, message: '儲存成功', result })
  } catch (error) {
    res.status(500)
    res.send({ success: false, message: '發生錯誤' })
  }
})
