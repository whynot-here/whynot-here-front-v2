export default function ({ params, query, route, store, redirect }) {
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`,
    `/gather/posts/${params.id}`,
    '/aboutus',
    '/login',
    '/blind-date/intro',
    '/blind-date/selection',
    '/blind-date/fee',
    '/g-blind-date',
    '/g-blind-date/intro',
    '/g-blind-date/terms',
    '/g-blind-date/fee',
    '/g-blind-date/matching',
    '/g-blind-date/proceeding',
  ]

  const isAuthenticatedPath = [
    '/gather/myposting',
    '/gather/bookmark',
    '/posting',
    '/mypage',
    '/blind-date',
    '/blind-date/apply',
    '/blind-date/selection',
    '/blind-date/fee',
    '/blind-date/apply',
    '/blind-date/apply/intro',
    '/blind-date/matching',
    '/blind-date/proceeding',
    '/blind-date/certification'
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
