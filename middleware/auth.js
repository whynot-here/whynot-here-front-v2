export default function ({ params, query, route, store, redirect }) {
  const exceptPath = [
    '/gather',
    `/gather/${params.category}`,
    `/gather/posts/${params.id}`,
    '/aboutus',
    '/posting',
    '/mypage'
  ]

  if (exceptPath.includes(route.path)) {
    return redirect('/')
  }
}
