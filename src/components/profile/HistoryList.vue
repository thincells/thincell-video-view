<template>
  <div class="history-list">
    <InfiniteScroll :onLoadMore="loadMore" :hasMore="hasMore" :loading="loading">
      <div v-for="item in list" :key="item.id" class="history-item">
        <ThImage :src="item.cover" :alt="item.title" class="cover" width="140px" height="80px" />
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="meta">
            <span class="author">UP {{ item.author }}</span>
            <span class="time">{{ item.time }}</span>
            <span class="views">{{ item.views }}播放</span>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'
import ThImage from '@/components/global/ThImage.vue'

const allData = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title: `历史视频标题 ${i + 1}`,
  desc: `这是第${i + 1}个历史记录视频的简介。`,
  cover: `https://picsum.photos/seed/his${i + 1}/320/180`,
  author: `用户${i % 5 + 1}`,
  time: `今天 ${(8 + i) % 24}:1${i % 6}分`,
  views: Math.floor(Math.random() * 10000)
}))

const list = ref(allData.slice(0, 8))
const hasMore = ref(true)
const loading = ref(false)

function loadMore() {
  loading.value = true
  return new Promise<void>(resolve => {
    setTimeout(() => {
      const next = allData.slice(list.value.length, list.value.length + 8)
      list.value = list.value.concat(next)
      if (list.value.length >= allData.length) hasMore.value = false
      loading.value = false
      resolve()
    }, 600)
  })
}
</script>

<style scoped>
.history-list {
  padding: 12px 0;
}
.history-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px 10px 16px;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.cover {
  width: 140px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #eee;
}
.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}
.title {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #999;
  margin-top: 2px;
  flex-wrap: wrap;
}
.author {
  color: #888;
}
.time {
  color: #bbb;
}
.views {
  color: #bbb;
}
</style> 