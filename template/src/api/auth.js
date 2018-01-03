import fetch from '@/lib/fetch'

/**
 * [getTokenByPassword]
 *
 * @method getTokenByPassword
 *
 * @param  {[String]} username
 * @param  {[String]} password
 *
 * @return {[Object]}
 */
export async function getTokenByPassword ({ username, password }) {
  try {
    const response = await fetch.post(`/auth/login`, { username, password })
    return response.data
  } catch (err) {
    console.log('message', err)
    if (err.response) {
      throw Error(err.response.data.message)
    }

    throw err
  }
}
