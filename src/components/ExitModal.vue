<template>
  <div class="pop-exit" id="popExit">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <form class="pop-exit__form" id="formExit" action="#">
          <div class="pop-exit__form-group">
            <RouterLink to="/sign-in">
              <BaseButton @click="logout" class="pop-exit__exit-yes _hover01">Да, выйти</BaseButton>
            </RouterLink>

            <RouterLink to="/">
              <BaseButton class="pop-exit__exit-no _hover03">Нет, остаться</BaseButton>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const router = useRouter()

function logout(e) {
  e.preventDefault()
  localStorage.removeItem('userInfo')
  router.push('/sign-in')
}
</script>

<style scoped>
.pop-wrap {
  position: relative;
  top: 0;
  left: 0;
}
.pop-exit {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.pop-exit__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.pop-exit__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.pop-exit__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  margin-bottom: 20px;
}
.pop-exit__exit-yes {
  width: 153px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  margin-right: 10px;
}
.pop-exit__exit-yes a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pop-exit__exit-no {
  width: 153px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #565eef;
}
.pop-exit__exit-no a {
  width: 100%;
  height: 100%;
  color: #565eef;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pop-exit__form-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pop-exit:target {
  display: block;
}
@media only screen and (max-width: 375px) {
  .pop-exit__block {
    padding: 50px 20px;
  }
  .pop-exit__exit-yes {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }
  .pop-exit__exit-no {
    width: 100%;
    height: 40px;
  }
  .pop-exit__form-group {
    display: block;
  }
}
</style>
