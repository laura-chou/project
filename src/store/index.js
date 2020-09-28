import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    // navbar
    logo: '',
    // 輪播圖
    carousel: [],
    // 關於我們 (id、圖片、介紹)
    aboutId: '',
    aboutImg: '',
    aboutIntro: '',
    // 最新消息
    news: [],
    // 菜單介紹(菜單、數量)
    menu: [],
    counts: [],
    // 店家位置 (id、地址、公車資訊、捷運資訊)
    locationId: '',
    locationAddress: '',
    locationBus: '',
    locationMetro: '',
    // 預定訂單 (圖片、注意事項、訂單)
    takeawayImg: '',
    takeawayNotes: [],
    // 快取訂單(訂購人、電話、時間、項目、數量)
    orderCustomer: '',
    orderPhone: '',
    orderTime: '',
    orderItems: [],
    orderCount: [],
    // 接收訂單(開關、呼叫api)
    open: false,
    catch: false,
    // footer
    openTime: '',
    phone: '',
    fb: '',
    ig: '',
    otherId: ''
  },
  getters: {
    user (state) {
      return state.user
    },
    // navbar
    logo (state) {
      return state.logo
    },
    // 輪播圖
    carousel (state) {
      return state.carousel
    },
    // 關於我們 (id、圖片、介紹)
    about_id (state) {
      return state.aboutId
    },
    about_img (state) {
      return state.aboutImg
    },
    about_intro (state) {
      return state.aboutIntro
    },
    // 最新消息
    news (state) {
      return state.news
    },
    // 菜單介紹
    menu (state) {
      return state.menu
    },
    counts (state) {
      return state.counts
    },
    // 店家位置 (id、地址、公車資訊、捷運資訊)
    location_id (state) {
      return state.locationId
    },
    location_address (state) {
      return state.locationAddress
    },
    location_bus (state) {
      return state.locationBus
    },
    location_metro (state) {
      return state.locationMetro
    },
    // 快取訂單(訂購人、電話、時間、項目、數量)
    order_customer (state) {
      return state.orderCustomer
    },
    order_phone (state) {
      return state.orderPhone
    },
    order_time (state) {
      return state.orderTime
    },
    order_items (state) {
      return state.orderItems
    },
    order_count (state) {
      return state.orderCount
    },
    // 預定訂單 (圖片、注意事項)
    takeaway_img (state) {
      return state.takeawayImg
    },
    takeaway_notes (state) {
      return state.takeawayNotes
    },
    // 接收訂單(開關、呼叫api)
    open (state) {
      return state.open
    },
    catch (state) {
      return state.catch
    },
    // footer
    open_time (state) {
      return state.openTime
    },
    phone (state) {
      return state.phone
    },
    fb (state) {
      return state.fb
    },
    ig (state) {
      return state.ig
    },
    other_id (state) {
      return state.otherId
    }
  },
  mutations: {
    login (state, data) {
      state.user = data
    },
    logout (state) {
      state.user = ''
    },
    // navbar
    logo (state, data) {
      state.logo = data
    },
    // 輪播圖
    carousel (state, data) {
      state.carousel = data
    },
    // 關於我們 (id、圖片、介紹)
    aboutId (state, data) {
      state.aboutId = data
    },
    aboutImg (state, data) {
      state.aboutImg = data
    },
    aboutIntro (state, data) {
      state.aboutIntro = data
    },
    // 最新消息
    news (state, data) {
      state.news = data
    },
    // 菜單介紹
    menu (state, data) {
      state.menu = data
    },
    counts (state, data) {
      state.counts = data
    },
    // 店家位置 (id、地址、公車資訊、捷運資訊)
    locationId (state, data) {
      state.locationId = data
    },
    locationAddress (state, data) {
      state.locationAddress = data
    },
    locationBus (state, data) {
      state.locationBus = data
    },
    locationMetro (state, data) {
      state.locationMetro = data
    },
    // 預定訂單 (圖片、注意事項)
    takeawayImg (state, data) {
      state.takeawayImg = data
    },
    takeawayNotes (state, data) {
      state.takeawayNotes = data
    },
    // 快取訂單(訂購人、電話、時間、項目、數量)
    orderCustomer (state, data) {
      state.orderCustomer = data
    },
    orderPhone (state, data) {
      state.orderPhone = data
    },
    orderTime (state, data) {
      state.orderTime = data
    },
    orderItems (state, data) {
      state.orderItems = data
    },
    orderCount (state, data) {
      state.orderCount = data
    },
    // 接收訂單(開關、呼叫api)
    open (state, data) {
      state.open = data
    },
    catch (state, data) {
      state.catch = data
    },
    // footer
    openTime (state, data) {
      state.openTime = data
    },
    phone (state, data) {
      state.phone = data
    },
    fb (state, data) {
      state.fb = data
    },
    ig (state, data) {
      state.ig = data
    },
    otherId (state, data) {
      state.otherId = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedstate()]
})