export default {
  updateCurrentProtal(state, currentProtal) {
    state.currentProtal = currentProtal
    localStorage.setItem('currentPortal', JSON.stringify({...currentProtal}))
  }
}
