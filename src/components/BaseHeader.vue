<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header__block">
          <div class="header__logo _show _light">
            <a href="" target="_self"><img src="@/assets/images/logo.png" alt="logo" /></a>
          </div>
          <div class="header__logo _dark">
            <a href="" target="_self"><img src="@/assets/images/logo_dark.png" alt="logo" /></a>
          </div>
          <nav class="header__nav">
            <button class="header__btn-main-new _hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </button>
            <a href="#user-set-target" class="header__user _hover02" @click.prevent="toggleModal"
              >Ivan Ivanov</a
            >
            <div
              class="header__pop-user-set pop-user-set"
              :style="{ display: isModalVisible ? 'block' : 'none' }"
              id="user-set-target"
            >
              <!-- <a href="">x</a> -->
              <p class="pop-user-set__name">Ivan Ivanov</p>
              <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
              <div class="pop-user-set__theme">
                <p>Темная тема</p>
                <input type="checkbox" class="checkbox" name="checkbox" />
              </div>
              <button type="button" class="_hover03"><a href="#popExit">Выйти</a></button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isModalVisible = ref(false)

const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value
}
</script>

<style scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
.header__block {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}
.header__logo img {
  width: 85px;
}
.header__nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__btn-main-new {
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
}
.header__btn-main-new a {
  color: #ffffff;
}
.header__user {
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
}
.header__user::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 1px;
  border-left: 1.9px solid #565eef;
  border-bottom: 1.9px solid #565eef;
  transform: rotate(-45deg);
  margin: -6px 0 0 5px;
  padding: 0;
}
.header__pop-user-set {
  display: none;
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
}
.header__pop-user-set.active {
  display: block;
}
.pop-user-set__name {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
}
.pop-user-set__mail {
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
}
.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}
.pop-user-set__theme input[type='checkbox'] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #eaeef6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.pop-user-set__theme input[type='checkbox']::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #94a6be;
  transition: 0.5s;
}
.pop-user-set__theme input:checked[type='checkbox']::before {
  left: 12px;
}
.pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;
}
.pop-user-set button a {
  color: #565eef;
}
.pop-user-set:target{
  display: block;
}
@media screen and (max-width: 495px) {
  .header__btn-main-new {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
    height: 40px;
    border-radius: 4px;
    margin-right: 0;
  }
}  
</style>
