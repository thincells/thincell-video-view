<template>
  <main class="profile-page">
    <section class="profile-content">
      <user-info />
    </section>
    <nav class="bottom-navigation">
      <bottom-nav />
    </nav>
  </main>
</template>

<script setup lang="ts">
import UserInfo from '@/components/profile/UserInfo.vue'
import BottomNav from '@/components/layout/BottomNav.vue'
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  padding-bottom: 56px;
}
</style>
