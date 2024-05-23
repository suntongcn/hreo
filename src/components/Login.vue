<script lang="ts">
export default {
  data() {
    return {
      focusFlag1: false,
      focusFlag2: false,
      username: "",
      passworld: "",
    };
  },
  methods: {
    focus() {},
  },
};
</script>

<template>
  <form action="index.html" class="login-form">
    <h1>Login</h1>

    <div class="txtb">
      <input
        autocomplete="off"
        v-model="username"
        @blur="focusFlag1 = username == '' ? false : true"
        @focus="focusFlag1 = true"
        :class="{ focus: focusFlag1 }"
        type="text"
        name="username"
        id="username"
      />
      <span data-placeholder="Username"></span>
    </div>

    <div class="txtb">
      <input
        v-model="passworld"
        @blur="focusFlag2 = passworld == '' ? false : true"
        @focus="focusFlag2 = true"
        :class="{ focus: focusFlag2 }"
        type="password"
        name="password"
        id="password"
      />
      <span data-placeholder="Password"></span>
    </div>

    <input  type="submit" class="loginbtn" value="Login" />

    <div class="bottom-text">Don't have account? <a href="#">Sign up</a></div>
  </form>
</template>

<style scoped>
.login-form {
  width: 360px;
  background: #f1f1f1;
  height: 580px;
  padding: 80px 40px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-form h1 {
  text-align: center;
  margin-bottom: 60px;
}
.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 30px 0;
}
.txtb input {
  font-size: 15px;
  color: #333;
  border: none;
  background: none;
  padding: 0 5px;
  height: 40px;
  width: 100%;
  outline: none;
  
}

.txtb span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  z-index: -1;
  transition: 0.5s;
  

}

.txtb span::after {
  content: "";
  position: absolute;
  top: 100%;
  width: 0%;
  left: 0px;
  height: 2px;
  background-image: linear-gradient(120deg, #3498db, #8e44ad);
  transition: 0.5s;
}

.focus + span::before {
  top: -5px;
}

.focus + span::after {
  width: 100%;
}

.loginbtn{
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: none;
    background-image:linear-gradient(120deg, #3498db, #8e44ad,#3498db);
    background-size: 200%;
    color: #fff;
    font-size: 15px;
    outline: none;
    cursor: pointer;
    transition: .5s;
}

.loginbtn:hover{
    background-position: right;
}

.bottom-text{
    margin-top: 60px;
    text-align: center;
    font-size: 13px;
}

.txtb input:-internal-autofill-selected {
    /* -webkit-text-fill-color: #FFFFFF !important; */
    /* box-shadow: inset 0 0 0 1000px transparent !important; */
    background-color: #333;
    transition: background-color 5000s ease-in-out 0s !important;
}

</style>