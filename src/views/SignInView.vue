<template>
 <AuthForm :onClick="hendleSignIn" />
</template>

<script setup lang="ts">
import AuthForm from '../components/AuthForm.vue';

async function hendleSignIn() {
    console.log("Вход")
    
}
</script>

<style scoped></style>