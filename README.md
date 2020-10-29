# 艸頭黃 後端 API
## 關於我們 
### 資料欄位
- `image` 圖片名稱
- `introduction` 關於我們說明
### 查詢
- 請求方式為 **GET**
- 路徑為 `/about`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "about": [
      {
        "id": "",
        "image": "",
        "introduction": ""
      }
    ]
  }
  ```
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_about`，以 id 判斷要修改的項目
- 只接受 `multipart/form-data` 格式，`image` 是要上傳的圖片，`introduction` 是說明
```js
    "image": "",
    "introduction": ""
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "_id": "",
      "image": "",
      "introduction": ""
    }
  }
  ```
---
## 最新消息 
### 資料欄位
- `date` 日期
- `title` 標題
- `content` 內容
- `url` 網址
### 新增
- 請求方式為 **POST**
- 路徑為 `/add_news`
- 只接受 `application/json` 格式
  ```js
  {
    "date": "",
    "title": "",
    "content": "",
    "url": ""
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "_id": "",
      "date": "",
      "title": "",
      "content": "",
      "url": ""
    }
  }
  ```
### 刪除
- 請求方式為 **DELETE**
- 路徑為 `/delete_news`，以 ID 判斷要修改的項目
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
  }
  ```
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_news`，以 id 判斷要修改的項目
- 只接受 `application/json` 格式
- `date` 是要修改的日期，`title` 是要修改的標題，`content` 是要修改的內容，`url` 是要修改的網址
```js
  {
    "date": "",
    "title": "",
    "content": "",
    "url": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "_id": "",
        "data": "",
        "title": "",
        "content": "",
        "url": ""
    }
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/menu`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "news": [
      {
        "_id": "",
        "data": "",
        "title": "",
        "content": "",
        "url": ""
      }
      // 其他最新消息...
    ]
  }
  ```
---
## 菜單介紹 
### 資料欄位
- `name` 項目名稱
- `image` 圖片名稱
- `notes` 附註
- `price` 價格
### 新增
- 請求方式為 **POST**
- 路徑為 `/add_menu`
- 只接受 `multipart/form-data` 格式
  ```js
  {
    "name": "",
    "image": "",
    "notes": "",
    "price": 0
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "_id": ""
        "name": "",
        "image": "",
        "notes": "",
        "price": 0
    }
  }
  ```
### 刪除
- 請求方式為 **DELETE**
- 路徑為 `/delete_menu`，以 ID 判斷要修改的項目
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
  }
  ```
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_menu`，以 ID 判斷要修改的項目
- 只接受 `multipart/form-data` 格式
- `name` 是要修改的項目名稱，`image` 是要修改的圖片名稱，`notes` 是要修改的附註，`price` 是要修改的價格
```js
  "name": "",
  "image": "",
  "notes": "",
  "price": 0
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "_id": ""
        "name": "",
        "image": "",
        "notes": "",
        "price": 0
    }
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/menu`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "menu": [
      {
        "_id": "",
        "name": "",
        "image": "",
        "notes": "",
        "price": 0
      }
      // 其他菜單...
    ]
  }
  ```
---
## 店家位置 
### 資料欄位
- `address` 地址
- `bus` 公車資訊
- `metro` 捷運資訊
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_location`，以 ID 判斷要修改的項目
- 只接受 `application/json` 格式
- 以 ID 修改地址、公車資訊、捷運資訊
- `address` 是地址，`bus` 是公車資訊，`metro` 是捷運資訊
```js
  {
    "address": "",
    "bus": "",
    "metro": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "_id": "",
      "address": "",
      "bus": "",
      "metro": ""
    }
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/location`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "location": [
      {
        "_id": "",
        "address": "",
        "bus": "",
        "metro": ""
      }
    ]
  }
  ```
---
## 線上預定 
### 資料欄位
- `date` 日期
- `order_time` 下訂時間
- `customer` 訂購人
- `phone` 電話號碼
- `take_time` 取餐時間
- `items` 預定項目
    - `name` 項目名稱
    - `count` 數量
    - `price` 價格
- `total` 總金額
### 新增
- 請求方式為 **POST**
- 路徑為 `/new_order`
- 只接受 `application/json` 格式
  ```js
  {
    "date": "",
    "order_time": "",
    "customer": "",
    "phone": "",
    "take_time": "",
    "items": [
        {
        "name": "",
        "count": 0,
        "price": 0
        }
    ],
    "total": 0
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 刪除
- 請求方式為 **DELETE**
- 路徑為 `/delete_takeaway`，以 ID 判斷要修改的項目
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/takeaway`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "takeaway": [
      {
        "date": "",
        "order_time": "",
        "customer": "",
        "phone": 0,
        "take_time": "",
        "items": [
            {
            "name": "",
            "count": 0,
            "price": 0
            },
            // 其他預定項目
        ],
        "total": 0
      }
    ]
  }
  ```
---
## 是否接單開關 
### 資料欄位
- `isopen` 是否接單
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_open`
- 只接受 `application/json` 格式
```js
  {
    "isopen": boolean
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/open`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "open": boolean
  }
  ```
---
## 聯絡我們 
### 資料欄位
- `name` 姓名
- `email` 電子郵件
- `message` 訊息
- `date` 日期
### 新增
- 請求方式為 **POST**
- 路徑為 `/new_contact`
- 只接受 `application/json` 格式
  ```js
  {
    "name": "",
    "email": "",
    "message": "",
    "date": ""
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 刪除
- 請求方式為 **DELETE**
- 路徑為 `/delete_contact`，以 ID 判斷要修改的項目
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/contact`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "takeaway": [
        {
            "_id": ""
            "name": "",
            "email": "",
            "message": "",
            "date": ""
        },
        // 其他聯絡人
    ]
  }
  ```
---
## 其他 
### 資料欄位
- `page` 頁面 (輪播圖、背景圖、文字訊息) 名稱
- `menubg_img` 菜單介紹背景圖片名稱
- `carousel` 輪播圖 圖片名稱
- `take_away_img` 線上預訂背景圖片名稱
- `contactbg_img` 聯絡我們背景圖片名稱
- `take_away_notes` 線上預訂注意事項
- `open_time` 營業時間
- `phone` 連絡電話
- `fb` facebook 網址
- `ig` instagram 網址
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_other`，以 ID 判斷要修改的項目
- 只接受 `multipart/form-data` 格式
- 如果 `page` 是 `carousel`
- `page` 是輪播圖，`image` 是要修改的圖片，`filename` 是現在使用的圖片名稱
  ```js
  "page": "carousel",
  "image": ["", "", ""],
  "filename": ["", "", ""]
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "carousel": ["","",""]
    }
  }
  ```
- 如果 `page` 是 `background`
- `page` 是背景圖，`image` 是要修改的圖片，`filename` 是現在使用的圖片名稱
  ```js
  "page": "background",
  "image": ["", "", ""],
  "filename": ["", "", ""]
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "menubg_img": "",
      "take_away_img": "",
      "contactbg_img": ""
    }
  }
  ```
- 如果 `page` 是 `message`
- `page` 是文字訊息，`take_away_notes` 是要修改的注意事項(將三項注意事項串成字串，中間用`===`隔開，例如：事項1===事項2===事項3)，`open_time` 是要修改的營業時間，`phone`是要修改的連絡電話，`fb`是要修改的facebook網址，`ig`是要修改的instagram網址
  ```js
  "page": "message",
  "take_away_notes": "",
  "open_time": "",
  "phone": "",
  "fb": "",
  "ig": "",
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
      "take_away_notes": ["", "", ""],
      "open_time": "",
      "phone": "",
      "fb": "",
      "ig": "",
    }
  }
  ```
### 查詢
- 請求方式為 **GET**
- 路徑為 `/other`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "other": [
      {
        "_id": "",
        "carousel": ["","",""],
        "menubg_img": "",
        "take_away_img": "",
        "contactbg_img": "",
        "take_away_notes": ["","",""],
        "open_time": "",
        "phone": "",
        "fb": "",
        "ig": ""
      }
    ]
  }
  ```
---
## 店家管理帳號 
### 資料欄位
- `account` 帳號
- `password` 密碼
### 登入
- 請求方式為 **POST**
- 路徑為 `/login`
- 只接受 `application/json` 格式
  ```js
  {
    "account": "",
    "password": "",
  }
  ```
  - 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": ""
  }
  ```
### 登出
- 請求方式為 **DELETE**
- 路徑為 `/logout`
- 回傳相應狀態碼、是否成功、失敗訊息及 ID，資料格式為 JSON
  ```js
  {
  "success": true,
  "message": ""
  }
  ```