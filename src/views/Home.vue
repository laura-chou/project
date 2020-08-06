<template>
  <div id="home">
    <navbar/>
    <carousel/>
    <about/>
    <news/>
    <amenu/>
    <location/>
    <takeaway/>
    <contact/>
    <afooter/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar.vue'
import carousel from '@/components/Carousel.vue'
import about from '@/components/About.vue'
import news from '@/components/News.vue'
import amenu from '@/components/Menu.vue'
import location from '@/components/Location.vue'
import takeaway from '@/components/Takeaway.vue'
import contact from '@/components/Contact.vue'
import afooter from '@/components/Footer.vue'
export default {
  name: 'Home',
  components: {
    navbar,
    carousel,
    about,
    news,
    amenu,
    location,
    takeaway,
    contact,
    afooter
  }
}
</script>
