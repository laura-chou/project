<template>
  <div id="backstage">
    <div id="bnavbar">
      <component :is="currentMenu" :right='false'>
        <b-nav-item @click="navbar('about')"><b-img src="./img/about.png" alt="關於我們"></b-img>關於我們</b-nav-item>
        <b-nav-item @click="navbar('new')"><b-img src="./img/new.png" alt="最新消息"></b-img>最新消息</b-nav-item>
        <b-nav-item @click="navbar('menu')"><b-img src="./img/menu.png" alt="菜單"></b-img>菜單</b-nav-item>
        <b-nav-item @click="navbar('location')"><b-img src="./img/location.png" alt="店家位置"></b-img>店家位置</b-nav-item>
        <b-nav-item @click="navbar('take-away')"><b-img src="./img/take-away.png" alt="預定訂單"></b-img>預定訂單</b-nav-item>
        <b-nav-item @click="navbar('message')"><b-img src="./img/message.png" alt="訪客留言"></b-img>訪客留言</b-nav-item>
        <b-nav-item @click="navbar('other')"><b-img src="./img/photo.png" alt="其他"></b-img>其他</b-nav-item>
        <b-nav-item @click="logout"><b-img src="./img/logout.png" alt="登出"></b-img>登出</b-nav-item>
      </component>
    </div>
    <main id="page-wrap">
      <div v-if="this.page == 'about'">
        <babout/>
      </div>
      <div v-if="this.page == 'new'">
        <bnews/>
      </div>
      <div v-if="this.page == 'menu'">
        <bmenu/>
      </div>
      <div v-if="this.page == 'location'">
        <blocation/>
      </div>
      <div v-if="this.page == 'take-away'">
        <btakeaway/>
      </div>
      <div v-if="this.page == 'message'">
        <bcontact/>
      </div>
      <div v-if="this.page == 'other'">
        <bother/>
      </div>
    </main>
  </div>
</template>
<script>
import slide from '@/components/Burgermenu.vue'
import babout from '@/components/Babout.vue'
import bnews from '@/components/Bnews.vue'
import bmenu from '@/components/Bmenu.vue'
import blocation from '@/components/Blocation.vue'
import btakeaway from '@/components/Btakeaway.vue'
import bcontact from '@/components/Bcontact.vue'
import bother from '@/components/Bother.vue'
// 禁止返回插件
import preventBack from 'vue-prevent-browser-back'
export default {
  name: 'Backstage',
  mixins: [preventBack],
  data () {
    return {
      page: 'about',
      menus: {
        slide: { buttonText: 'Slide' }
      },
      side: 'left',
      currentMenu: 'slide',
      islogin: ''
    }
  },
  components: {
    slide,
    babout,
    bnews,
    bmenu,
    blocation,
    btakeaway,
    bcontact,
    bother
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    navbar (page) {
      this.page = page
      if (page === 'take-away') {
        this.$store.commit('catch', true)
      } else {
        this.$store.commit('catch', false)
      }
    },
    heartbeat () {
      if (this.$store.getters.check_user) {
        this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat')
          .then(response => {
            const data = response.data
            // 如果是登入中
            if (this.user.length > 0) {
            // 如果後端登入時間過期
              if (!data) {
                (async () => {
                  await this.$swal.fire({
                    icon: 'error',
                    title: '登入時效已過',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 1500
                  }).then((result) => {
                    this.$store.commit('logout')
                    // 如果現在不是在首頁，跳到登出後的首頁
                    if (this.$route.path !== '/') {
                      this.$router.push('/')
                      clearInterval(this.islogin)
                      this.$store.commit('checkUser', false)
                    }
                  })
                })()
              }
            }
          })
          .catch(() => {
            (async () => {
              await this.$swal.fire({
                icon: 'error',
                title: '發生錯誤',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                this.$store.commit('logout')
                // 如果現在不是在首頁，跳到登出後的首頁
                if (this.$route.path !== '/') {
                  this.$router.push('/')
                  clearInterval(this.islogin)
                  this.$store.commit('checkUser', false)
                }
              })
            })()
          })
      }
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: '登出成功',
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                // 呼叫 vuex 的登出
                this.$store.commit('logout')
                // 如果現在不是在首頁，跳到登出後的首頁
                if (this.$route.path !== '/') {
                  this.$router.push('/')
                  clearInterval(this.islogin)
                  this.$store.commit('checkUser', false)
                }
              })
            })()
          } else {
            (async () => {
              await this.$swal.fire({
                icon: 'error',
                title: data.message,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: '確定'
              })
            })()
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: error.response.data.message,
              allowOutsideClick: false,
              showCancelButton: true,
              confirmButtonText: '確定'
            })
          })()
        })
    }
  },
  mounted () {
    this.heartbeat()
    this.islogin = setInterval(() => {
      this.heartbeat()
    }, 1000 * 10)
  }
}
</script>
