export default function ({ params, query, route, store, redirect }) {
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`,
    `/gather/posts/${params.id}`,
    '/aboutus',
    '/login',
    '/blind-date/intro'
  ]

  const isAuthenticatedPath = [
    '/gather/myposting',
    '/gather/bookmark',
    '/posting',
    '/mypage',
    '/blind-date/apply'
  ]

  if (
    !route.query.accessToken &&
    isAuthenticatedPath.includes(route.path) &&
    !store.state.userInfo.initLoginDone
  ) {
    return redirect({
      name: 'login'
    })
  }

  if (
    !route.query.accessToken &&
    !exceptPath.includes(route.path) &&
    !store.state.userInfo.initLoginDone
  ) {
    return redirect({
      name: 'gather-category',
      params: {
        category: 'all'
      }
    })
  }
}
