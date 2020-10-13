<template>
  <div id="contact">
    <div class="bg" :style="contactbg"></div>
    <div class="container">
      <div class="wow pulse" id="form-div">
        <h2>聯絡我們</h2>
        <form class="form" id="form1">
          <div class="row">
            <div class="col-8">
              <p class="name">
                <input id="name" type="text" class="feedback-input" placeholder="姓名" autocomplete="off" required autofocus/>
              </p>
            </div>
            <div class="col-4 radio">
              <div class="custom-control custom-radio">
                <input class="custom-control-input" type="radio" name="radio" id="men" value="先生" checked>
                <label class="custom-control-label" for="men">先生</label>
              </div>
              <div class="custom-control custom-radio">
                <input class="custom-control-input" type="radio" name="radio" id="women" value="小姐">
                <label class="custom-control-label" for="women">小姐</label>
              </div>
            </div>
          </div>
          <p class="email">
            <input id="email" type="email" class="feedback-input" placeholder="電子信箱" autocomplete="off" required/>
          </p>
          <p class="text">
            <textarea id="message" class="feedback-input" placeholder="留言" autocomplete="off" required></textarea>
          </p>
          <div class="submit">
            <input id="send" type="submit" value="送出" @click="send"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import WOW from 'wow.js'
export default {
  name: 'Contact',
  computed: {
    getTodayDate () {
      const fullDate = new Date()
      const yyyy = fullDate.getFullYear()
      const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ('0' + (fullDate.getMonth() + 1))
      const dd = fullDate.getDate() < 10 ? ('0' + fullDate.getDate()) : fullDate.getDate()
      const today = yyyy + '-' + MM + '-' + dd
      return today
    },
    contactbg () {
      const img = 'background-image:url(' + process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.contact_bg + ')'
      return img
    }
  },
  methods: {
    send () {
      const form = document.getElementById('form1')
      const contactName = document.getElementById('name')
      const contactEmail = document.getElementById('email')
      const contactMessage = document.getElementById('message')
      const splitemail = contactEmail.value.split('@')
      if (contactName.value !== '' && contactEmail.value !== '' && contactMessage.value !== '' && contactEmail.value.indexOf('@') !== -1 && splitemail[1] !== '') {
        // 禁止提交
        event.preventDefault()
        this.axios.post(
          process.env.VUE_APP_APIURL + '/new_contact',
          {
            name: contactName.value + form.radio.value,
            email: contactEmail.value,
            message: contactMessage.value,
            date: this.getTodayDate
          })
          .then(response => {
            const data = response.data
            if (data.success) {
              (async () => {
                await this.$swal.fire({
                  title: '送出成功',
                  html: '感謝您的來信<br>我們會盡快回覆您',
                  imageUrl: './img/send.png',
                  imageWidth: 100,
                  imageHeight: 100,
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                })
              })()
              contactName.value = ''
              contactEmail.value = ''
              contactMessage.value = ''
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
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 2300,
      mobile: false,
      live: false
    })
    wow.init()
  }
}
</script>
