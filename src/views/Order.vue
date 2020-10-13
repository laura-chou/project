<template>
  <div id="order">
    <h2>選擇品項</h2>
    <div class="content">
      <vue-css-doodle>
        :doodle {
          @grid: 7 / 130vmax;
        }
        opacity: 0.5;
        transition: .2s @r(.6s);
        clip-path: polygon(
          @rand(100%) 0, 100% @rand(100%), 0 @rand(100%)
        );
        will-change: transform;
        transform: scale(@r(.2, .5)) rotate(@calc(360+30*@index)deg);

        background: hsla(
          calc(240 - 6 * @row * @col),
          70%, 68%, @r.8
        );
      </vue-css-doodle>
      <div class="od">
        <b-table id="order-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
          <template v-slot:cell(detail)="data">
            <div @click="info(data.item.items)" style="color:blue">
              <font-awesome-icon class="icon-size" :icon="['fas','clipboard-list']"></font-awesome-icon>
            </div>
          </template>
          <template v-slot:cell(items)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(price)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(quantity)="data">
            <div class="row">
              <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-center">
                  <button class="input-group-text bg-white" @click="minus(data.item.items)">
                    <font-awesome-icon class="icon-size" :icon="['fas','minus']"></font-awesome-icon>
                  </button>
              </div>
              <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-center">{{ data.value }}</div>
              <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-center">
                <button class="input-group-text bg-white" @click="plus(data.item.items)">
                  <font-awesome-icon class="icon-size" :icon="['fas','plus']"></font-awesome-icon>
                </button>
              </div>
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
        <div class="info">
          <div class="row">
            <div class="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0 d-flex align-items-center justify-content-center">
              <h5 class="m-0">姓名</h5>
            </div>
            <div class="col-9 col-sm-6 col-md-5 col-lg-4 col-xl-3 p-1">
              <b-form-input v-model="name" placeholder="請輸入姓名" maxlength="4"></b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0 d-flex align-items-center justify-content-center">
              <h5 class="m-0">電話</h5>
            </div>
            <div class="col-9 col-sm-6 col-md-5 col-lg-4 col-xl-3 p-1">
              <b-form-input v-model="phone" placeholder="請輸入電話號碼" maxlength="10"></b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0 d-flex align-items-center justify-content-center">
              <h5 class="m-0">取單時間</h5>
            </div>
            <div class="col-9 col-sm-6 col-md-5 col-lg-4 col-xl-3 p-1">
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>
          </div>
        </div>
        <div class="btn">
          <div class="row">
            <div class="col d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button variant="danger" @click="cancel">取消</b-button>
              </div>
            </div>
            <div class="col d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button variant="danger" @click="next">下一步</b-button>
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
  name: 'Order',
  data () {
    return {
      fields: [
        {
          key: 'detail',
          label: '詳情'
        },
        {
          key: 'items',
          label: '品項'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'quantity',
          label: '數量'
        }
      ],
      perPage: 5,
      currentPage: 1,
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
    items () {
      const newsItems = []
      for (const i of this.$store.getters.menu) {
        newsItems.push(
          {
            items: i.name,
            price: i.price,
            quantity: 0
          }
        )
      }
      return newsItems
    },
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
    rows () {
      return this.items.length
    }
  },
  methods: {
    minus (data) {
      let index = 0
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].name === data) {
          index = i
        }
      }
      if (this.items[index].quantity > 0) {
        this.items[index].quantity--
      }
    },
    plus (data) {
      let index = 0
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].name === data) {
          index = i
        }
      }
      if (this.items[index].quantity < 5) {
        this.items[index].quantity++
      }
    },
    info (data) {
      (async () => {
        let index = 0
        for (let i = 0; i < this.menu.length; i++) {
          if (this.menu[i].name === data) {
            index = i
          }
        }
        const image = this.menu[index].image
        const name = this.menu[index].name
        const notes = this.menu[index].notes
        const price = this.menu[index].price
        await this.$swal.fire({
          title: name,
          imageUrl: image,
          imageWidth: 400,
          imageHeight: 300,
          html: `
                <hr>
                <div class="row">
                  <div class="col-3" style="text-align:center;"><h5>附註</h5></div>
                  <div class="col-9" style="text-align:left;">${notes}</div>
                </div>
                <br>
                <div class="row">
                  <div class="col-3" style="text-align:center;"><h5>價格</h5></div>
                  <div class="col-9" style="text-align:left;">${price}</div>
                </div>`,
          allowOutsideClick: false,
          confirmButtonText: '確定'
        })
      })()
    },
    cancel () {
      this.name = ''
      this.phone = ''
      this.selected = null
      this.$store.commit('orderCustomer', '')
      this.$store.commit('orderPhone', '')
      this.$store.commit('orderTime', null)
      this.$store.commit('orderItems', [])
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
        for (const i in this.items) {
          if (this.items[i].quantity >= 1) {
            item.push(
              {
                name: this.items[i].items,
                price: this.items[i].price,
                amount: this.items[i].quantity
              }
            )
          } else {
            calc++
          }
        }
        if (calc === this.items.length) {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '品項尚未選擇',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            })
          })()
        } else {
          this.$store.commit('orderCustomer', this.name)
          this.$store.commit('orderPhone', this.phone)
          this.$store.commit('orderTime', this.selected)
          this.$store.commit('orderItems', item)
          for (const i in this.items) {
            if (this.items[i].items === item.name) {
              this.items[i].quantity = item[i].amount
            }
          }
          this.$router.push('/check')
        }
      }
    }
  },
  created () {
    if (this.customer !== '') {
      this.name = this.customer
    }
    if (this.tele !== '') {
      this.phone = this.tele
    }
    if (this.time !== '') {
      this.selected = this.time
    }
  }
}
</script>
