import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import i18n from '@/lang'
import { firstLowercase } from '@/utils'

// 配置NProgress
NProgress.configure({ showSpinner: false })

// 白名单 不要 登录的 
const whiteList = ['/login']

// 路由拦截
router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()

  // 判断是否登录
  if (UserModule.token) {
    // 如果是登录页 直接去主页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 检查用户是否有角色权限
      if (UserModule.roles.length === 0) {
        try {
          // 获取用户信息(每次刷新页面都要请求)
          await UserModule.GetUserInfo()
          // replace: true 不会保留历史记录
          next({ ...to, replace: true })
        } catch (err) {
          // 清空token 重新去登录
          UserModule.ResetToken()
          Message.error(err || 'Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    // 是不是有白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 去登录
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

const getPageTitle = (key: string) => {
  const hasKey = i18n.t(`route.${firstLowercase(key)}`)
  if (hasKey) {
    return i18n.t(`route.${firstLowercase(key)}`) + ''
  }

  return 'Vue-typescript-demo'
}

router.afterEach((to: Route) => {
  NProgress.done()


  document.title = getPageTitle(to.meta.title)
})
