<template>
  <div id="babout">
    <div class="container">
      <h1>關於我們</h1>
      <b-form @submit="submit" class="form">
        <div class="img">
          <b-img :src=getimg v-pswp="getimg" fluid alt="關於我們"></b-img>
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
        <div class="intro">
          <h5>店家介紹</h5>
          <textarea name="textarea"  v-model="message"></textarea>
        </div>
        <div class="button">
          <b-button type="submit" id="btn" variant="danger">儲存</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Babout',
  data () {
    return {
      file: '',
      message: this.$store.getters.about_intro,
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
    getid () {
      return this.$store.getters.about_id
    },
    getimg () {
      const img = process.env.VUE_APP_APIURL + '/file/' + this.$store.getters.about_img
      return img
    },
    nowfile () {
      return this.$store.getters.about_img
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
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
      } else {
        if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
          fd.append('image', this.file)
        } else {
          fd.append('image', this.nowfile)
        }
        fd.append('introduction', this.message)
        // 新增
        this.axios.post(process.env.VUE_APP_APIURL + '/add_about', fd, {
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
              this.$store.commit('aboutImg', response.data.name)
              this.$store.commit('aboutId', response.data._id)
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
        // 刪除
        this.axios.delete(process.env.VUE_APP_APIURL + '/delete_about/' + this.getid)
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
}
</script>
