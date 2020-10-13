<template>
  <div id="menu">
    <vue-parallax class="parallax" type="fixed" :src="meunbg">
      <div class="swiper3d">
        <h2>菜單</h2>
        <div class="example-3d wow fadeInRight">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="m in menu" :key="m.name">
              <Photoswipe>
                <b-col md="12">{{m.name}}</b-col>
                <b-col md="12" class="p-0">
                  <b-img :src='m.image' v-pswp="m.image" alt="Image" class="rounded-0 m-0 h-100"></b-img>
                </b-col>
                <b-col md="12">
                  <div>{{m.notes}}</div>
                </b-col>
                <b-col md="12">
                  <span>$ {{m.price}}</span>
                </b-col>
              </Photoswipe>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </vue-parallax>
  </div>
</template>
<script>
import WOW from 'wow.js'
import 'swiper/swiper-bundle.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Menu',
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    meunbg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.menu_bg
      return img
    },
    menu () {
      return this.$store.getters.menu
    }
  },
  data () {
    return {
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: false,
          dynamicBullets: true
        }
      }
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 1100,
      mobile: false,
      live: false
    })
    wow.init()
    this.axios.get(process.env.VUE_APP_APIURL + '/menu')
      .then(response => {
        const menus = []
        for (const i of response.data.menu) {
          menus.push(
            {
              _id: i._id,
              name: i.name,
              image: process.env.VUE_APP_APIURL + '/file/' + i.image,
              notes: i.notes,
              price: i.price
            }
          )
        }
        const rever = []
        for (let i = (menus.length); i > 0; i--) {
          rever.push(menus[i - 1])
        }
        this.$store.commit('menu', rever)
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
