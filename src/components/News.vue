<template>
  <div id="news">
    <vue-css-doodle>
      :doodle {
        @grid: 7 / 100vmax;
      }
      @shape: rhombus;
      opacity: 0.2;
      background: hsla(
        calc(360 - @i * 4), 70%, 68%, @r.8
      );
      transform:
        scale(@r(.2, 1.5))
        translate(@m2.@r(±50%));
    </vue-css-doodle>
    <div class="content">
      <h2>最新消息</h2>
      <b-table id="my-table" class="wow fadeInUp" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
        <template v-slot:cell(title)="data">
          <a href="javascript:void(0)" @click="detail(data.value)">{{ data.value }}</a>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        pills :total-rows="rows"
        :per-page="perPage"
        align="fill"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>
<script>
import WOW from 'wow.js'
export default {
  name: 'News',
  data () {
    return {
      fields: [
        {
          key: 'date',
          label: '發布時間'
        },
        {
          key: 'title',
          label: '標題'
        }
      ],
      perPage: 5,
      currentPage: 1
    }
  },
  computed: {
    items () {
      const newsItems = []
      for (const i of this.$store.getters.news) {
        newsItems.push(
          {
            date: i.date,
            title: i.title
          }
        )
      }
      return newsItems
    },
    rows () {
      return this.items.length
    }
  },
  mounted () {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 700,
      mobile: false,
      live: false
    })
    wow.init()
    this.axios.get(process.env.VUE_APP_APIURL + '/news')
      .then(response => {
        const news = []
        for (const i of response.data.news) {
          news.push(
            {
              _id: i._id,
              date: i.date,
              title: i.title,
              content: i.content,
              url: i.url
            }
          )
        }
        news.sort(this.sortItem)
        news.reverse()
        this.$store.commit('news', news)
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
  },
  methods: {
    detail (data) {
      for (const i of this.$store.getters.news) {
        if (data === i.title) {
          let url = ''
          if (i.url === '') {
            url = `<hr><div class="sweetalert">${i.date}<br><br>${i.content.replace(/\n/g, '<br>')}<div>`
          } else {
            url = `<hr><div class="sweetalert">${i.date}<br><br>${i.content.replace(/\n/g, '<br>')}<br><br><a href='${i.url}' target="_blank">${i.url}</a><div>`
          }
          (async () => {
            await this.$swal.fire({
              title: i.title,
              html: url,
              allowOutsideClick: false,
              confirmButtonText: '關閉'
            })
          })()
        }
      }
    },
    sortItem (x, y) {
      return ((x.date === y.date) ? 0 : ((x.date > y.date) ? 1 : -1))
    }
  }
}
</script>
