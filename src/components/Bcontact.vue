<template>
    <div id="bcontact">
      <h2>訪客留言</h2>
      <div class="content">
        <vue-css-doodle>
          :doodle {
            @grid: 7 / 100vmax;
          }
          @size: 1px calc(141.4% + 1px);
          transform: rotate(@p(±45deg));
          background: #AEACFB;
          margin: auto;
        </vue-css-doodle>
        <div class="cont">
          <b-table id="contact-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
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
              <div @click="detail(data)" style="color:blue">
                <font-awesome-icon class="icon-size" :icon="['fas','clipboard-list']"></font-awesome-icon>
              </div>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            pills :total-rows="rows"
            :per-page="perPage"
            align="fill"
            aria-controls="contact-table"
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
      perPage: 6,
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
            let index = 0
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i]._id === data.item._id) {
                index = i
              }
            }
            const id = this.items[index]._id
            this.axios.delete(process.env.VUE_APP_APIURL + '/delete_contact/' + id)
              .then(response => {
                this.items.splice(index, 1)
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
        let index = 0
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i]._id === data.item._id) {
            index = i
          }
        }
        const name = this.items[index].name
        const email = this.items[index].email
        const message = this.items[index].message.replace(/\n/g, '<br>')
        await this.$swal.fire({
          html: `<div class="row">
                  <div class="col-4">${name}</div>
                  <div class="col-8">${email}</div>
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
