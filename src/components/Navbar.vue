<template>
  <div id="navbar" class="fixed-top">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="logo">
          <a href="#" v-scroll-to="{ el: '#navbar', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" ><b-img :src="logo" fluid alt="艸頭黃"></b-img></a>
      </div>
      <b-navbar-toggle id="navbar-toggle" target="nav-collapse" @click="navbartoggle"></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="justify-content-end" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" v-scroll-to="{ el: '#about', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/about.png" alt="關於我們"></b-img>關於我們</b-nav-item>
          <b-nav-item href="#" v-scroll-to="{ el: '#news', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/new.png" alt="最新消息"></b-img>最新消息</b-nav-item>
          <b-nav-item href="#" v-scroll-to="{ el: '#menu', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/menu.png" alt="菜單介紹"></b-img>菜單介紹</b-nav-item>
          <b-nav-item href="#" v-scroll-to="{ el: '#location', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/location.png" alt="店家位置"></b-img>店家位置</b-nav-item>
          <b-nav-item href="#" v-scroll-to="{ el: '#takeaway', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/take-away.png" alt="預定快取"></b-img>線上預定</b-nav-item>
          <b-nav-item href="#" v-scroll-to="{ el: '#contact', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" @click="navbaritem"><b-img src="./img/message.png" alt="聯絡我們"></b-img>聯絡我們</b-nav-item>
          <b-nav-item @click="signin"><b-img src="./img/employee.png" alt="店家管理"></b-img>店家管理</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>

export default {
  data () {
    return {
      toggle: true
    }
  },
  computed: {
    logo () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.logo
      return img
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/other')
      .then(response => {
        this.$store.commit('logo', response.data.other[0].logo_img)
        this.$store.commit('carousel', response.data.other[0].carousel)
        this.$store.commit('takeawayImg', response.data.other[0].take_away_img)
        this.$store.commit('takeawayNotes', response.data.other[0].take_away_notes)
        this.$store.commit('openTime', response.data.other[0].open_time)
        this.$store.commit('phone', response.data.other[0].phone)
        this.$store.commit('fb', response.data.other[0].fb)
        this.$store.commit('ig', response.data.other[0].ig)
        this.$store.commit('otherId', response.data.other[0]._id)
      })
      .catch(() => {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '發生錯誤',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      })
  },
  methods: {
    navbaritem () {
      const navbaricon = document.getElementsByClassName('navbar-toggler-icon')
      navbaricon[0].style.animation = ''
      if (this.toggle) {
        navbaricon[0].style.animation = 'rotate_right 1s ease 1'
        navbaricon[0].style.backgroundImage = 'url("./img/navigation_close.png")'
        this.toggle = false
      } else {
        navbaricon[0].style.animation = 'rotate_left 1s ease 1'
        navbaricon[0].style.backgroundImage = 'url("./img/navigation_open.png")'
        this.toggle = true
      }
    },
    navbartoggle () {
      const navbaricon = document.getElementsByClassName('navbar-toggler-icon')
      navbaricon[0].style.animation = ''
      if (this.toggle) {
        navbaricon[0].style.animation = 'rotate_right 1s ease 1'
        navbaricon[0].style.backgroundImage = 'url("./img/navigation_close.png")'
        this.toggle = false
      } else {
        navbaricon[0].style.animation = 'rotate_left 1s ease 1'
        navbaricon[0].style.backgroundImage = 'url("./img/navigation_open.png")'
        this.toggle = true
      }
    },
    signin () {
      (async () => {
        await this.$swal.fire({
          imageUrl: './img/login.png',
          imageWidth: 120,
          imageHeight: 120,
          allowOutsideClick: false,
          html: '<div class="input"><img src="./img/user.png"></img><input id="swal-input1" type="text" class="swal2-input" placeholder="帳號"></div>' +
                '<div class="input"><img src="./img/password.png"></img><input id="swal-input2" type="password" class="swal2-input" placeholder="密碼"></div>',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '登入',
          cancelButtonText: '取消',
          preConfirm: () => {
            return [
              document.getElementById('swal-input1').value,
              document.getElementById('swal-input2').value
            ]
          }
        }).then((result) => {
          const navbaricon = document.getElementsByClassName('navbar-toggler-icon')
          if (result.value) {
            const account = result.value[0]
            const password = result.value[1]
            this.axios.post(process.env.VUE_APP_APIURL + '/login',
              { account: account, password: password }
            )
              .then(response => {
                const data = response.data
                if (data.success) {
                  // 如果回來的資料 success 是 true
                  (async () => {
                    await this.$swal.fire({
                      icon: 'success',
                      title: '登入成功',
                      allowOutsideClick: false,
                      confirmButtonText: '確定'
                    }).then((result) => {
                      this.$router.push('backstage')
                      this.$store.commit('login', account)
                    })
                  })()
                } else {
                  // 不是就顯示回來的 message
                  (async () => {
                    await this.$swal.fire({
                      icon: 'error',
                      title: data.message,
                      allowOutsideClick: false,
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
                    confirmButtonText: '確定'
                  })
                })()
              })
          }
          navbaricon[0].style.animation = 'rotate_left 1s ease 1'
          navbaricon[0].style.backgroundImage = 'url("./img/navigation_open.png")'
          this.toggle = true
        })
      })()
    }
  }
}
</script>
