export const state = () => ({
  initLoginDone: false,
  token: '',
  detail: { }
})

export const mutations = {
  setInitLoginDone (state, { loginDone }) {
    state.initLoginDone = loginDone
  },
  setToken (state, { token }) {
    state.token = token
  },
  setDetail (state, { info }) {
    Object.keys(state.detail).forEach((key) => {
      delete state.detail[key]
    })
    const detail = {
      authType: '',
      email: '',
      id: '',
      nickname: '',
      profileImg: '',
    }
    if (info !== null) {
      Object.keys(info).forEach((key) => {
        if (info[key]) {
          detail[key] = info[key]
        }
      })
    }

    Object.assign(state.detail, detail)
  }
}