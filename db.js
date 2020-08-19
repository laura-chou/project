import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

dotenv.config()

const Schema = mongoose.Schema
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.plugin(beautifyUnique)
mongoose.set('useFindAndModify', false)

// 使用者
const userSchema = new Schema({
  account: {
    type: String,
    unique: '帳號已使用',
    required: [true, '請輸入帳號']
  },
  password: {
    type: String,
    required: [true, '請輸入密碼']
  }
}, {
  versionKey: false
})
// 關於我們
const aboutSchema = new Schema({
  image: {
    type: String
  },
  introduction: {
    type: String,
    maxlength: [500, '說明必須五百字以下']
  }
}, {
  versionKey: false
})
// 最新消息
const newsSchema = new Schema({
  date: {
    type: String
  },
  title: {
    type: String,
    required: [true, '標題必填']
  },
  content: {
    type: String,
    required: [true, '內容必填']
  },
  url: {
    type: String
  }
}, {
  versionKey: false
})
// 菜單
const menuSchema = new Schema({
  name: {
    type: String,
    required: [true, '名稱必填']
  },
  image: {
    type: String,
    required: [true, '圖片必填']
  },
  notes: {
    type: String,
    required: [true, '附註必填']
  },
  price: {
    type: Number,
    required: [true, '價錢必填']
  }
}, {
  versionKey: false
})
// 店家位置
const locationSchema = new Schema({
  address: {
    type: String,
    required: [true, '地址必填']
  },
  bus: {
    type: String,
    maxlength: [200, '說明必須兩百字以下']
  },
  metro: {
    type: String,
    maxlength: [200, '說明必須兩百字以下']
  }
}, {
  versionKey: false
})
// 快取訂單
const takeawaySchema = new Schema({
  date: {
    type: String
  },
  order_time: {
    type: String
  },
  customer: {
    type: String,
    required: [true, '姓名必填']
  },
  phone: {
    type: Number,
    required: [true, '電話必填']
  },
  take_time: {
    type: String
  },
  items: [
    {
      name: String,
      count: Number,
      price: Number
    }
  ],
  total: {
    type: Number
  }
}, {
  versionKey: false
})
// 聯絡我們
const contactSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: String
  }
}, {
  versionKey: false
})
// 其他
const otherSchema = new Schema({
  logo_img: {
    type: String
  },
  carousel: [String, String, String],
  take_away_img: {
    type: String
  },
  take_away_notes: [String, String, String],
  address: {
    type: String
  },
  open_time: {
    type: String
  },
  phone: {
    type: String
  },
  fb: {
    type: String
  },
  ig: {
    type: String
  }
}, {
  versionKey: false
})
const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const about = mongoose.model(process.env.COLLECTION_ABOUT, aboutSchema)
const news = mongoose.model(process.env.COLLECTION_NEWS, newsSchema)
const menu = mongoose.model(process.env.COLLECTION_MENU, menuSchema)
const location = mongoose.model(process.env.COLLECTION_LOCATION, locationSchema)
const takeaway = mongoose.model(process.env.COLLECTION_TAKEAWAY, takeawaySchema)
const contact = mongoose.model(process.env.COLLECTION_CONTACT, contactSchema)
const other = mongoose.model(process.env.COLLECTION_OTHER, otherSchema)
const connection = mongoose.connection

export default {
  users,
  about,
  news,
  menu,
  location,
  takeaway,
  contact,
  other,
  connection
}
