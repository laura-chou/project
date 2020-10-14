<template>
  <div id="bmenu">
    <h2>菜單</h2>
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
      <div class="menu">
        <b-table id="menu-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
          <template v-slot:cell(delete)="data">
            <div @click="del(data)" style="color:red">
              <font-awesome-icon class="icon-size" :icon="['fas','trash-alt']"></font-awesome-icon>
            </div>
          </template>
          <template v-slot:cell(name)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(price))="data">
            <span>${{ data.value }}</span>
          </template>
          <template v-slot:cell(info)="data">
            <div @click="info(data.item.name)" style="color:blue">
              <font-awesome-icon class="icon-size" :icon="['fas','clipboard-list']"></font-awesome-icon>
            </div>
          </template>
          <template v-slot:cell(edit)="data">
            <div @click="edit(data)" style="color:green">
              <font-awesome-icon class="icon-size" :icon="['fas','edit']"></font-awesome-icon>
            </div>
          </template>
        </b-table>
        <div class="button">
          <b-button id="btn" variant="danger" @click="addmodal = !addmodal">新增</b-button>
        </div>
        <b-pagination
          v-model="currentPage"
          pills :total-rows="rows"
          :per-page="perPage"
          align="fill"
          aria-controls="menu-table"
        ></b-pagination>
      </div>
      <div>
        <b-modal
        v-model="addmodal"
        no-fade
        no-close-on-backdrop
        centered>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">圖片：</div>
            <div class="col-10">
              <file-pond
                name="add"
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
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">名稱：</div>
            <div class="col-10"><input id="add-name" v-model="addname" type="text" class="swal2-input"></div>
          </div>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">附註：</div>
            <div class="col-10"><input id="add-notes" v-model="addnotes" type="text" class="swal2-input"></div>
          </div>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">價格：</div>
            <div class="col-10"><input id="add-price" v-model="addprice" type="number" min=1 class="swal2-input"></div>
          </div>
          <div class="row warn">
            <div class="swal2-validation-message" id="swal2-validation-message" style="display: flex; margin-left: -20px; margin-right: -20px;">
              <span>{{ warn }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-end"><b-button variant="danger" @click="send('add')">確定</b-button></div>
            <div class="col-6 d-flex justify-content-start"><b-button variant="danger" @click="cancel('add')">取消</b-button></div>
          </div>
        </b-modal>
      </div>
      <div>
        <b-modal
        v-model="editmodal"
        no-fade
        no-close-on-backdrop
        centered>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">圖片：</div>
            <div class="col-10">
              <file-pond
                name="edit"
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
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">名稱：</div>
            <div class="col-10"><input id="edit-icename" v-model="editname" type="text" class="swal2-input"></div>
          </div>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">附註：</div>
            <div class="col-10"><input id="add-notes" v-model="editnotes" type="text" class="swal2-input"></div>
          </div>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">價格：</div>
            <div class="col-10"><input id="add-price" v-model="editprice" type="number" min=1 class="swal2-input"></div>
          </div>
          <div class="row warn">
            <div class="swal2-validation-message" id="swal2-validation-message" style="display: flex; margin-left: -20px; margin-right: -20px;">
              <span>{{ warn }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-end"><b-button variant="danger" @click="send('edit')">確定</b-button></div>
            <div class="col-6 d-flex justify-content-start"><b-button variant="danger" @click="cancel('edit')">取消</b-button></div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bmenu',
  data () {
    return {
      fields: [
        {
          key: 'delete',
          label: '刪除'
        },
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'info',
          label: '詳細資訊'
        },
        {
          key: 'edit',
          label: '編輯'
        }
      ],
      addmodal: false,
      editmodal: false,
      perPage: 5,
      currentPage: 1,
      items: this.$store.getters.menu,
      file: '',
      addname: '',
      addnotes: '',
      addprice: 0,
      editid: '',
      editname: '',
      editnotes: '',
      editprice: 0,
      editindex: 0,
      warn: '',
      myServer: {
        process: (fieldName, file, metadata, load) => {
          this.file = file
          this.isUpload = true
          setTimeout(() => {
            load(Date.now())
          }, 1500)
        }
      }
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    send (mode) {
      const filepondassistant = document.getElementsByClassName('filepond--assistant')
      const showwarn = document.getElementsByClassName('warn')
      const btn = document.getElementById('btn')
      const fd = new FormData()
      if (mode === 'add') {
        if (filepondassistant[0].innerHTML.includes('檔案太大')) {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '檔案太大'
          return
        } else if (filepondassistant[0].innerHTML === '') {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '未選擇檔案'
          return
        } else if (this.addname === '' || this.addnotes === '') {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '名稱或附註未填寫'
          return
        } else if (this.addprice === 0) {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '價格不可以為 0'
          return
        } else {
          btn.disabled = true
          if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
            fd.append('image', this.file)
          } else {
            fd.append('image', this.nowfile)
          }
          fd.append('name', this.addname)
          fd.append('notes', this.addnotes)
          fd.append('price', this.addprice)
          // 新增
          this.axios.post(process.env.VUE_APP_APIURL + '/add_menu', fd, {
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
                this.isUpload = false
                btn.disabled = false
                response.data.result.image = process.env.VUE_APP_APIURL + '/file/' + response.data.result.image
                this.items.unshift(response.data.result)
                this.$store.commit('menu', this.items)
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
        this.cancel('add')
      } else {
        if (filepondassistant[0].innerHTML.includes('檔案太大')) {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '檔案太大'
          return
        } else if (this.editname === '' || this.editnotes === '') {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '名稱或附註未填寫'
          return
        } else if (this.editprice === 0 || this.editprice === '0') {
          if (!showwarn[0].hasAttribute('style', 'display: block')) {
            showwarn[0].setAttribute('style', 'display: block')
          }
          this.warn = '價格不可以為 0'
          return
        } else {
          if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
            fd.append('image', this.file)
          }
          fd.append('name', this.editname)
          fd.append('notes', this.editnotes)
          fd.append('price', this.editprice)
          this.axios.patch(process.env.VUE_APP_APIURL + '/update_menu/' + this.editid, fd)
            .then(response => {
              (async () => {
                await this.$swal.fire({
                  icon: 'success',
                  title: response.data.message,
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  if (response.data.result.image !== undefined) {
                    this.items[this.editindex].image = process.env.VUE_APP_APIURL + '/file/' + response.data.result.image
                  }
                  this.items[this.editindex].name = response.data.result.name
                  this.items[this.editindex].notes = response.data.result.notes
                  this.items[this.editindex].price = response.data.result.price
                  this.$store.commit('menu', this.items)
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
        this.cancel('edit')
      }
    },
    cancel (mode) {
      if (mode === 'add') {
        this.addmodal = !this.addmodal
        this.addname = ''
        this.addnotes = ''
        this.addprice = 0
      } else {
        this.editmodal = !this.editmodal
      }
      this.file = ''
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
            this.axios.delete(process.env.VUE_APP_APIURL + '/delete_menu/' + id)
              .then(response => {
                this.items.splice(index, 1)
                this.$store.commit('menu', this.items)
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
    info (data) {
      (async () => {
        let index = 0
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].name === data) {
            index = i
          }
        }
        const image = this.items[index].image
        const name = this.items[index].name
        const notes = this.items[index].notes
        const price = this.items[index].price
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
    edit (data) {
      this.editmodal = !this.editmodal
      const id = data.item._id
      let index = 0
      for (const i in this.items) {
        if (this.items[i]._id === id) {
          index = i
          break
        }
      }
      this.editid = this.items[index]._id
      this.editname = this.items[index].name
      this.editnotes = this.items[index].notes
      this.editprice = this.items[index].price
      this.editindex = index
    }
  }
}
</script>
