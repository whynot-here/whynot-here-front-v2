
export default function ({ params, route, store, redirect }) {
    
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`
  ]
  // let token = ''
  // token = window.$cookies.get('token')

  if (!route.query.accessToken && !exceptPath.includes(route.path) && !store.state.userInfo.initLoginDone) {
    return redirect('/gather/study')
  }
}