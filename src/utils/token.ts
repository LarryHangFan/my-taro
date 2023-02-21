import storage from './storage'

async function getToken() {
  const token = await storage.get('token')
  if (token) {
    let expireTime: any = await storage.get('expireTime')
    expireTime -= 100
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
