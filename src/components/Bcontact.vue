<template>
    <div id="bcontact">
      <div class="container">
        <h1>聯絡我們</h1>
        <div class="cont">
          <b-table id="my-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
            <template v-slot:cell(delete)="data">
              <div @click="del(data)" style="color:red">
                <font-awesome-icon class="icon-size" :icon="['fas','trash-alt']"></font-awesome-icon>
              </div>
            </template>
            <template v-slot:cell(date)="data">
              <span>{{ data.value }}</span>
            </template>
            <template v-slot:cell(name)="data">
              <span>{{ data.value }}</span>
            </template>
            <template v-slot:cell(detail)="data">
              <div @click="detail(data)" style="color:green">
                <font-awesome-icon class="icon-size" :icon="['fas','clipboard-list']"></font-awesome-icon>
              </div>
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
export default {
  name: 'Bcontact',
  data () {
    return {
      fields: [
        {
          key: 'delete',
          label: '刪除'
        },
        {
          key: 'date',
          label: '日期'
        },
        {
          key: 'name',
          label: '聯絡人'
        },
        {
          key: 'detail',
          label: '詳細資訊'
        }
      ],
      perPage: 5,
      currentPage: 1,
      items: []
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    sortItem (x, y) {
      return ((x.date === y.date) ? 0 : ((x.date > y.date) ? 1 : -1))
    },
    del (data) {
      (async () => {
        await this.$swal.fire({
          icon: 'warning',
          title: '確定要刪除嗎?',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: '確定',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            const id = this.items[data.index]._id
            this.axios.delete(process.env.VUE_APP_APIURL + '/delete_contact/' + id)
              .then(response => {
                this.items.splice(data.index, 1)
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
    detail (data) {
      (async () => {
        const name = this.items[data.index].name
        const email = this.items[data.index].email
        const message = this.items[data.index].message.replace(/\n/g, '<br>')
        await this.$swal.fire({
          html: `<div class="row">
                  <div class="col-3">${name}</div>
                  <div class="col-9">${email}</div>
                </div>
                <hr>
                <div class="row" style="text-align:left">
                  <div class="col">${message}</div>
                </div>`,
          allowOutsideClick: false,
          confirmButtonText: '確定'
        })
      })()
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/contact')
      .then(response => {
        const contacts = []
        for (const i of response.data.contact) {
          contacts.push(
            {
              _id: i._id,
              name: i.name,
              email: i.email,
              message: i.message,
              date: i.date
            }
          )
        }
        contacts.sort(this.sortItem)
        contacts.reverse()
        this.items = contacts
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
</script>
