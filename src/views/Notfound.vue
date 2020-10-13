<template>
    <div id="notfound">
      <div class="contain">
        <h1>404</h1>
        <b-img src="./img/logo.png" @click="home"></b-img>
        <h1>Not Found</h1>
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
    flex-direction: column;
  }
  .contain {
    width: 60%;
  }
  img {
    width: 100%;
    cursor: pointer;
  }
  h1 {
    font-size: 70px;
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
