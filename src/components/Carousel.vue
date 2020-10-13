<template>
  <div id="carousel">
    <textra :data='words' :timer="5" :infinite='true' filter="bottom-top"/>
    <vue-flux
      :options="options"
      :images="images"
      :transitions="transitions"
    >
      <template v-slot:preloader>
          <flux-preloader />
      </template>
      <template v-slot:pagination>
          <flux-pagination />
      </template>
    </vue-flux>
  </div>
</template>
<script>
export default {
  data () {
    return {
      words: ['慵懶的午後', '休息片刻吧 !', '記得到您熟悉的巷口來', '吃碗冰消暑解渴一下吧 ~'],
      options: {
        allowFullscreen: false,
        allowToSkipTransition: false,
        autohideTime: 2500,
        autoplay: true,
        bindKeys: false,
        delay: 5000,
        enableGestures: false,
        infinite: true,
        lazyLoad: false,
        lazyLoadAfter: 3
      },
      transitions: [
        {
          name: 'zip',
          options: {
            cols: 10,
            tileDuration: 600,
            tileDelay: 80,
            easing: 'ease-in'
          }
        }
      ],
      images: []
    }
  },
  computed: {
    carousels () {
      const carousel = []
      for (const i of this.$store.getters.carousel) {
        carousel.push(process.env.VUE_APP_APIURL + '/file/' + i)
      }
      return carousel
    }
  },
  mounted () {
    this.images = this.carousels
  }
}
</script>
