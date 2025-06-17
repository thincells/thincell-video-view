<template>
  <div class="top-action-bar">
    <div class="action-btn" @click="toggleIcon">
      <img :src="currentIcon" class="svg-icon" alt="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import moon from '@/assets/images/moon.svg'
import sun from '@/assets/images/sun.svg'

const isMoon = ref(true)
const currentIcon = computed(() => isMoon.value ? moon : sun)

function toggleIcon() {
  isMoon.value = !isMoon.value
}
</script>

<style lang="scss" scoped>
.top-action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 22px;
  padding: 18px 18px 0 0;
  .action-btn {
    cursor: pointer;
    .svg-icon {
      width: 32px;
      height: 32px;
      display: block;
      transition: filter 0.2s;
    }
    &:hover .svg-icon {
      filter: none;
    }
  }
}
</style> 