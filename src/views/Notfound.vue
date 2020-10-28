<template>
  <div id="notfound">
    <div class="row">
      <div class="col-12">
        <h1>404</h1>
      </div>
      <div class="col-12">
        <b-img src="./img/logo.png" @click="home"></b-img>
      </div>
      <div class="col-12">
        <h1>Not Found</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
  body,html {
    height: 100%;
  }
  #notfound {
    height: 100vh;
    background: #c0b536;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .col-12 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .row {
    width: 100%;
  }
  img {
    width: 50%;
    cursor: pointer;
  }
  h1 {
    font-size: 50px;
    font-weight: bolder;
    color: #fff;
  }
</style>>
<script>
export default {
  name: 'Notfound',
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>
