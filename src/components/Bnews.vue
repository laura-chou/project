<template>
  <div id="bnews">
    <div class="container">
      <h1>最新消息</h1>
      <div class="new">
        <b-table id="menu-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
          <template v-slot:cell(delete)="data">
            <font-awesome-icon class="icon-size" @click="del(data)" style="color:red" :icon="['fas','trash-alt']"></font-awesome-icon>
          </template>
          <template v-slot:cell(title)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(edit)="data">
            <div @click="edit(data)" style="color:green">
              <font-awesome-icon class="icon-size" :icon="['fas','edit']"></font-awesome-icon>
            </div>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          pills :total-rows="rows"
          :per-page="perPage"
          align="fill"
          aria-controls="menu-table"
        ></b-pagination>
        <div class="button">
          <b-button id="btn" variant="danger" @click="add">新增</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bnews',
  data () {
    return {
      fields: [
        {
          key: 'delete',
          label: '刪除'
        },
        {
          key: 'title',
          label: '標題'
        },
        {
          key: 'edit',
          label: '編輯'
        }
      ],
      perPage: 10,
      currentPage: 1,
      items: this.$store.getters.news
    }
  },
  computed: {
    getnews () {
      return this.$store.getters.news
    },
    rows () {
      return this.items.length
    },
    getTodayDate () {
      const fullDate = new Date()
      const yyyy = fullDate.getFullYear()
      const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ('0' + (fullDate.getMonth() + 1))
      const dd = fullDate.getDate() < 10 ? ('0' + fullDate.getDate()) : fullDate.getDate()
      const today = yyyy + '-' + MM + '-' + dd
      return today
    }
  },
  methods: {
    add () {
      (async () => {
        await this.$swal.fire({
          allowOutsideClick: false,
          html: `<div>日期:<input id="add-date" type='date' value=${this.getTodayDate}></input></div>` +
          '<div>標題:<input id="add-title" type="text" class="swal2-input"></div><hr>' +
          '<div>內容:<textarea id="add-content" type="text" class="swal2-input"></textarea></div>' +
          '<div>網址:<input id="add-url" type="text" class="swal2-input"></div>',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '新增',
          cancelButtonText: '取消',
          preConfirm: () => {
            return [
              document.getElementById('add-date').value,
              document.getElementById('add-title').value,
              document.getElementById('add-content').value,
              document.getElementById('add-url').value
            ]
          }
        }).then((result) => {
          if (result.isConfirmed) {
            if (result.value[1] === '' || result.value[2] === '') {
              (async () => {
                await this.$swal.fire({
                  icon: 'error',
                  title: '標題或內容未填寫',
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                })
              })()
            } else {
              const send = {
                date: result.value[0],
                title: result.value[1],
                content: result.value[2],
                url: result.value[3]
              }
              this.axios.post(process.env.VUE_APP_APIURL + '/add_news/', send)
                .then(response => {
                  (async () => {
                    await this.$swal.fire({
                      icon: 'success',
                      title: response.data.message,
                      allowOutsideClick: false,
                      confirmButtonText: '確定'
                    }).then((result) => {
                      this.items.unshift(response.data.result)
                      this.$store.commit('news', this.items)
                    })
                  })()
                })
                .catch(error => {
                  (async () => {
                    await this.$swal.fire({
                      icon: 'error',
                      title: error.response.data.message,
                      allowOutsideClick: false,
                      confirmButtonText: '確定'
                    })
                  })()
                })
            }
          }
        })
      })()
    },
    del (data) {
      (async () => {
        const id = data.item._id
        let index = 0
        for (const i in this.items) {
          if (this.items[i]._id === id) {
            index = i
            break
          }
        }
        await this.$swal.fire({
          icon: 'warning',
          title: '確定要刪除嗎?',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            this.axios.delete(process.env.VUE_APP_APIURL + '/delete_news/' + id)
              .then(response => {
                this.items.splice(index, 1)
                this.$store.commit('news', this.items)
              })
              .catch(error => {
                (async () => {
                  await this.$swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: '確定'
                  })
                })()
              })
          }
        })
      })()
    },
    edit (data) {
      (async () => {
        const id = data.item._id
        let index = 0
        for (const i in this.items) {
          if (this.items[i]._id === id) {
            index = i
            break
          }
        }
        const date = this.items[index].date
        const title = this.items[index].title.split(' ').join('')
        const content = this.items[index].content
        const url = this.items[index].url
        await this.$swal.fire({
          allowOutsideClick: false,
          html: `<div>日期:<input id="edit-date" type='date' value=${date}></input></div>` +
          `<div>標題:<input id="edit-title" type="text" class="swal2-input" value=${title}></div><hr>` +
          `<div>內容:<textarea id="edit-content" type="text" class="swal2-input">${content}</textarea></div>` +
          `<div>網址:<input id="edit-url" type="text" class="swal2-input" value=${url}></div>`,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '儲存',
          cancelButtonText: '取消',
          preConfirm: () => {
            return [
              document.getElementById('edit-date').value,
              document.getElementById('edit-title').value,
              document.getElementById('edit-content').value,
              document.getElementById('edit-url').value
            ]
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const id = this.items[data.index]._id
            const send = {
              date: result.value[0],
              title: result.value[1],
              content: result.value[2],
              url: result.value[3]
            }
            this.axios.patch(process.env.VUE_APP_APIURL + '/update_news/' + id, send)
              .then(response => {
                (async () => {
                  await this.$swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: '確定'
                  }).then((result) => {
                    this.items[data.index].content = response.data.result.content
                    this.items[data.index].date = response.data.result.date
                    this.items[data.index].title = response.data.result.title
                    this.items[data.index].url = response.data.result.url
                    this.$store.commit('news', this.items)
                  })
                })()
              })
              .catch(error => {
                (async () => {
                  await this.$swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: '確定'
                  })
                })()
              })
          }
        })
      })()
    },
    sortItem (x, y) {
      return ((x.date === y.date) ? 0 : ((x.date > y.date) ? 1 : -1))
    }
  }
}
</script>
