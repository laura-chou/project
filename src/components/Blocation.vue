<template>
    <div id="blocation">
      <div class="container">
        <h1>店家位置</h1>
        <div class="locat">
          <b-row class="my-1">
            <b-col sm="3" md="2" lg="2" xl="2">
              <label>地址:</label>
            </b-col>
            <b-col sm="9" md="10" lg="10" xl="10">
              <b-form-input id="address" v-model="address" :state=addressState :value=address></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3" md="2" lg="2" xl="2">
              <label>公車資訊:</label>
            </b-col>
            <b-col sm="9" md="10" lg="10" xl="10">
              <b-form-input id="bus" v-model="bus" :state=busState :value=bus></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3" md="2" lg="2" xl="2">
              <label>捷運資訊:</label>
            </b-col>
            <b-col sm="9" md="10" lg="10" xl="10">
              <b-form-input id="metro" v-model="metro" :state=metroState :value=metro></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col>
              <b-button id="btn" variant="danger" @click="save">儲存</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Blocation',
  data () {
    return {
      id: this.$store.getters.location_id,
      address: this.$store.getters.location_address,
      bus: this.$store.getters.location_bus,
      metro: this.$store.getters.location_metro
    }
  },
  computed: {
    addressState () {
      return this.address.length > 2 ? null : false
    },
    busState () {
      return this.bus.length > 2 ? null : false
    },
    metroState () {
      return this.metro.length > 2 ? null : false
    }
  },
  methods: {
    save () {
      const address = document.getElementById('address').value
      const bus = document.getElementById('bus').value
      const metro = document.getElementById('metro').value
      if (address === '' || bus === '' || metro === '') {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '欄位未填寫',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else {
        const send = {
          address: address,
          bus: bus,
          metro: metro
        }
        this.axios.patch(process.env.VUE_APP_APIURL + '/update_location/' + this.id, send)
          .then(response => {
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                this.$store.commit('locationAddress', address)
                this.$store.commit('locationBus', bus)
                this.$store.commit('locationMetro', metro)
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
  }
}
</script>
