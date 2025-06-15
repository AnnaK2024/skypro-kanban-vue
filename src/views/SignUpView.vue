<template>
 <AuthForm :onClick="handleSignUp" :isSignUp="true"/>
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue';

async function handleSignUp() {
    console.log("Регистрация")
    
}
</script>

<style scoped></style>