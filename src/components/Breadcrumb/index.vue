<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs"
                          :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
              class="no-redirect">{{ $t('route.' + setFisrstLowcase(item.meta.title)) }}</span>
        <a v-else
           @click.prevent="handleLink(item)">{{ $t('route.' + setFisrstLowcase(item.meta.title)) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'
import { firstLowercase } from '@/utils/index.ts'

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = []

  @Watch('$route')
  private onRouteChange(route: Route) {
    // 如果是有重定向的 直接返回不更新 面包屑
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  private setFisrstLowcase(str: string) {
    return firstLowercase(str)
  }

  // 获取面包屑
  private getBreadcrumb() {
    // 找到那些有meta对象 并且有title的
    let matched = this.$route.matched.filter(
      item => item.meta && item.meta.title
    )
    const first = matched[0]
    // 判断是不是dashboard首页 如果是其它页面 需要在前面加上dashboard首页
    if (!this.isDashboard(first)) {
      matched = [
        {
          path: '/dashboard',
          meta: { title: 'Dashboard' }
        } as RouteRecord
      ].concat(matched)
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  private isDashboard(route: RouteRecord) {
    const name = route && route.meta && route.meta.title
    return name === 'Dashboard'
  }

  private handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect).catch(err => {
        console.log(err)
      })
      return
    }
    this.$router.push(this.pathCompile(path)).catch(err => {
      console.log(err)
    })
  }

  // 路径解析
  private pathCompile(path: string) {
    // 为了解决动态路由 如 detail/:id 这个方式
    const { params } = this.$route
    const toPath = compile(path)
    return toPath(params)
  }

  created() {
    this.getBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>