import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/cookies'

import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enlocale from './en'
import zhlocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enlocale,
    ...elementEnLocale
  },
  zh: {
    ...zhlocale,
    ...elementZhLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) return cookieLanguage

  // 获取浏览器语言
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    // 如果浏览器语言存在语言包中 就返回该语言 否则 默认中文
    if (language.indexOf(locale) > -1) return locale
  }

  // 默认中文
  return 'zh'
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
})

export default i18n
