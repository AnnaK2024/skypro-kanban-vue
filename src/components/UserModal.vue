<template>
   <a href="#user-set-target" class="header__user _hover02"  @click="isUserModalVisible = !isUserModalVisible" >Ivan Ivanov</a>
  <div  class="header__pop-user-set pop-user-set" id="user-set-target" v-if="!isUserModalVisible">
    <!-- <a href="">x</a> -->
    <p class="pop-user-set__name">Ivan Ivanov</p>
    <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
    <div class="pop-user-set__theme">
      <p>Темная тема</p>
      <input type="checkbox" class="checkbox" name="checkbox" />
    </div>
    <button type="button" class="_hover03">
      <RouterLink to="/exit" >Выйти</RouterLink>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isUserModalVisible = ref(true);
</script>

<style scoped>

</style>