<template>
  <div id="location">
    <div class="container">
      <h2>店家位置</h2>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 wow slideInLeft">
          <b-img src="./img/bus.png" fluid></b-img>
          <span>{{ locationbus }}</span>
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 wow slideInRight">
          <b-img src="./img/metro.png" fluid></b-img>
          <span>{{ locationmetro }}</span>
        </div>
      </div>
      <div class="map wow slideInUp">
        <b-embed
          type="iframe"
          aspect="16by9"
          :src="locationaddress"
          allowfullscreen
        ></b-embed>
      </div>
    </div>
  </div>
</template>
<script>
import WOW from 'wow.js'
export default {
  name: 'Location',
  computed: {
    locationaddress () {
      const addr = `https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${this.$store.getters.location_address}&z=17&output=embed&t=`
      return addr
    },
    locationbus () {
      return this.$store.getters.location_bus
    },
    locationmetro () {
      return this.$store.getters.location_metro
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 1500,
      mobile: false,
      live: false
    })
    wow.init()
    this.axios.get(process.env.VUE_APP_APIURL + '/location')
      .then(response => {
        this.$store.commit('locationId', response.data.location[0]._id)
        this.$store.commit('locationAddress', response.data.location[0].address)
        this.$store.commit('locationBus', response.data.location[0].bus)
        this.$store.commit('locationMetro', response.data.location[0].metro)
      })
      .catch(() => {
        alert('發生錯誤')
      })
  }
}
</script>
