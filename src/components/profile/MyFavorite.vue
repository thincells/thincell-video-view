<template>
  <div class="favorite-root">
    <div class="favorite-list">
      <InfiniteScroll :onLoadMore="loadMore" :hasMore="hasMore" :loading="loading">
        <div v-for="item in list" :key="item.id" class="favorite-item">
          <div class="cover-wrap">
            <ThImage :src="item.cover" :alt="item.title" class="cover" width="140px" height="80px" />
            <div v-if="item.badge" class="badge" :style="{background: item.badgeColor || '#6eb4ff'}">
              {{ item.badge }}
            </div>
            <div v-if="item.progress" class="progress-text">上次看过</div>
          </div>
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="meta">
              <span class="episodes">{{ item.episodes }}</span>
            </div>
            <div v-if="item.progress" class="progress-info">{{ item.progress }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
          <div class="card-actions" @click="openActionSheet(item)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="6" r="1.5" fill="#bbb"/>
              <circle cx="12" cy="12" r="1.5" fill="#bbb"/>
              <circle cx="12" cy="18" r="1.5" fill="#bbb"/>
            </svg>
          </div>
        </div>
      </InfiniteScroll>
    </div>
    <div v-if="showActionSheet">
      <div class="action-sheet-mask" @click="closeActionSheet"></div>
      <div class="action-sheet-panel">
        <button class="action-sheet-btn" @click="handleUnfavorite">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="vertical-align:middle;margin-right:6px;"><path d="M19.5 12.572c0 2.572-2.072 4.656-4.63 6.572-1.13.87-2.24 1.572-2.24 1.572s-1.11-.702-2.24-1.572C6.572 17.228 4.5 15.144 4.5 12.572 4.5 10.5 6.072 9 8.01 9c1.02 0 1.99.51 2.49 1.29C11.99 9.51 12.96 9 13.99 9c1.938 0 3.51 1.5 3.51 3.572z" stroke="#ff5c8a" stroke-width="1.5" fill="none"/></svg>
          取消收藏
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InfiniteScroll from '@/components/common/InfiniteScroll.vue'
import ThImage from '@/components/global/ThImage.vue'

const allData = [
  {
    id: 1,
    title: '蜡笔小新 第一季（中文）',
    desc: '',
    cover: 'https://puui.qpic.cn/vcover_hz_pic/0/nsgczu8u2kvpe9e1492138106/0?max_age=7776000',
    badge: '番剧',
    badgeColor: '#ff5c8a',
    episodes: '全480话',
    progress: '第375话 04:21'
  },
  {
    id: 2,
    title: '凡人修仙传',
    desc: '',
    cover: 'https://media.9game.cn/gamebase/2022/3/9/dfb376f9500f6748390084d56298e8be.jpg?x-oss-process=image/resize,h_800,m_lfit',
    badge: '国创',
    badgeColor: '#ffb347',
    episodes: '更新至第147话',
    progress: '外海风云第24集预告 00:34'
  },
  {
    id: 3,
    title: '蜡笔小新：呼风唤雨！我与宇宙公主',
    desc: '',
    cover: 'https://th.bing.com/th/id/OIP.JV6mhc9sNM7juhaygYTjzAAAAA?rs=1&pid=ImgDetMain',
    badge: '番剧',
    badgeColor: '#ff5c8a',
    episodes: '全1话',
    progress: ''
  },
  {
    id: 4,
    title: '蜡笔小新：呼风唤雨！金矛之勇者',
    desc: '',
    cover: 'https://d2sal5lpzsf102.cloudfront.net/74647/public/public/system/posters/1185861/standard/cs2008_keyart_350x511_p_jap_1669966771.jpg',
    badge: '番剧',
    badgeColor: '#ff5c8a',
    episodes: '全1话',
    progress: ''
  },
  {
    id: 5,
    title: '蜡笔小新：呼唤传说！跳舞吧！朋友！',
    desc: '',
    cover: 'https://p1.ssl.qhimg.com/dr/270_500_/t01d62071a552286c29.jpg?size=210x299',
    badge: '番剧',
    badgeColor: '#ff5c8a',
    episodes: '全1话',
    progress: ''
  }
]

const list = ref(allData)
const hasMore = ref(false)
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

// ActionSheet 相关逻辑
const showActionSheet = ref(false)
const currentItem = ref<any>(null)
function openActionSheet(item:any) {
  currentItem.value = item
  showActionSheet.value = true
}
function closeActionSheet() {
  showActionSheet.value = false
  currentItem.value = null
}
function handleUnfavorite() {
  // TODO: 这里可对接API
  alert('已取消收藏: ' + (currentItem.value?.title || ''))
  closeActionSheet()
}
</script>

<style scoped>
.progress-text {
  position: absolute;
  left: 6px;
  bottom: 6px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  padding: 1px 6px;
  z-index: 2;
}

.favorite-list {
  padding: 12px 0;
}
.favorite-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px 10px 16px;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  position: relative;
}
.cover-wrap {
  position: relative;
  width: 140px;
  height: 80px;
  flex-shrink: 0;
}
.cover {
  width: 140px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  background: #eee;
}
.badge {
  position: absolute;
  top: 6px;
  left: 6px;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 8px;
  font-weight: 600;
  z-index: 2;
}
.episodes-label {
  position: absolute;
  left: 6px;
  bottom: 6px;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  padding: 1px 6px;
  z-index: 2;
  min-width: 36px;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #999;
  margin-bottom: 2px;
  flex-wrap: wrap;
}
.episodes {
  color: #888;
}
.progress-info {
  color: #ff5c8a;
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 2px;
}
.desc {
  font-size: 13px;
  color: #888;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-actions {
  position: absolute;
  right: 12px;
  bottom: 10px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.card-actions:hover {
  opacity: 1;
}
.action-sheet-mask {
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
}
.action-sheet-panel {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 16px rgba(0,0,0,0.08);
  z-index: 1001;
  padding: 18px 0 10px 0;
  animation: sheetUp 0.28s cubic-bezier(0.4,0,0.2,1);
}
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.action-sheet-btn {
  width: 90%;
  margin: 0 auto 8px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #ff5c8a;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 500;
  padding: 12px 0;
  cursor: pointer;
  transition: background 0.2s;
}
.action-sheet-btn:active {
  background: #ffe4ef;
}
.action-sheet-cancel {
  width: 90%;
  margin: 0 auto;
  display: block;
  background: #f5f5f5;
  color: #222;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 400;
  padding: 12px 0;
  cursor: pointer;
  margin-top: 2px;
}
.action-sheet-cancel:active {
  background: #eee;
}
</style> 