export const state = () => ({
  sharedData: null
})

export const mutations = {
  updateSharedData(state, newData) {
    state.sharedData = newData
  }
}
