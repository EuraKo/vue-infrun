<template>
  <!--  컴포넌트 이름은 최소한 두단어 이상조합 파스칼 케이스 사용한다 -->
  <div>
    <h1>{{ propsdata }}</h1>
    <button v-on:click="sendEvent">send</button>
  </div>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    sendEvent: function() {
      this.$emit('renew');
    },
  },
};
</script>

<style></style>
