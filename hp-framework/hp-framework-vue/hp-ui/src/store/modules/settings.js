import defaultSettings from '@/settings'

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || '' // 浏览器本地缓存中的设置

const state = {
  // 主题颜色
  theme: storageSetting.theme || '#409EFF',
  // 侧边栏主题类型（深色/浅色）
  sideTheme: storageSetting.sideTheme || sideTheme,
  // 侧边栏是否显示logo
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  // 顶栏容器是否固定
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  // 顶栏是否显示标签视图
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

