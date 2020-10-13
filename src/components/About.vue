<template>
  <div id="about">
    <div class="bg" :style="aboutimg"></div>
    <div class="container">
      <h2>關於我們</h2>
      <div class="p-0 wow bounceInRight"><p>{{ aboutintro }}</p></div>
    </div>
  </div>
</template>

<script>
import WOW from 'wow.js'
export default {
  name: 'About',
  data () {
    return {
      transitions: ['book']
    }
  },
  computed: {
    aboutimg () {
      const img = 'background-image:url("' + process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.about_img + '")'
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
