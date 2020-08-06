<template>
  <div id="news">
    <div class="container">
      <h2 class="m-0" style="height:10%">最新消息</h2>
      <div class="content wow pulse" style="height:90%">
        <b-table id="my-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
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
        alert('發生錯誤')
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
