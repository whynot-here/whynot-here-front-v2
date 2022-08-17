
export default function ({ params, route, store, redirect }) {
    
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`
  ]
  // let token = ''
  // token = window.$cookies.get('token')

  if (!route.query.accessToken && !exceptPath.includes(route.path) && !store.state.userInfo.initLoginDone) {
    console.log('hi')
    return redirect({
      name: 'gather-category',
      params: {
        category: 'study'
      }
    })
    // return redirect('/gather/study')
  }
}