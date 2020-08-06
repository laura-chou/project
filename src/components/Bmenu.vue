<template>
  <div id="bmenu">
    <div class="container">
      <h1>菜單介紹</h1>
      <div class="menu">
        <b-table id="my-table" :fields="fields" :items="items" :per-page="perPage" :current-page="currentPage" Default>
          <template v-slot:cell(delete)="data">
            <div @click="del(data)" style="color:red">
              <font-awesome-icon class="icon-size" :icon="['fas','trash-alt']"></font-awesome-icon>
            </div>
          </template>
          <template v-slot:cell(image)="data">
            <div class="imgdiv"><b-img :src="data.value" v-pswp="data.value"></b-img></div>
          </template>
          <template v-slot:cell(name)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(notes))="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(price))="data">
            <span>${{ data.value }}</span>
          </template>
          <template v-slot:cell(edit)="data">
            <div @click="edit(data)" style="color:green">
              <font-awesome-icon class="icon-size" :icon="['fas','edit']"></font-awesome-icon>
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
        <div class="button">
          <b-button id="btn" variant="danger" v-b-modal.modal1 @click="add">新增</b-button>
        </div>
      </div>
      <div>
        <b-modal id="modal1" @shown="shown"
        no-fade
        class="hidden"
        no-close-on-backdrop
        centered>
          <div>圖片：
            <file-pond
              name="test"
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
          <div>名稱:<input id="add-name" v-model="name" type="text" class="swal2-input"></div>
          <div>附註:<input id="add-notes" v-model="notes" type="text" class="swal2-input"></div>
          <div>價格:<input id="add-price" v-model="price" type="number" min=1 class="swal2-input"></div>
          <div class="swal2-actions">
            <b-button class="swal2-styled swal2-cancel" variant="danger" @click="send">確定</b-button>
            <b-button class="swal2-styled swal2-confirm" variant="danger" @click="cancel">取消</b-button>
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
          key: 'image',
          label: '圖片：'
        },
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'notes',
          label: '附註'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'edit',
          label: '編輯'
        }
      ],
      perPage: 5,
      currentPage: 1,
      items: this.$store.getters.menu,
      file: '',
      name: '',
      notes: '',
      price: 0,
      myServer: {
        process: (fieldName, file, metadata, load) => {
          const btn = document.getElementById('btn')
          btn.disabled = true
          this.file = file
          this.isUpload = true
          setTimeout(() => {
            load(Date.now())
            btn.disabled = false
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
    add () {
      const modal = document.getElementById('modal1___BV_modal_outer_')
      modal.classList.remove('hidden')
    },
    send () {
      const filepondassistant = document.getElementsByClassName('filepond--assistant')
      const fd = new FormData()
      if (filepondassistant[0].innerHTML.includes('檔案太大')) {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '檔案太大',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else if (filepondassistant[0].innerHTML === '') {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '未選擇檔案',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else if (this.name === '' || this.notes === '') {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '欄位未填寫',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else if (this.price === 0) {
        (async () => {
          await this.$swal.fire({
            icon: 'error',
            title: '價格不可以為0',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      } else {
        if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
          fd.append('image', this.file)
        } else {
          fd.append('image', this.nowfile)
        }
        fd.append('name', this.name)
        fd.append('notes', this.notes)
        fd.append('price', this.price)
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
      this.cancel()
    },
    cancel () {
      const modal = document.getElementById('modal1___BV_modal_outer_')
      modal.classList.add('hidden')
      this.name = ''
      this.notes = ''
      this.price = 0
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
                this.$store.commit('news', this.items)
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
    edit (data) {
      (async () => {
        const id = data.item._id
        let index = 0
        for (const i in this.items) {
          if (this.items[i]._id === id) {
            index = i
            break
          }
        }
        const icename = this.items[index].name
        const note = this.items[index].notes
        const price = this.items[index].price
        await this.$swal.fire({
          allowOutsideClick: false,
          html: `<div>名稱:<input id="edit-icename" type='text' class="swal2-input" value=${icename}></input></div>` +
          `<div>附註:<input id="edit-note" type="text" class="swal2-input" value=${note}></div>` +
          `<div>價格:<input id="edit-price" type="number" class="swal2-input" value=${price}></div>`,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '儲存',
          cancelButtonText: '取消',
          preConfirm: () => {
            return [
              document.getElementById('edit-icename').value,
              document.getElementById('edit-note').value,
              document.getElementById('edit-price').value
            ]
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const id = this.items[index]._id
            const send = {
              name: result.value[0],
              notes: result.value[1],
              price: result.value[2]
            }
            this.axios.patch(process.env.VUE_APP_APIURL + '/update_menu/' + id, send)
              .then(response => {
                (async () => {
                  await this.$swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    allowOutsideClick: false,
                    confirmButtonText: '確定'
                  }).then((result) => {
                    this.items[index].name = response.data.result.name
                    this.items[index].notes = response.data.result.notes
                    this.items[index].price = response.data.result.price
                    this.$store.commit('news', this.items)
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
        })
      })()
    },
    shown: function () {
      const modal = document.getElementById('modal1')
      modal.classList.add('showModal')
    }
  }
}
</script>
