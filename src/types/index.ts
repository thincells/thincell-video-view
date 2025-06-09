// 视频播放器配置类型
export interface PlayerConfig {
  url: string;
  title?: string;
  poster?: string;
  volume?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  danmuku?: DanmukuConfig;
}

// 弹幕配置类型
export interface DanmukuConfig {
  enable?: boolean;
  url?: string;
  token?: string;
  color?: string;
  fontSize?: number;
  speed?: number;
  opacity?: number;
  area?: number;
}

// 弹幕消息类型
export interface DanmukuMessage {
  text: string;
  color?: string;
  time?: number;
  type?: 'scroll' | 'static';
  position?: 'top' | 'bottom';
}

// 播放器状态类型
export interface PlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  fullscreen: boolean;
  loading: boolean;
  error: string | null;
} 