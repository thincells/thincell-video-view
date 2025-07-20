<template>
  <nav class="bottom-nav">
    <button class="nav-item" :class="{ active: activeIdx === 0 }" @click="go(0)">
      <svg
        class="icon-home"
        viewBox="0 0 1024 1024"
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M192 448L512 192L832 448"
          stroke="#ff5c8a"
          stroke-width="40"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="256"
          y="448"
          width="512"
          height="320"
          rx="32"
          stroke="#ff5c8a"
          stroke-width="40"
          fill="none"
        />
        <rect
          x="416"
          y="608"
          width="192"
          height="160"
          rx="16"
          stroke="#ff5c8a"
          stroke-width="32"
          fill="none"
        />
      </svg>
      <span>首页</span>
    </button>
    <button class="nav-item" :class="{ active: activeIdx === 1 }" @click="go(1)">
      <svg class="icon-user" viewBox="0 0 1024 1024" width="24" height="24">
        <circle cx="512" cy="384" r="128" fill="#ff5c8a" fill-opacity=".15" />
        <circle cx="512" cy="384" r="128" stroke="#ff5c8a" stroke-width="32" fill="none" />
        <path
          d="M192 832c0-106 134-160 320-160s320 54 320 160"
          stroke="#ff5c8a"
          stroke-width="32"
          fill="none"
        />
      </svg>
      <span>我的</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const activeIdx = ref(0)

function setActiveByRoute(path: string) {
  if (path === '/profile') activeIdx.value = 1
  else activeIdx.value = 0
}

function go(idx: number) {
  activeIdx.value = idx
  if (idx === 0) router.push('/home')
  else router.push('/profile')
}

onMounted(() => {
  setActiveByRoute(route.path)
})

watch(
  () => route.path,
  newPath => {
    setActiveByRoute(newPath)
  }
)
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  z-index: 100;
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
    font-size: 13px;
    &.active {
      color: #ff5c8a;
    }
    svg {
      margin-bottom: 2px;
    }
  }
}
</style>
