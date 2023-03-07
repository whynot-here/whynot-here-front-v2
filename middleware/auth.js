export default function ({ params, query, route, store, redirect }) {
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`,
    `/gather/posts/${params.id}`,
    '/aboutus'
  ]

  if (
    !route.query.accessToken &&
    !exceptPath.includes(route.path) &&
    !store.state.userInfo.initLoginDone
  ) {
    // return redirect({
    //   name: 'gather-category',
    //   params: {
    //     category: 'all'
    //   }
    // })
  }
}
