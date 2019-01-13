<template>
  <div class="description">
    <h2 v-if="type=='code'">阅读码使用说明</h2>
    <div class="content" v-html="infoBuy"></div>
  </div>
</template>

<script>
  import db from '../service/db';
  export default {
    name: 'description',
    data() {
      return {
        type: '',
        infoBuy: '',
        infoUse: ''
      }
    },
    created() {
      this.type = this.$route.query.type;
      this.infoBuy = db.get('infoBuy')
      this.infoUse = db.get('infoUse')
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .description {
    padding: .2rem .3rem;
    h2 {
      font-size: .32rem;
      text-align: center;
      font-weight: bold;
      margin-bottom: .12rem;
    }
  }
</style>