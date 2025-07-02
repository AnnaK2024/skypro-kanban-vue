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

<style lang="scss" scoped>
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
.pop-exit__form-group{
  gap: 10px;
}
.pop-exit__exit-yes {
  width: 153px;
  height: 30px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border: 1.5px solid #565eef;
  box-shadow:
    inset 2px 2px 5px rgba(255, 255, 255, 0.9),
    inset -2px -2px 5px rgba(150, 150, 150, 0.3);
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #565eef;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
    box-shadow:
      inset 2px 2px 5px rgba(30, 60, 255, 0.9),
      inset -2px -2px 5px rgba(10, 20, 150, 0.8);
  }
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
  background-color: #f5f7fa;
  border-radius: 4px;
  border: 1.5px solid #565eef;
  box-shadow:
    inset 2px 2px 5px rgba(255, 255, 255, 0.9),
    inset -2px -2px 5px rgba(150, 150, 150, 0.3);
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #565eef;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
    box-shadow:
      inset 2px 2px 5px rgba(30, 60, 255, 0.9),
      inset -2px -2px 5px rgba(10, 20, 150, 0.8);
  }
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
body.dark-theme {
  .pop-exit__container {
    background: rgba(20, 20, 30, 0.5);
  }

  .pop-exit__block {
    background-color: #20202c;
    border: 1px solid #3a4a6d;
    border-radius: 10px;
    color: #cdd9e5;
    box-shadow:
      0 0 10px 3px rgba(58, 74, 109, 0.7),
      0 4px 12px rgba(26, 38, 72, 0.8);
    background-image: radial-gradient(circle at center, rgba(58, 74, 109, 0.3), transparent 70%);
  }

  .pop-exit__ttl h2 {
    color: #eaeef6;
  }

  .pop-exit__exit-yes {
    background-color: transparent;
    border: 0.7px solid var(--palette-navy-60, #565eef);
    color: #aab8ff;

    &:hover,
    &._hover01:hover {
      background-color: #5a6efb;
      color: #ffffff;
    }
  }

  .pop-exit__exit-no {
    background-color: transparent;
    border-color: #5a6efb;
    color: #aab8ff;

    &:hover,
    &._hover03:hover {
      background-color: #5a6efb;
      color: #ffffff;
    }
  }

  .pop-exit__exit-yes a,
  .pop-exit__exit-no a {
    color: inherit;
  }
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
