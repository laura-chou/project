<template>
  <div id="check">
    <h2>確認訂單</h2>
    <div class="content">
      <vue-css-doodle>
        :doodle {
          @grid: 6 / 130vmax;
        }
        opacity: 0.5;
        transition: .2s @r(.6s);
        clip-path: polygon(
          @rand(100%) 0, 100% @rand(100%), 0 @rand(100%)
        );
        will-change: transform;
        transform: scale(@r(.2, .8)) rotate(@calc(360+30*@index)deg);

        background: hsla(
          calc(240 - 6 * @row * @col),
          70%, 68%, @r.8
        );
      </vue-css-doodle>
      <div class="ck">
        <div class="info">
          <h5><span style="visibility: hidden">空</span>訂購人：<span>{{ customer }}</span></h5>
          <h5>聯絡電話：<span>{{ phone }}</span></h5>
          <h5>取單時間：<span>{{ time }}</span></h5>
        </div>
        <div id="check-table">
          <b-table :fields="fields" :items="items"></b-table>
        </div>
        <div class="total">
          <div>
            <h5>共<span> {{ amount }} </span>個</h5>
          </div>
          <div>
            <h5 class="m-0">總金額<span> {{ money }} </span>元</h5>
          </div>
        </div>
        <div class="btn">
          <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button variant="danger" @click="previous">上一步</b-button>
              </div>
            </div>
            <div class="col d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button variant="danger" @click="send">確定</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Check',
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'price',
          label: '價錢'
        },
        {
          key: 'amount',
          label: '數量'
        }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.getters.order_items
    },
    amount () {
      let amount = 0
      for (const i of this.$store.getters.order_items) {
        amount += i.amount
      }
      return amount
    },
    money () {
      let money = 0
      for (const i of this.$store.getters.order_items) {
        const calc = i.price * i.amount
        money += calc
      }
      return money
    },
    customer () {
      return this.$store.getters.order_customer
    },
    phone () {
      return this.$store.getters.order_phone
    },
    time () {
      return this.$store.getters.order_time
    },
    getTodayDate () {
      const fullDate = new Date()
      const yyyy = fullDate.getFullYear()
      const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ('0' + (fullDate.getMonth() + 1))
      const dd = fullDate.getDate() < 10 ? ('0' + fullDate.getDate()) : fullDate.getDate()
      const today = yyyy + '-' + MM + '-' + dd
      return today
    },
    getTodayTime () {
      const fulltime = new Date()
      const hour = fulltime.getHours() >= 10 ? fulltime.getHours() : ('0' + fulltime.getHours())
      const minute = fulltime.getMinutes() >= 10 ? fulltime.getMinutes() : ('0' + fulltime.getMinutes())
      const time = hour + ':' + minute
      return time
    }
  },
  methods: {
    previous () {
      this.$router.push('/order')
    },
    send () {
      const itm = []
      for (const i of this.items) {
        itm.push(
          {
            name: i.name,
            count: i.amount,
            price: i.price
          }
        )
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/new_order',
        {
          date: this.getTodayDate,
          order_time: this.getTodayTime,
          customer: this.customer,
          phone: this.phone,
          take_time: this.time,
          items: itm,
          total: this.money
        })
        .then(response => {
          const data = response.data
          if (data.success) {
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: '訂單已送出',
                text: '謝謝您!我們會盡快致電與您確認內容',
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                this.$store.commit('isOrder', true)
                this.$router.push('/')
              })
            })()
          } else {
            // 不是就顯示回來的 message
            (async () => {
              await this.$swal.fire({
                icon: 'error',
                title: data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              })
            })()
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
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
}
</script>
