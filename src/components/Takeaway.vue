<template>
  <div id="takeaway">
    <div class="container">
      <h2>線上預定</h2>
      <div class="flex wow bounceIn" :style="img">
        <div class="rule">
          <b-img src="./img/warn.png"></b-img>
          <ol>
            <li>{{ notes[0] }}</li>
            <li>{{ notes[1] }}</li>
            <li>{{ notes[2] }}</li>
          </ol>
          <b-button variant="danger" @click="order">我要預訂</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WOW from 'wow.js'
export default {
  name: 'Takeaway',
  computed: {
    notes () {
      return this.$store.getters.takeaway_notes
    },
    img () {
      const taimg = 'background-image:url("' + process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.takeaway_img + '")'
      return taimg
    },
    getOpen () {
      return this.$store.getters.open
    }
  },
  methods: {
    order () {
      if (this.getOpen) {
        this.$router.push('/order')
      } else {
        (async () => {
          await this.$swal.fire({
            icon: 'warning',
            title: '店家尚未開放預定',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      }
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 1900,
      mobile: false,
      live: false
    })
    wow.init()
  }
}
</script>
