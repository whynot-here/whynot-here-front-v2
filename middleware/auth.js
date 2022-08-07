
export default function ({ params, route, store, redirect }) {
    
  const exceptPath = [
    '/gather',
    `/gather/study`,
    `/gather/${params.category}`
  ]
  // let token = ''
  // token = window.$cookies.get('token')
  console.log('...?')
  console.log(route.query.accessToken)
  console.log(!store.state.userInfo.initLoginDone)

  // console.log(store.state.userInfo.initLoginDone)
  if (!route.query.accessToken && !exceptPath.includes(route.path) && !store.state.userInfo.initLoginDone) {
    // console.log('?????')
    return redirect('/gather/study')
  }

  // if (!exceptPath.includes(route.path) && token && store ) {
  //   // userInfo 저장
  //   // store.commit('userInfo/setToken', { token })
  //   // store.commit('userInfo/setUserInfo', { info:  })
  // }
}