<template>
  <div>
    <div class="pop-new-card" id="popNewCard">
      <div class="pop-new-card__container">
        <div class="pop-new-card__block">
          <div class="pop-new-card__content">
            <h3 class="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" class="pop-new-card__close">&#10006;</a>
            <div class="pop-new-card__wrap">
              <form class="pop-new-card__form form-new" id="formNewCard" action="#">
                <div class="form-new__block">
                  <label for="formTitle" class="subttl">Название задачи</label>
                  <input
                    class="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autofocus
                  />
                </div>
                <div class="form-new__block">
                  <label for="textArea" class="subttl">Описание задачи</label>
                  <textarea
                    class="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                  ></textarea>
                </div>
              </form>
              <BaseCalendar />
            </div>
            <div class="pop-new-card__categories categories">
              <p class="categories__p subttl">Категория</p>
              <div class="categories__themes">
                <div class="categories__theme _orange _active-category">
                  <p class="_orange">Web Design</p>
                </div>
                <div class="categories__theme _green">
                  <p class="_green">Research</p>
                </div>
                <div class="categories__theme _purple">
                  <p class="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <button class="form-new__create _hover01" id="btnCreate">Создать задачу</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseCalendar from './BaseCalendar.vue';

</script>

<style lang="scss" scoped>
.pop-new-card {
  display: none;
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.pop-new-card__container {
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
.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-new-card__content {
  display: block;
  text-align: left;
}
.pop-new-card__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}
.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;
}
.pop-new-card__close:hover {
  color: #000000;
}
.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

</style>
