import storage from './storage'

function getToken() {
  const token = storage.get('token')
  if (token) {
    const expireTime = storage.get('expireTime') - 100
    const nowTime = Math.floor(new Date().getTime() / 1000)
    if (nowTime > expireTime) {
      removeToken()
      return
    } else {
      return token
    }
  } else {
    return
  }
}

function removeToken() {
  storage.remove('token')
  storage.remove('expireTime')
}

function setToken(token, expireTime) {
  storage.set('token', token)
  storage.set('expireTime', Number(expireTime))
}

export {
  getToken,
  setToken,
  removeToken
}
