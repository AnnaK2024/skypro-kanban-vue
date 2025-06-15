<template>
 <AuthForm :onClick="handleSignIn" />
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue';
import { useRouter } from 'vue-router';


const router = useRouter()

async function handleSignIn(e) {
    e.preventDefault()
    localStorage.setItem('userInfo', 'true')
    router.push('/')
}
</script>

<style scoped></style>