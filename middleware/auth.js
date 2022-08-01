
export default function ({ route, store, redirect }) {
    
  const exceptPath = [
    '/project'
  ]
  // let token = ''
  // token = window.$cookies.get('token')
  console.log('...?')
  console.log(route.query.accessToken)
  console.log(!store.state.userInfo.initLoginDone)

  // console.log(store.state.userInfo.initLoginDone)
  if (!route.query.accessToken && !exceptPath.includes(route.path) && !store.state.userInfo.initLoginDone) {
    // console.log('?????')
    return redirect('/project')
  }

  // if (!exceptPath.includes(route.path) && token && store ) {
  //   // userInfo 저장
  //   // store.commit('userInfo/setToken', { token })
  //   // store.commit('userInfo/setUserInfo', { info:  })
  // }
}