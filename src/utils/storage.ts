
import Taro from '@tarojs/taro'
export default {
  async set(key, val) {
    Taro.setStorage({
      key: key,
      data: val
    })
  },
  async get(key) {
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key: key,
        success: (e) => {
          resolve(e.data)
        },
        fail: (err) => {
          console.log(err)
          resolve(undefined)
        }
      })
    })
  },
  remove(key) {
    return new Promise((resolve) => {
      Taro.removeStorage({
        key: key,
        success: (e) => {
          resolve({ code: 200 })
        },
        fail: (err) => {
          console.log(err)
          resolve({ code: 400 })
        }
      })
    })
  },
  clear() {
    Taro.clearStorage()
  }
}
