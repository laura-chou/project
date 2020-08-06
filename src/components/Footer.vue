<template>
  <div id="footer">
    <div class="row">
      <div class="col-6 logo">
          <b-img :src="logo"></b-img>
      </div>
      <div class="col-6 social">
          <a class="fb" :href="fb" target="_blank"><b-img src="./img/facebook.png"></b-img></a>
          <a class="ig" :href="ig" target="_blank"><b-img src="./img/instagram.png"></b-img></a>
      </div>
      <div class="col-12 info">
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
    logo () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.logo
      return img
    },
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
