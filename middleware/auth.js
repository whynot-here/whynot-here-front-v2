
export default function ({ params, route, store, redirect }) {
    
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`,
    `/gather/posts/${params.id}`
  ]
  // let token = ''
  // token = window.$cookies.get('token')
  console.log(params)

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