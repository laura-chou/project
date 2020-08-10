<template>
  <div id="contact">
    <div class="container">
      <h2>聯絡我們</h2>
      <div class="flex wow lightSpeedIn">
        <form method="post" id="form" class="topBefore">
            <input id="name" type="text" placeholder="姓名" required>
            <input id="email" type="text" placeholder="電子信箱" required pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$">
            <textarea id="message" type="text" placeholder="留言" required></textarea>
            <input type="submit" value=送出 id="send" @click="send">
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
      console.log(today)
      return today
    }
  },
  methods: {
    send () {
      event.preventDefault()
      const contactName = document.getElementById('name')
      const contactEmail = document.getElementById('email')
      const contactMessage = document.getElementById('message')
      this.axios.post(
        process.env.VUE_APP_APIURL + '/new_contact',
        {
          name: contactName.value,
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
            alert(data.message)
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
