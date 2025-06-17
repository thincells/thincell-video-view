<template>
  <div class="user-info-page">
    <TopActionBar />
    <!-- 头像与基础信息 -->
    <div class="user-header">
      <th-image
        class="avatar"
        :src="user.avatar"
        :alt="user.username"
        width="64px"
        height="64px"
        fit="cover"
        :round="true"
      />
      <div class="user-info-main">
        <div class="user-row">
          <span class="username">{{ user.username }}</span>
          <i class="iconfont icon-edit edit-icon"></i>
        </div>
        <div class="user-row user-uid">
          <span class="uid">UID: {{ user.uid }}</span>
        </div>
      </div>
    </div>
   
    <!-- 分割线 -->
    <div class="divider"></div>
    <!-- 功能区 -->
    <div class="user-actions">
      <div
        class="action-item"
        v-for="item in actions"
        :key="item.label"
        :class="{ active: tab === item.key }"
        @click="tab = item.key"
      >
        <img v-if="item.icon && (item.icon.endsWith('.png') || item.icon.endsWith('.svg'))" :src="item.icon" class="action-img" alt="icon" />
        <i v-else :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="tab-content">
      <Transition name="tab-fade" mode="out-in">
        <component :is="tab === 'favorite' ? MyFavorite : HistoryList" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThImage from '@/components/global/ThImage.vue'
import TopActionBar from './TopActionBar.vue'
import MyFavorite from './MyFavorite.vue'
import HistoryList from './HistoryList.vue'
import { ref } from 'vue'
import startImg from '@/assets/images/start.png'
import history from '@/assets/images/history.png'
import uitFavorite from '@/assets/images/UitFavorite.png'

const user = ref({
  avatar: startImg,
  username: '晴天下的情绪',
  bcoin: 0,
  coin: 2104,
  uid: 2104,
  stats: {
    posts: 5,
    follows: 66,
    fans: 8
  }
})

const tab = ref('favorite')

const actions = [
  { icon: uitFavorite, label: '我的收藏', key: 'favorite' },
  { icon: history, label: '历史记录', key: 'history' }
]
</script>

<style lang="scss" scoped>
.user-info-page {
  margin: 0 auto;
  padding: 0 0 32px 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  background: #fff;
  position: relative;
  @media (max-width: 600px) {
    max-width: 100vw;
    padding: 0 0 24px 0;
  }
}
.user-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 0 24px;
  margin-top: 0;
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #f5f5f5;
    box-shadow: 0 2px 8px #f5f5f5;
  }
  .user-info-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    .user-row {
      display: flex;
      align-items: center;
      gap: 6px;
      .username {
        font-size: 18px;
        font-weight: 600;
        color: #e67ea5;
      }
      .edit-icon {
        font-size: 15px;
        color: #bbb;
        cursor: pointer;
      }
      .lv-badge {
        background: #ffe4b5;
        color: #ff9800;
        font-size: 12px;
        border-radius: 8px;
        padding: 1px 6px;
        margin-left: 2px;
      }
      .vip-badge {
        background: #ffb6c1;
        color: #fff;
        font-size: 12px;
        border-radius: 8px;
        padding: 1px 8px;
        margin-left: 0;
      }
      .coin-badge {
        background: #ffb6c1;
        color: #fff;
        font-size: 13px;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 2px;
      }
      .coin-label {
        font-size: 13px;
        color: #888;
        margin-right: 8px;
      }
      .uid {
        color: #bbb;
        font-size: 12px;
      }
    }
    .user-coins {
      margin-top: 2px;
    }
    .user-uid {
      margin-top: 2px;
    }
  }
}
.user-stats {
  display: flex;
  justify-content: space-between;
  margin: 18px 24px 0 24px;
  background: #fff;
  .stat-item {
    flex: 1;
    text-align: center;
    .stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #e67ea5;
    }
    .stat-label {
      font-size: 13px;
      color: #888;
      margin-top: 2px;
    }
  }
}
.vip-info {
  margin: 18px 24px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffe4ef;
  border-radius: 12px 12px 0 0;
  padding: 8px 16px 8px 12px;
  .vip-discount {
    color: #e67ea5;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    .iconfont {
      color: #e67ea5;
      font-size: 16px;
    }
  }
  .vip-center {
    background: #e67ea5;
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 4px 16px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
  }
}
.vip-desc {
  margin: 0 24px 0 24px;
  font-size: 13px;
  color: #888;
  background: #ffe4ef;
  border-radius: 0 0 12px 12px;
  padding: 0 0 8px 12px;
}
.divider {
  height: 1px;
  background: #f5f5f5;
  margin: 18px 0 0 0;
}
.user-actions {
  display: flex;
  justify-content: space-between;
  margin: 0 24px;
  padding: 18px 0 0 0;
  .action-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    i {
      font-size: 22px;
      margin-bottom: 4px;
      color: #6eb4ff;
    }
  }
}
.action-img {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto 4px auto;
}
.action-item.active {
  color: #e67ea5;
  font-weight: 600;
}
.tab-content {
  min-height: 200px;
  position: relative;
}
.tab-fade-enter-active, .tab-fade-leave-active {
  transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
}
.tab-fade-enter-from, .tab-fade-leave-to {
  opacity: 0;
}
.tab-fade-enter-to, .tab-fade-leave-from {
  opacity: 1;
}
</style> 