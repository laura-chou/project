<template>
    <div id="bother">
      <h2>其他</h2>
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
        <!-- home -->
        <div class="other" v-if="mode === '首頁'">
          <div class="change_page" style="border-bottom: 5px solid #758629;" @click="change_page('輪播圖')">
            <p class="m-0">輪播圖</p>
          </div>
          <div class="change_page" style="border-bottom: 5px solid #758629;" @click="change_page('背景圖')">
            <p class="m-0">背景圖</p>
          </div>
          <div class="change_page" @click="change_page('文字訊息')">
            <p class="m-0">文字訊息</p>
          </div>
        </div>
        <!-- carousel -->
        <div class="other" v-if="mode === '輪播圖'">
          <div class="row body">
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0"><b-img class="imgstyle" :src=carousel1 v-pswp="carousel1" fluid alt="輪播圖"></b-img></div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img1"
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
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0"><b-img class="imgstyle" :src=carousel2 v-pswp="carousel2" fluid alt="輪播圖"></b-img></div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img2"
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
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <b-img class="imgstyle" :src=carousel3 v-pswp="carousel3" fluid alt="輪播圖"></b-img>
            </div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img3"
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
          <div class="row" style="height: 10%">
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button class="btn" variant="danger" @click="change_page('首頁')">返回</b-button>
              </div>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button class="btn" variant="danger" @click="submit('carousel')">儲存</b-button>
              </div>
            </div>
          </div>
        </div>
        <!-- background -->
        <div class="other" v-if="mode === '背景圖'">
          <div class="row body">
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <b-img class="imgstyle" :src=menubg v-pswp="menubg" fluid alt="菜單介紹背景圖"></b-img>
              <h2 class="title">菜單介紹</h2>
            </div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img1"
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
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <b-img class="imgstyle" :src=takeawayimg v-pswp="takeawayimg" fluid alt="線上預訂背景圖"></b-img>
              <h2 class="title">線上預訂</h2>
            </div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img2"
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
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <b-img class="imgstyle" :src=contactbg v-pswp="carousel3" fluid alt="聯絡我們背景圖"></b-img>
              <h2 class="title">聯絡我們</h2>
            </div>
            <div class="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 p-0">
              <file-pond
                name="img3"
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
          <div class="row" style="height: 10%">
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button class="btn" variant="danger" @click="change_page('首頁')">返回</b-button>
              </div>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <div class="button">
                <b-button class="btn" variant="danger" @click="submit('background')">儲存</b-button>
              </div>
            </div>
          </div>
        </div>
        <!-- message -->
        <div class="other" v-if="mode === '文字訊息'">
          <div class="body1">
            <div class="notice">
              <h4 class="mb-2">注意事項</h4>
              <div class="row inputrow">
                <span class="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">1.</span>
                <div class="col-12 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="note1" :state=note1State :value=note1></b-form-input>
                </div>
              </div>
              <div class="row inputrow">
                <span class="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">2.</span>
                <div class="col-12 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="note2" :state=note2State :value=note2></b-form-input>
                </div>
              </div>
              <div class="row inputrow">
                <span class="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">3.</span>
                <div class="col-12 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="note3" :state=note3State :value=note3></b-form-input>
                </div>
              </div>
            </div>
            <div class="footer">
              <h4 class="mb-2">頁尾</h4>
              <div class="row inputrow">
                <span class="col-12 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">營業時間</span>
                <div class="col-12 col-sm-10 col-md-10 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="opentime" :state=openState :value=opentime></b-form-input>
                </div>
              </div>
              <div class="row inputrow">
                <span class="col-12 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">聯絡電話</span>
                <div class="col-12 col-sm-10 col-md-10 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="phone" :state=phoneState :value=phone></b-form-input>
                </div>
              </div>
              <div class="row inputrow">
                <span class="col-12 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">fb網址</span>
                <div class="col-12 col-sm-10 col-md-10 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="fburl" :state=fbState :value=fburl></b-form-input>
                </div>
              </div>
              <div class="row inputrow">
                <span class="col-12 col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center">ig網址</span>
                <div class="col-12 col-sm-10 col-md-10 col-lg-11 col-xl-11">
                  <b-form-input id="address" v-model="igurl" :state=igState :value=igurl></b-form-input>
                </div>
              </div>
            </div>
            <div class="row" style="height: 10%">
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="button">
                  <b-button class="btn" variant="danger" @click="change_page('首頁')">返回</b-button>
                </div>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="button">
                  <b-button class="btn" variant="danger" @click="submit('message')">儲存</b-button>
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
  name: 'Bother',
  data () {
    return {
      mode: '首頁',
      file: ['', '', ''],
      note1: this.$store.getters.takeaway_notes[0],
      note2: this.$store.getters.takeaway_notes[1],
      note3: this.$store.getters.takeaway_notes[2],
      opentime: this.$store.getters.open_time,
      phone: this.$store.getters.phone,
      fburl: this.$store.getters.fb,
      igurl: this.$store.getters.ig,
      myServer: {
        process: (fieldName, file, metadata, load) => {
          const btn = document.getElementsByClassName('btn')
          for (const b of btn) {
            b.disabled = true
          }
          const name = ['img1', 'img2', 'img3']
          for (const i in name) {
            if (fieldName === name[i]) {
              this.file[i] = file
            }
          }
          setTimeout(() => {
            load(Date.now())
            for (const b of btn) {
              b.disabled = false
            }
          }, 1500)
        }
      }
    }
  },
  computed: {
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
    menubg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.menu_bg
      return img
    },
    nowmenubg () {
      return this.$store.getters.menu_bg
    },
    takeawayimg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.takeaway_img
      return img
    },
    contactbg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.contact_bg
      return img
    },
    nowcontactbg () {
      return this.$store.getters.contact_bg
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
    submit (page) {
      const btn = document.getElementsByClassName('btn')
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
          return
        } else {
          toobig = false
        }
      }
      if (page === 'carousel' && !toobig) {
        for (const b of btn) {
          b.disabled = true
        }
        const filename = [this.nowcarousel1, this.nowcarousel2, this.nowcarousel3]
        for (let i = 0; i < filepondassistant.length; i++) {
          if (filepondassistant[i].innerHTML.includes('上傳完成')) {
            fd.append('image', this.file[i])
          } else {
            fd.append('image', filename[i])
          }
        }
        fd.append('filename', filename)
        fd.append('page', page)
        this.axios.patch(process.env.VUE_APP_APIURL + '/update_other/' + this.getid, fd)
          .then(response => {
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                for (const b of btn) {
                  b.disabled = false
                }
                console.log(response.data.result)
                this.$store.commit('carousel', response.data.result.carousel)
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
      } else if (page === 'background' && !toobig) {
        const filename = [this.nowmenubg, this.nowtakeaway, this.nowcontactbg]
        for (let i = 0; i < filepondassistant.length; i++) {
          if (filepondassistant[i].innerHTML.includes('上傳完成')) {
            fd.append('image', this.file[i])
          } else {
            fd.append('image', filename[i])
          }
        }
        fd.append('filename', filename)
        fd.append('page', page)
        for (const b of btn) {
          b.disabled = true
        }
        this.axios.patch(process.env.VUE_APP_APIURL + '/update_other/' + this.getid, fd)
          .then(response => {
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                for (const b of btn) {
                  b.disabled = false
                }
                this.$store.commit('menuBg', response.data.result.menubg_img)
                this.$store.commit('takeawayImg', response.data.result.take_away_img)
                this.$store.commit('contactBg', response.data.result.contactbg_img)
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
      } else if (page === 'message' && !toobig) {
        if (this.note1 === '' || this.note2 === '' || this.note3 === '' || this.opentime === '' || this.phone === '' || this.fburl === '' || this.igurl === '') {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '欄位不可為空',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            })
          })()
        } else {
          for (const b of btn) {
            b.disabled = true
          }
          const notes = this.note1 + '===' + this.note2 + '===' + this.note3
          fd.append('page', page)
          fd.append('take_away_notes', notes)
          fd.append('open_time', this.opentime)
          fd.append('phone', this.phone)
          fd.append('fb', this.fburl)
          fd.append('ig', this.igurl)
          this.axios.patch(process.env.VUE_APP_APIURL + '/update_other/' + this.getid, fd)
            .then(response => {
              (async () => {
                await this.$swal.fire({
                  icon: 'success',
                  title: response.data.message,
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  for (const b of btn) {
                    b.disabled = false
                  }
                  this.$store.commit('takeawayNotes', response.data.result.take_away_notes)
                  this.$store.commit('openTime', response.data.result.open_time)
                  this.$store.commit('phone', response.data.result.phone)
                  this.$store.commit('fb', response.data.result.fb)
                  this.$store.commit('ig', response.data.result.ig)
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
      }
    },
    change_page (page) {
      this.mode = page
    }
  }
}
</script>
