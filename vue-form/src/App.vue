<template>
  <form action="" v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id:</label>
      <!-- v-model : 인풋에 값입력시 data에 동기화됨(2way 데이터 바인딩) -->
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="pasword">pw:</label>
      <input id="pasword" type="password" v-model="password" />
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  // 컴포넌트가 공유되서 값이 참조되지않게 리턴 꼭 써주기!
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm: function() {
      // event.preventDefault();
      console.log(this.username, this.password);

      var url = 'https://jsonplaceholder.typicode.com/users';
      var data = {
        username: this.username,
        password: this.password,
      };
      // 브라우저에서 서버로 데이터를 주고받기 위한것
      axios
        .post(url, data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
