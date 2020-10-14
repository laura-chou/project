<template>
  <div id="babout">
    <h2>關於我們</h2>
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
          <h4>店家介紹</h4>
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
        // 防止重複點擊
        const btn = document.getElementById('btn')
        btn.disabled = true
        if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
          fd.append('image', this.file)
        }
        fd.append('introduction', this.message)
        this.axios.patch(process.env.VUE_APP_APIURL + '/update_about/' + this.getid, fd)
          .then(response => {
            (async () => {
              await this.$swal.fire({
                icon: 'success',
                title: response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                this.isUpload = false
                btn.disabled = false
                if (response.data.result.image !== undefined) {
                  this.$store.commit('aboutImg', response.data.result.image)
                }
                this.$store.commit('aboutIntro', response.data.result.introduction)
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
