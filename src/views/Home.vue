<template>
  <div class="home">
    <div class="video-container">
      <VideoPlayer :config="playerConfig" />
    </div>
    <div class="video-info" v-if="playerConfig.title">
      <h2>{{ playerConfig.title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VideoPlayer from '@/components/player/VideoPlayer.vue'
import type { PlayerConfig } from '@/types'

const playerConfig = ref<PlayerConfig>({
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  title: '示例视频',
  poster: 'https://picsum.photos/800/450',
  volume: 0.8,
  autoplay: false,
  muted: false,
  loop: false,
  danmuku: {
    enable: true,
    url: 'ws://localhost:8080/danmuku',
    color: '#fff',
    fontSize: 24,
    speed: 5,
    opacity: 0.8,
    area: 0.5
  }
})

onMounted(() => {
  // 可以在这里添加视频信息获取逻辑
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
}

.video-container {
  width: 800px;
  height: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.video-info {
  width: 800px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }
}

@media (max-width: 850px) {
  .video-container,
  .video-info {
    width: 100%;
    max-width: 800px;
  }
}
</style> 