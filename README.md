# 艸頭黃 後台 API
## 關於我們 
### 資料欄位
- `image` 圖片名稱
- `introduction` 關於我們說明
### 查詢欄位
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
- 路徑為 `/update_about`，以 param 判斷要修改的項目
- 以 ID 修改圖片名稱、說明
- 只接受 `multipart/form-data` 格式，`id` 是 about 的 ID，`data` 是要修改的資料
```js
  {
    "id": "",
    "data": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
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
    "id": ""
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
- 路徑為 `/update_news`，以 param 判斷要修改的項目
- 以 ID 修改日期、標題、內容、網址
- 只接受 `application/json` 格式，`id` 是 news 的 ID，`data` 是要修改的資料
```js
  {
    "id": "",
    "data": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "id": "",
        "data": "",
        "title": "",
        "content": "",
        "url": ""
    }
  }
  ```
### 查詢欄位
- 請求方式為 **GET**
- 路徑為 `/menu`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "news": [
      {
        "id": "",
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
        "id": ""
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
- 路徑為 `/update_menu`，以 param 判斷要修改的項目
- 以 ID 修改項目名稱、圖片名稱、附註、價格
- 只接受 `multipart/form-data` 格式，`id` 是 menu 的 ID，`data` 是要修改的資料
```js
  {
    "id": "",
    "data": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "id": ""
        "name": "",
        "image": "",
        "notes": "",
        "price": 0
    }
  }
  ```
### 查詢欄位
- 請求方式為 **GET**
- 路徑為 `/menu`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "menu": [
      {
        "id": "",
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
- 路徑為 `/update_location`，以 param 判斷要修改的項目
- 以 ID 修改地址、公車資訊、捷運資訊
- 只接受 `application/json` 格式，`id` 是 location 的 ID，`data` 是要修改的資料
```js
  {
    "id": "",
    "data": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "id": ""
        "address": "",
        "fb": "",
        "ig": ""
    }
  }
  ```
### 查詢欄位
- 請求方式為 **GET**
- 路徑為 `/location`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "menu": [
      {
        "id": "",
        "address": "",
        "fb": "",
        "ig": ""
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
    "phone": 0,
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
### 查詢欄位
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
### 查詢欄位
- 請求方式為 **GET**
- 路徑為 `/contact`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "takeaway": [
        {
            "id": ""
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
- `logo_img` logo 圖片名稱
- `carousel` 輪播圖 圖片名稱
- `take_away_img` 線上預訂背景圖片名稱
- `take_away_notes` 線上預訂注意事項
- `open_time` 營業時間
- `phone` 連絡電話
- `fb` facebook 網址
- `ig` instagram 網址
### 修改
- 請求方式為 **PATCH**
- 路徑為 `/update_other`，以 param 判斷要修改的項目
- 以 ID 修改資料
- 只接受 `multipart/form-data` 格式，`id` 是 other 的 ID，`data` 是要修改的資料
```js
  {
    "id": "",
    "data": ""
  }
  ```
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
  ```js
  {
    "success": true,
    "message": "",
    "result": {
        "id": "",
        "logo_img": "",
        "carousel": ["","",""],
        "take_away_img": "",
        "take_away_notes": ["","",""],
        "open_time": "",
        "phone": "",
        "fb": "",
        "ig": ""
    }
  }
  ```
### 查詢欄位
- 請求方式為 **GET**
- 路徑為 `/other`
- 回傳相應狀態碼、是否成功、失敗訊息，資料格式為 JSON
```js
  {
    "success": true,
    "message": "",
    "other": [
      {
        "id": "",
        "logo_img": "",
        "carousel": ["","",""],
        "take_away_img": "",
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