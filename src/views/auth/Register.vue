<template>
  <main class="auth-page">
    <article class="auth-container">
      <header class="auth-header">
        <h1 class="auth-title">注册</h1>
        <p class="auth-subtitle">创建您的账户</p>
      </header>

      <form class="auth-form" @submit.prevent="handleRegister">
        <fieldset class="form-group">
          <label class="form-label">邮箱</label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ error: emailError }"
            placeholder="请输入邮箱地址"
            @blur="validateEmail"
            @input="clearEmailError"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </fieldset>

        <fieldset class="form-group">
          <label class="form-label">密码</label>
          <div class="password-input-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ error: passwordError }"
              placeholder="请输入密码"
              @blur="validatePassword"
              @input="clearPasswordError"
            />
            <button type="button" class="password-toggle" tabindex="-1" @click="togglePassword">
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 4C5 4 1.73 8.11 1.13 8.93a1 1 0 0 0 0 1.14C1.73 11.89 5 16 10 16s8.27-4.11 8.87-4.93a1 1 0 0 0 0-1.14C18.27 8.11 15 4 10 4Zm0 10c-3.31 0-6.13-2.61-7.19-4C3.87 8.61 6.69 6 10 6s6.13 2.61 7.19 4C16.13 11.39 13.31 14 10 14Zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                  fill="#409eff"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M2.293 2.293a1 1 0 0 1 1.414 0l14 14a1 1 0 0 1-1.414 1.414l-2.09-2.09C12.47 16.2 11.26 16.5 10 16.5c-5 0-8.27-4.11-8.87-4.93a1 1 0 0 1 0-1.14c.37-.5 1.13-1.47 2.19-2.36L2.293 2.293ZM10 14.5c1.26 0 2.47-.3 3.5-.82l-1.44-1.44A3 3 0 0 1 7.76 8.94l-1.44-1.44C3.87 8.61 1.87 10.39 1.13 11.07c1.06 1.39 3.88 4 7.19 4Zm7.19-3.5c-.37.5-1.13 1.47-2.19 2.36l-1.44-1.44A3 3 0 0 0 12.24 8.94l-1.44-1.44C16.13 8.61 18.13 10.39 18.87 11.07c-1.06 1.39-3.88 4-7.19 4Z"
                  fill="#409eff"
                />
              </svg>
            </button>
          </div>
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </fieldset>

        <fieldset class="form-group">
          <label class="form-label">确认密码</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="form-input"
            :class="{ error: confirmPasswordError }"
            placeholder="请再次输入密码"
            @blur="validateConfirmPassword"
            @input="clearConfirmPasswordError"
          />
          <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
        </fieldset>

        <fieldset class="form-group">
          <label class="form-label">邀请码 <span class="required">*</span></label>
          <input
            v-model="form.inviteCode"
            type="text"
            class="form-input"
            :class="{ error: inviteCodeError }"
            placeholder="请输入邀请码"
            @blur="validateInviteCode"
            @input="clearInviteCodeError"
          />
          <span v-if="inviteCodeError" class="error-message">{{ inviteCodeError }}</span>
        </fieldset>

        <fieldset class="form-group">
          <label class="form-label">验证码</label>
          <div class="verification-input-wrapper">
            <input
              v-model="form.verificationCode"
              type="text"
              class="form-input"
              :class="{ error: verificationCodeError }"
              placeholder="请输入验证码"
              @blur="validateVerificationCode"
              @input="clearVerificationCodeError"
            />
            <button
              type="button"
              class="btn-verification"
              :disabled="!canSendCode || codeSending"
              @click="sendVerificationCode"
            >
              <span v-if="codeSending">发送中...</span>
              <span v-else-if="countdown > 0">{{ countdown }}s</span>
              <span v-else>发送验证码</span>
            </button>
          </div>
          <span v-if="verificationCodeError" class="error-message">{{
            verificationCodeError
          }}</span>
        </fieldset>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="!isFormValid || loading">
            <span v-if="loading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </div>

        <div class="auth-links">
          <span class="auth-text">已有账户？</span>
          <router-link to="/login" class="auth-link"> 立即登录 </router-link>
        </div>
      </form>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  inviteCode: '',
  verificationCode: ''
})

const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const inviteCodeError = ref('')
const verificationCodeError = ref('')
const showPassword = ref(false)
const codeSending = ref(false)
const countdown = ref(0)

const loading = computed(() => authStore.loading)

const isFormValid = computed(() => {
  return (
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.inviteCode &&
    form.value.verificationCode &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !inviteCodeError.value &&
    !verificationCodeError.value
  )
})

const canSendCode = computed(() => {
  return (
    form.value.email &&
    form.value.password &&
    form.value.inviteCode &&
    !emailError.value &&
    !inviteCodeError.value &&
    countdown.value === 0
  )
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    emailError.value = '请输入邮箱地址'
  } else if (!emailRegex.test(form.value.email)) {
    emailError.value = '请输入正确的邮箱格式'
  } else {
    emailError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!form.value.password) {
    passwordError.value = '请输入密码'
  } else {
    passwordError.value = ''
  }
}

const clearPasswordError = () => {
  if (passwordError.value) {
    passwordError.value = ''
  }
}

const validateConfirmPassword = () => {
  if (!form.value.confirmPassword) {
    confirmPasswordError.value = '请再次输入密码'
  } else if (form.value.password !== form.value.confirmPassword) {
    confirmPasswordError.value = '两次输入的密码不一致'
  } else {
    confirmPasswordError.value = ''
  }
}

const clearConfirmPasswordError = () => {
  if (confirmPasswordError.value) {
    confirmPasswordError.value = ''
  }
}

const validateInviteCode = () => {
  if (!form.value.inviteCode) {
    inviteCodeError.value = '请输入邀请码'
  } else {
    inviteCodeError.value = ''
  }
}

const clearInviteCodeError = () => {
  if (inviteCodeError.value) {
    inviteCodeError.value = ''
  }
}

const validateVerificationCode = () => {
  if (!form.value.verificationCode) {
    verificationCodeError.value = '请输入验证码'
  } else {
    verificationCodeError.value = ''
  }
}

const clearVerificationCodeError = () => {
  if (verificationCodeError.value) {
    verificationCodeError.value = ''
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const sendVerificationCode = async () => {
  if (!canSendCode.value) return

  codeSending.value = true

  try {
    const result = await authStore.sendVerificationCode(form.value.email, 'register')

    if (result.success) {
      ElMessage.success('验证码已发送到您的邮箱')

      // 开始倒计时
      countdown.value = 60
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    } else {
      ElMessage.error(result.message || '发送验证码失败')
    }
  } catch (error: unknown) {
    console.error('发送验证码失败:', error)
    ElMessage.error((error as Error)?.message || '发送验证码失败，请重试')
  } finally {
    codeSending.value = false
  }
}

const handleRegister = async () => {
  if (!isFormValid.value) return

  const result = await authStore.register({
    email: form.value.email,
    password: form.value.password,
    inviteCode: form.value.inviteCode,
    verificationCode: form.value.verificationCode
  })

  if (result.success) {
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } else {
    ElMessage.error(result.error || '注册失败，请重试')
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://earth-blogs.oss-cn-beijing.aliyuncs.com/images/icon/beijing.svg');
  padding: 20px;
}

.auth-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 30px 20px;
    margin: auto;
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.auth-subtitle {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.auth-form {
  .form-group {
    margin-bottom: 24px;
    border: none;
    padding: 0;
    margin: 0 0 24px 0;
  }

  // 移除fieldset的默认样式
  fieldset.form-group {
    border: none;
    padding: 0;
    margin: 0 0 24px 0;
  }

  .form-label {
    display: block;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 8px;
    font-size: 14px;

    .required {
      color: var(--danger-color);
    }
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    &.error {
      border-color: var(--danger-color);
    }

    &::placeholder {
      color: var(--text-color-secondary);
    }
  }

  .password-input-wrapper {
    position: relative;

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 16px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgba(64, 158, 255, 0.1);
      }
    }
  }

  .verification-input-wrapper {
    display: flex;
    gap: 12px;

    .form-input {
      flex: 1;
    }

    .btn-verification {
      padding: 12px 16px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        transform 0.1s ease;
      white-space: nowrap;
      min-width: 100px;

      &:hover:not(:disabled) {
        background: #337ecc;
      }

      &:disabled {
        background: var(--info-color);
        cursor: not-allowed;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .error-message {
    color: var(--danger-color);
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }
}

.form-actions {
  margin-top: 32px;
}

.btn-primary {
  width: 100%;
  padding: 14px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover:not(:disabled) {
    background: #337ecc;
  }

  &:disabled {
    background: var(--info-color);
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.95);
  }
}

.auth-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.auth-text {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: #337ecc;
  }
}
</style>
