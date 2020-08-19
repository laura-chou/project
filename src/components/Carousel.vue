<template>
  <div id="carousel">
    <textra :data='words' :timer="5" :infinite='true' filter="bottom-top"/>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide><img class="img-scale" :src="carousels[0]"></swiper-slide>
      <swiper-slide><img class="img-scale" :src="carousels[1]"></swiper-slide>
      <swiper-slide><img class="img-scale" :src="carousels[2]"></swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import '@/style/swiper-bundle.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      words: ['慵懶的午後', '休息片刻吧 !', '記得到您熟悉的巷口來', '吃碗冰消暑解渴一下吧 ~'],
      swiperOption: {
        effect: 'fade',
        slidesPerView: 1,
        spaceBetween: 100,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: false,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    carousels () {
      const carousel = []
      for (const i of this.$store.getters.carousel) {
        carousel.push(process.env.VUE_APP_APIURL + '/file/' + i)
      }
      return carousel
    }
  }
}
</script>
