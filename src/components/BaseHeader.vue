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
            <RouterLink to="/newCard">
              <BaseButton class="header__btn-main-new _hover01" id="btnMainNew">
                Создать новую задачу
              </BaseButton>
            </RouterLink>
            <UserModal />
          </nav>
        </div>
      </div>
      <RouterView />
    </header>
  </div>
</template>

<script setup>

import { RouterLink, RouterView} from 'vue-router'
import UserModal from './UserModal.vue';
import BaseButton from './BaseButton.vue';

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
