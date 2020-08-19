<template>
  <div id="about">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 pr-4 wow bounceInLeft pic"><b-img :src=aboutimg v-pswp="aboutimg" fluid alt="關於我們"></b-img></div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0 wow bounceInRight" style="text-align:left;"><h2>關於我們</h2><p>{{ aboutintro }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import WOW from 'wow.js'
export default {
  name: 'About',
  computed: {
    aboutimg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.about_img
      return img
    },
    aboutintro () {
      return this.$store.getters.about_intro
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 300,
      mobile: false,
      live: false
    })
    wow.init()
    this.axios.get(process.env.VUE_APP_APIURL + '/about')
      .then(response => {
        this.$store.commit('aboutId', response.data.about[0]._id)
        this.$store.commit('aboutImg', response.data.about[0].image)
        this.$store.commit('aboutIntro', response.data.about[0].introduction)
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
  }
}
</script>
