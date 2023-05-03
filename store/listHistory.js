export const state = () => ({
  scrollHeight: 0
})

export const mutations = {
  setScrollHeight(state, { height }) {
    state.scrollHeight = height
  }
}
