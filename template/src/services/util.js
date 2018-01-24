import Vue from 'vue'

async function readPaginatedData (url) {
  let next = url
  let results = []
  while (next) {
    try {
      let response = await Vue.axios.get(next)
      next = response.data.next
      response.data.results.forEach(result => {
        results.push(result)
      })
    } catch (e) {
      next = null
    }
  }
  return results
}

async function readData (url) {
  let response = await Vue.axios.get(url)
  return response.data
}

export default {
  readPaginatedData,
  readData
}
