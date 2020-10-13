<template>
  <div id="takeaway">
    <div class="bg" :style="img"></div>
    <div class="container">
      <h2>線上預定</h2>
      <div class="list wow flash" style="width:100%">
        <div class="row">
          <div><b-img src="./img/warn.png"></b-img>{{ notes[0] }}</div>
        </div>
        <div class="row">
          <div><b-img src="./img/warn.png"></b-img>{{ notes[1] }}</div>
        </div>
        <div class="row">
          <div><b-img src="./img/warn.png"></b-img>{{ notes[2] }}</div>
        </div>
      </div>
      <b-button variant="custom" @click="order">我要預訂</b-button>
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
