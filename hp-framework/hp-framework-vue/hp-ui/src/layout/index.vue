<template>

  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from "vuex";
import { Sidebar } from './components'
import store from "@/store";
export default {
  name: "Layout",

  components: {
    Sidebar
  },


  methods: {
    handlerClick() {
      this.$store.dispatch('LogOut').then(() => {
        // location.href = '/login';
      })
    }
  },

  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sidebar: state => state.app.sidebar
    }),


    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
