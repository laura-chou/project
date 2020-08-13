<template>
  <div id="order">
    <div class="container">
      <h2>選擇品項</h2>
      <hr/>
      <div class="row">
        <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2 p-1" v-for="(m,index) in menu" :key="index">
          <b-card no-body class="overflow-hidden h-100">
            <b-row no-gutters>
              <b-col sm="12" md="12" lg="12" xl="12" class="text">{{m.name}}</b-col>
              <b-col sm="12" md="12" lg="12" xl="12" style="height: 200px;" class="overflow-hidden">
                <b-card-img :src='m.image' v-pswp="m.image" alt="Image" class="rounded-0 m-0 h-100"></b-card-img>
              </b-col>
              <b-col sm="12" md="12" lg="12" xl="12" class="text">${{m.price}}</b-col>
              <div class="count col-4 col-sm-4 col-md-12 col-lg-12 col-xl-12">
                <b-col md="4" lg="4" xl="4">
                    <button class="input-group-text bg-white" @click="minus(index)">
                      <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
                    </button>
                </b-col>
                <b-col md="4">{{ counts[index] }}</b-col>
                <b-col md="4">
                  <button class="input-group-text bg-white" @click="plus(index)">
                    <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
                  </button>
                </b-col>
              </div>
            </b-row>
          </b-card>
        </div>
      </div>
      <hr/>
      <div class="row info">
        <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0">
          <h5 class="m-0">姓名：</h5>
        </div>
        <div class="col-8 col-sm-10 col-md-10 col-lg-10 col-xl-10 p-0">
          <b-form-input v-model="name" placeholder="請輸入姓名" maxlength="4"></b-form-input>
        </div>
      </div>
      <div class="row info">
        <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0">
          <h5 class="m-0">電話：</h5>
        </div>
        <div class="col-8 col-sm-10 col-md-10 col-lg-10 col-xl-10 p-0">
          <b-form-input v-model="phone" placeholder="請輸入電話號碼" maxlength="10"></b-form-input>
        </div>
      </div>
      <div class="row info">
        <div class="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0">
          <h5 class="m-0">取單時間：</h5>
        </div>
        <div class="col-8 col-sm-10 col-md-10 col-lg-10 col-xl-10 p-0">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
      </div>
      <div class="button">
        <b-button variant="danger" @click="cancel">取消</b-button>
        <b-button variant="danger" @click="next">下一步</b-button>
      </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Order',
  data () {
    return {
      counts: [],
      name: '',
      phone: '',
      selected: 'null',
      options: [
        { value: 'null', text: '選擇時間' },
        { value: '14:00', text: '14:00' },
        { value: '16:00', text: '16:00' }
      ]
    }
  },
  computed: {
    menu () {
      return this.$store.getters.menu
    },
    customer () {
      return this.$store.getters.order_customer
    },
    tele () {
      return this.$store.getters.order_phone
    },
    time () {
      return this.$store.getters.order_time
    },
    amount () {
      return this.$store.getters.order_count
    }
  },
  methods: {
    minus (index) {
      if (this.counts[index] > 0) {
        this.counts[index]--
        const tmp = this.counts
        this.counts = []
        this.counts = tmp
      }
    },
    plus (index) {
      if (this.counts[index] < 10) {
        this.counts[index]++
        const tmp = this.counts
        this.counts = []
        this.counts = tmp
      }
    },
    cancel () {
      for (const i in this.counts) {
        this.counts[i] = 0
      }
      this.name = ''
      this.phone = ''
      this.selected = null
      this.$store.commit('orderCustomer', '')
      this.$store.commit('orderPhone', '')
      this.$store.commit('orderTime', null)
      this.$store.commit('orderItems', [])
      this.$store.commit('orderCount', [])
      this.$router.push('/')
    },
    next () {
      if (this.name === '' || this.phone === '' || this.selected === null) {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '欄位未填寫',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else if (isNaN(this.phone)) {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '電話號碼請輸入數字',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else {
        const item = []
        let calc = 0
        for (const i in this.counts) {
          if (this.counts[i] >= 1) {
            item.push(
              {
                name: this.menu[i].name,
                price: this.menu[i].price,
                amount: this.counts[i]
              }
            )
          } else {
            calc++
          }
        }
        if (calc === this.counts.length) {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '尚未選取快取冰品',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            })
          })()
        } else {
          this.$store.commit('orderCustomer', this.name)
          this.$store.commit('orderPhone', this.phone)
          this.$store.commit('orderTime', this.selected)
          this.$store.commit('orderItems', item)
          this.$store.commit('orderCount', this.counts)
          this.$router.push('/check')
        }
      }
    }
  },
  created () {
    for (let i = 0; i < this.menu.length; i++) {
      this.counts.push(0)
    }
    if (this.customer !== '') {
      this.name = this.customer
    }
    if (this.tele !== '') {
      this.phone = this.tele
    }
    if (this.time !== '') {
      this.selected = this.time
    }
    if (this.amount.length !== 0) {
      this.counts = this.amount
    }
  }
}
</script>
