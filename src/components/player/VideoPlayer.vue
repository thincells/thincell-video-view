<template>
  <div class="video-player" ref="playerContainer">
    <div class="video-player__container" :class="{ 'is-fullscreen': fullscreen }">
      <div class="video-player__video" ref="player"></div>
      <div class="video-player__controls" v-if="!loading">
        <div class="video-player__progress">
          <el-slider
            v-model="currentTime"
            :max="duration"
            :show-tooltip="false"
            @change="handleSeek"
          />
        </div>
        <div class="video-player__buttons">
          <el-button-group>
            <el-button @click="togglePlay">
              <el-icon><VideoPlay v-if="!playing" /><VideoPause v-else /></el-icon>
            </el-button>
            <el-button @click="toggleMute">
              <el-icon><Mute v-if="muted" /><VolumeIcon v-else /></el-icon>
            </el-button>
            <el-slider
              v-model="volume"
              :max="1"
              :step="0.1"
              :show-tooltip="false"
              class="volume-slider"
            />
          </el-button-group>
          <el-button-group>
            <el-button @click="toggleFullscreen">
              <el-icon><FullScreen /></el-icon>
            </el-button>
          </el-button-group>
        </div>
      </div>
      <div class="video-player__loading" v-if="loading">
        <el-icon class="is-loading"><Loading /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'
import ArtPlayer from 'artplayer'
import Hls from 'hls.js'
import type { PlayerConfig } from '@/types'
import {
  VideoPlay,
  VideoPause,
  Mute,
  VideoPlay as VolumeIcon,
  FullScreen,
  Loading
} from '@element-plus/icons-vue'

const props = defineProps<{
  config: PlayerConfig
}>()

const playerStore = usePlayerStore()
const playerContainer = ref<HTMLElement | null>(null)
const player = ref<HTMLElement | null>(null)
let art: ArtPlayer | null = null

const {
  playing,
  currentTime,
  duration,
  volume,
  muted,
  fullscreen,
  loading,
  error
} = storeToRefs(playerStore)

onMounted(() => {
  if (player.value) {
    art = new ArtPlayer({
      container: player.value,
      url: props.config.url,
      title: props.config.title,
      poster: props.config.poster,
      volume: props.config.volume ?? 1,
      autoplay: props.config.autoplay ?? false,
      muted: props.config.muted ?? false,
      loop: props.config.loop ?? false,
      customType: {
        m3u8: function (video: HTMLVideoElement, url: string) {
          if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url
          } else {
            if (art) {
              art.notice.show = '不支持播放该视频格式'
            }
          }
        }
      }
    })

    // 事件监听
    art.on('play', () => playerStore.setPlaying(true))
    art.on('pause', () => playerStore.setPlaying(false))
    art.on('timeupdate', () => playerStore.setCurrentTime(art?.currentTime ?? 0))
    art.on('loadedmetadata', () => playerStore.setDuration(art?.duration ?? 0))
    art.on('volumechange', () => {
      playerStore.setVolume(art?.volume ?? 1)
      playerStore.setMuted(art?.muted ?? false)
    })
    art.on('fullscreenchange', () => playerStore.setFullscreen(art?.fullscreen ?? false))
    art.on('loading', () => playerStore.setLoading(true))
    art.on('loaded', () => playerStore.setLoading(false))
    art.on('error', () => playerStore.setError('视频加载失败'))
  }
})

onUnmounted(() => {
  art?.destroy()
})

// 方法
const togglePlay = () => {
  if (art) {
    if (art.playing) {
      art.pause()
    } else {
      art.play()
    }
  }
}

const toggleMute = () => {
  if (art) {
    art.muted = !art.muted
  }
}

const toggleFullscreen = () => {
  if (art) {
    art.fullscreen = !art.fullscreen
  }
}

const handleSeek = (value: number) => {
  if (art) {
    art.currentTime = value
  }
}

// 监听状态变化
watch(volume, (newValue) => {
  if (art) {
    art.volume = newValue
  }
})

watch(muted, (newValue) => {
  if (art) {
    art.muted = newValue
  }
})
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;

  &__container {
    width: 100%;
    height: 100%;
    position: relative;

    &.is-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
    }
  }

  &__video {
    width: 100%;
    height: 100%;
  }

  &__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__progress {
    width: 100%;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 24px;
  }
}

.volume-slider {
  width: 100px;
  margin: 0 10px;
}
</style> 