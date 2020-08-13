<template>
    <div id="bother">
      <h1>其他</h1>
      <div class="container">
        <div class="col p-0 flex">
          <h4>LOGO</h4>
        </div>
        <b-form @submit="submit" class="form">
          <div class="row">
            <div class="col-6 p-0 m-0 flex" style="background:#C3C415">
              <b-img :src=logoimg v-pswp="logoimg" fluid alt="logo"></b-img>
            </div>
            <div class="col-6 p-0">
              <file-pond
                name="logo"
                ref="pond"
                label-idle="選擇檔案或拖曳至此 ( 僅接受png檔 )"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/png"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="col p-0 flex">
            <h4>輪播圖</h4>
          </div>
          <div class="row" style="margin-bottom:1%">
            <div class="col-6 p-0 m-0 flex">
              <b-img class="imgstyle" :src=carousel1 v-pswp="carousel1" fluid alt="輪播圖"></b-img>
            </div>
            <div class="col-6 p-0">
              <file-pond
                name="carousel1"
                ref="pond"
                label-idle="選擇檔案或拖曳至此"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/*"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="row" style="margin-bottom:1%">
            <div class="col-6 p-0 m-0 flex">
              <b-img class="imgstyle" :src=carousel2 v-pswp="carousel2" fluid alt="輪播圖"></b-img>
            </div>
            <div class="col-6 p-0">
              <file-pond
                name="carousel2"
                ref="pond"
                label-idle="選擇檔案或拖曳至此"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/*"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6 p-0 m-0 flex">
              <b-img class="imgstyle" :src=carousel3 v-pswp="carousel3" fluid alt="輪播圖"></b-img>
            </div>
            <div class="col-6 p-0">
              <file-pond
                name="carousel3"
                ref="pond"
                label-idle="選擇檔案或拖曳至此"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/*"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="col p-0 flex">
            <h4>線上預訂</h4>
          </div>
          <div class="row">
            <div class="col-6 p-0 m-0 flex">
              <b-img class="imgstyle" :src=takeawayimg v-pswp="takeawayimg" fluid alt="預定快取"></b-img>
            </div>
            <div class="col-6 p-0">
              <file-pond
                name="takeaway"
                ref="pond"
                label-idle="選擇檔案或拖曳至此"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/*"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="col p-0 flex">
            <h4>注意事項</h4>
          </div>
          <div class="row inputrow flex">
            <div class="col-1">1.</div>
            <div class="col-11 p-0">
              <b-form-input id="address" v-model="note1" :state=note1State :value=note1></b-form-input>
            </div>
          </div>
          <div class="row inputrow flex">
            <div class="col-1">2.</div>
            <div class="col-11 p-0">
              <b-form-input id="address" v-model="note2" :state=note2State :value=note2></b-form-input>
            </div>
          </div>
          <div class="row inputrow flex">
            <div class="col-1">3.</div>
            <div class="col-11 p-0">
              <b-form-input id="address" v-model="note3" :state=note3State :value=note3></b-form-input>
            </div>
          </div>
          <div class="col p-0 flex">
            <h4>頁尾</h4>
          </div>
          <div class="row inputrow flex">
            <div class="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 text-right">營業時間：</div>
            <div class="col-9 col-sm-10 col-md-10 col-lg-11 col-xl-11 p-0">
              <b-form-input id="address" v-model="opentime" :state=openState :value=opentime></b-form-input>
            </div>
          </div>
          <div class="row inputrow flex">
            <div class="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 text-right">聯絡電話：</div>
            <div class="col-9 col-sm-10 col-md-10 col-lg-11 col-xl-11 p-0">
              <b-form-input id="address" v-model="phone" :state=phoneState :value=phone></b-form-input>
            </div>
          </div>
          <div class="row inputrow flex">
            <div class="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 text-right">fb網址：</div>
            <div class="col-9 col-sm-10 col-md-10 col-lg-11 col-xl-11 p-0">
              <b-form-input id="address" v-model="fburl" :state=fbState :value=fburl></b-form-input>
            </div>
          </div>
          <div class="row inputrow flex">
            <div class="col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 text-right">ig網址：</div>
            <div class="col-9 col-sm-10 col-md-10 col-lg-11 col-xl-11 p-0">
              <b-form-input id="address" v-model="igurl" :state=igState :value=igurl></b-form-input>
            </div>
          </div>
          <div class="col p-0 flex">
            <b-button type="submit" id="btn" variant="danger">儲存</b-button>
          </div>
        </b-form>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Bother',
  data () {
    return {
      file: ['', '', '', '', ''],
      isUpload: [false, false, false, false, false],
      note1: this.$store.getters.takeaway_notes[0],
      note2: this.$store.getters.takeaway_notes[1],
      note3: this.$store.getters.takeaway_notes[2],
      opentime: this.$store.getters.open_time,
      phone: this.$store.getters.phone,
      fburl: this.$store.getters.fb,
      igurl: this.$store.getters.ig,
      myServer: {
        process: (fieldName, file, metadata, load) => {
          const btn = document.getElementById('btn')
          btn.disabled = true
          const name = ['logo', 'carousel1', 'carousel2', 'carousel3', 'takeaway']
          for (const i in name) {
            if (fieldName === name[i]) {
              this.file[i] = file
              this.isUpload[i] = true
            }
          }
          setTimeout(() => {
            load(Date.now())
            btn.disabled = false
          }, 1500)
        }
      }
    }
  },
  computed: {
    logoimg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.logo
      return img
    },
    nowlogo () {
      return this.$store.getters.logo
    },
    carousel1 () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.carousel[0]
      return img
    },
    nowcarousel1 () {
      return this.$store.getters.carousel[0]
    },
    carousel2 () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.carousel[1]
      return img
    },
    nowcarousel2 () {
      return this.$store.getters.carousel[1]
    },
    carousel3 () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.carousel[2]
      return img
    },
    nowcarousel3 () {
      return this.$store.getters.carousel[2]
    },
    takeawayimg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.takeaway_img
      return img
    },
    nowtakeaway () {
      return this.$store.getters.takeaway_img
    },
    note1State () {
      return this.note1.length > 2 ? null : false
    },
    note2State () {
      return this.note2.length > 2 ? null : false
    },
    note3State () {
      return this.note3.length > 2 ? null : false
    },
    openState () {
      return this.opentime.length > 2 ? null : false
    },
    phoneState () {
      return this.phone.length > 2 ? null : false
    },
    fbState () {
      return this.fburl.length > 2 ? null : false
    },
    igState () {
      return this.igurl.length > 2 ? null : false
    },
    getid () {
      return this.$store.getters.other_id
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      const filepondassistant = document.getElementsByClassName('filepond--assistant')
      let toobig = false
      const fd = new FormData()
      for (let i = 0; i < filepondassistant.length; i++) {
        if (filepondassistant[i].innerHTML.includes('檔案太大')) {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '檔案太大',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            })
          })()
          toobig = true
        } else {
          toobig = false
        }
      }
      if (this.note1 === '' || this.note2 === '' || this.note3 === '' || this.opentime === '' || this.phone === '' || this.fburl === '' || this.igurl === '') {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '欄位不可為空',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      }
      if (!toobig) {
        const filename = [this.nowlogo, this.nowcarousel1, this.nowcarousel2, this.nowcarousel3, this.nowtakeaway]
        for (let i = 0; i < filepondassistant.length; i++) {
          if (filepondassistant[i].innerHTML.includes('上傳完成')) {
            fd.append('image', this.file[i])
          } else {
            fd.append('image', filename[i])
          }
        }
        const notes = this.note1 + '===' + this.note2 + '===' + this.note3
        fd.append('filename', filename)
        fd.append('take_away_notes', notes)
        fd.append('open_time', this.opentime)
        fd.append('phone', this.phone)
        fd.append('fb', this.fburl)
        fd.append('ig', this.igurl)
        // 新增
        this.axios.post(process.env.VUE_APP_APIURL + '/add_other', fd, {
          // 因為 axios 預設是送 json，所以要自己設定成 formdata
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          (async () => {
            await this.$swal.fire({
              icon: 'success',
              title: response.data.message,
              allowOutsideClick: false,
              confirmButtonText: '確定'
            }).then((result) => {
              for (const i in this.isUpload) {
                if (this.isUpload[i] === true) {
                  this.isUpload[i] = false
                }
              }
              this.$store.commit('logo', response.data.other.logo_img)
              this.$store.commit('carousel', response.data.other.carousel)
              this.$store.commit('takeawayImg', response.data.other.take_away_img)
              this.$store.commit('takeawayNotes', response.data.other.take_away_notes)
              this.$store.commit('openTime', response.data.other.open_time)
              this.$store.commit('phone', response.data.other.phone)
              this.$store.commit('fb', response.data.other.fb)
              this.$store.commit('ig', response.data.other.ig)
              this.$store.commit('otherId', response.data.other._id)
            })
          })()
        }).catch(error => {
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
      // 刪除
      this.axios.delete(process.env.VUE_APP_APIURL + '/delete_other/' + this.getid)
        .then(response => {
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
    }
  }
}
</script>
