import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Photoswipe from 'vue-pswipe'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import navbarStyle from './style/navbar.scss'
import carouselStyle from './style/carousel.scss'
import aboutStyle from './style/about.scss'
import newsStyle from './style/news.scss'
import menuStyle from './style/menu.scss'
import locationStyle from './style/location.scss'
import takeawayStyle from './style/takeaway.scss'
import contactStyle from './style/contact.scss'
import footerStyle from './style/footer.scss'
import orderStyle from './style/order.scss'
import checkStyle from './style/check.scss'
import burgermenuStyle from './style/burgermenu.scss'
import baboutStyle from './style/babout.scss'
import btakeawayStyle from './style/btakeaway.scss'
import botherStyle from './style/bother.scss'
import bmenuStyle from './style/bmenu.scss'
import bnewsStyle from './style/bnews.scss'
import blocationStyle from './style/blocation.scss'
import bcontactStyle from './style/bcontact.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faMinus, faTimes, faTrashAlt, faEdit, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { Slide } from 'vue-burger-menu'
import vueFilePond from 'vue-filepond'
// 提取EXIF信息
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// 上傳時可以預覽到上傳的圖片
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import './style/filepond-plugin-image-preview.min.css'
import './style/filepond.min.css'
import 'wowjs/css/libs/animate.css'

// axios 預設傳送認證資訊
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(Photoswipe)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
Vue.use(Slide)
Vue.config.productionTip = false
library.add(faPlus, faMinus, faTimes, faTrashAlt, faEdit, faClipboardList)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const FilePond = vueFilePond(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)
Vue.component('file-pond', FilePond)

new Vue({
  router,
  store,
  navbarStyle,
  carouselStyle,
  aboutStyle,
  newsStyle,
  menuStyle,
  locationStyle,
  takeawayStyle,
  contactStyle,
  footerStyle,
  orderStyle,
  checkStyle,
  burgermenuStyle,
  baboutStyle,
  btakeawayStyle,
  botherStyle,
  bmenuStyle,
  bnewsStyle,
  blocationStyle,
  bcontactStyle,
  render: h => h(App)
}).$mount('#app')
