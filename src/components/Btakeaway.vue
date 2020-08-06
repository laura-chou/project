<template>
  <div id="btakeaway">
    <div class="container">
      <h1>預定訂單</h1>
      <div class="open">
        <div><h4>接單開關：</h4></div>
        <div class="onoffswitch">
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" checked>
            <label class="onoffswitch-label" for="myonoffswitch">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch" @click="change"></span>
            </label>
        </div>
      </div>
      <div class="overflow-auto">
        <b-table id="my-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
          <template v-slot:cell(delete)="data">
            <div @click="del(data)" style="color:red">
              <font-awesome-icon class="icon-size" :icon="['fas','trash-alt']"></font-awesome-icon>
            </div>
          </template>
          <template v-slot:cell(customer)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(take_time)="data">
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
  name: 'Btakeaway',
  data () {
    return {
      fields: [
        {
          key: 'delete',
          label: '刪除'
        },
        {
          key: 'customer',
          label: '訂購人'
        },
        {
          key: 'take_time',
          label: '快取時間'
        },
        {
          key: 'detail',
          label: '訂單資訊'
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
    },
    getTodayDate () {
      const fullDate = new Date()
      const yyyy = fullDate.getFullYear()
      const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ('0' + (fullDate.getMonth() + 1))
      const dd = fullDate.getDate() < 10 ? ('0' + fullDate.getDate()) : fullDate.getDate()
      const today = yyyy + '-' + MM + '-' + dd
      return today
    },
    getOpen () {
      return this.$store.getters.open
    },
    getCatch () {
      return this.$store.getters.catch
    }
  },
  methods: {
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
            this.axios.delete(process.env.VUE_APP_APIURL + '/delete_takeaway/' + id)
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
        const customer = this.items[data.index].customer
        const date = this.items[data.index].date
        const order = this.items[data.index].items
        const orderTime = this.items[data.index].order_time
        const phone = this.items[data.index].phone
        const takeTime = this.items[data.index].take_time
        const totalMoney = this.items[data.index].total
        let totalCount = 0
        let table = ''
        for (const i of order) {
          table += `<tr>
                      <td scope="col">${i.name}</td>
                      <td scope="col">${i.count}</td>
                      <td scope="col">${i.price}</td>
                    </tr>`
          totalCount += i.count
        }
        await this.$swal.fire({
          allowOutsideClick: false,
          html: `<table>
                  <tbody style="text-align: left">
                    <tr>
                      <td scope="col">${date}</td>
                    </tr>
                    <tr>
                      <td scope="col">訂購人：${customer}</td>
                    </tr>
                    <tr>
                      <td scope="col">下單時間：${orderTime}</td>
                    </tr>
                    <tr>
                      <td scope="col">聯絡電話：${phone}</td>
                    </tr>
                    <tr>
                      <td scope="col">快取時間：${takeTime}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">名稱</th>
                      <th scope="col">數量</th>
                      <th scope="col">價錢</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${table}
                  </tbody>
                </table>
                <table style="display: flex; justify-content: flex-end">
                  <tbody style="text-align: right">
                    <tr>
                      <td scope="col">共 ${totalCount} 個</td>
                    </tr>
                    <tr>
                      <td scope="col">總金額：${totalMoney} 元</td>
                    </tr>
                  </tbody>
                </table>`,
          focusConfirm: false,
          confirmButtonText: '確定'
        })
      })()
    },
    getTakeaway () {
      this.axios.get(process.env.VUE_APP_APIURL + '/takeaway')
        .then(response => {
          const filter = []
          for (const i of response.data.takeaway) {
            if (i.date === this.getTodayDate) {
              filter.push(i)
            }
          }
          this.items = filter
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
    },
    change () {
      const onoffinner = document.getElementsByClassName('onoffswitch-inner')[0]
      const onoffswitch = document.getElementsByClassName('onoffswitch-switch')[0]
      if (onoffinner.style.marginLeft === '0px') {
        this.$store.commit('open', false)
        onoffinner.style.marginLeft = '-100%'
        onoffswitch.style.right = '49px'
      } else {
        this.$store.commit('open', true)
        onoffinner.style.marginLeft = '0'
        onoffswitch.style.right = '0px'
      }
    }
  },
  mounted () {
    const onoffinner = document.getElementsByClassName('onoffswitch-inner')[0]
    const onoffswitch = document.getElementsByClassName('onoffswitch-switch')[0]
    // 判斷是否取得訂單
    if (this.getCatch) {
      this.getTakeaway()
      const run = setInterval(() => {
        // 每 5 分鐘向後台取得訂單
        if (this.getCatch) {
          this.getTakeaway()
        } else {
          clearInterval(run)
        }
      }, 1000 * 60 * 5)
    }
    // 開關
    if (this.getOpen) {
      onoffinner.style.marginLeft = '0'
      onoffswitch.style.right = '0px'
    } else {
      onoffinner.style.marginLeft = '-100%'
      onoffswitch.style.right = '49px'
    }
  }
}
</script>
