const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,

  sidebar: state => state.app.sidebar,

  sidebarRouters:state => state.permission.sidebarRouters,
}
export default getters
