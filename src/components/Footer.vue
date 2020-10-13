<template>
  <div id="footer">
    <div class="row">
      <div class="col-8 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0 logo">
          <a href="#" v-scroll-to="{ el: '#navbar', easing: [0.34, 1.56, 0.64, 1], duration: 1000 }" ><b-img src="./img/logo.png" fluid alt="艸頭黃"></b-img></a>
      </div>
      <div class="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0 social">
          <a class="fb" :href="fb" target="_blank"><b-img src="./img/facebook.png"></b-img></a>
      </div>
      <div class="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0 social">
          <a class="ig" :href="ig" target="_blank"><b-img src="./img/instagram.png"></b-img></a>
      </div>
    </div>
    <div class="row">
      <div class="col-12 p-0 info">
          <div>
            <b-img src="./img/address.png"></b-img>
            <span>地址：{{ address }}</span>
          </div>
          <div>
            <b-img src="./img/clock.png"></b-img>
            <span>營業時間：{{ open_time }}</span>
          </div>
          <div>
            <b-img src="./img/phone.png"></b-img>
            <span>電話：{{ phone }}</span>
          </div>
      </div>
      <div class="col-12">
        <span>Copyright &copy; 2020 Yu-Lun-Chou</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    address () {
      return this.$store.getters.location_address
    },
    open_time () {
      return this.$store.getters.open_time
    },
    phone () {
      return this.$store.getters.phone
    },
    fb () {
      return this.$store.getters.fb
    },
    ig () {
      return this.$store.getters.ig
    }
  }
}
</script>
