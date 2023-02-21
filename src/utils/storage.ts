
import Taro from '@tarojs/taro'
const env: string = process.env.NODE_ENV + ''
export default {
  set(key, val) {
    let storage = this.getStorage()
    storage[key] = val
    Taro.setStorageSync(env, storage)
  },
  get(key) {
    return this.getStorage()[key] || {}
  },
  remove(key) {
    let storage = this.getStorage()
    delete storage[key]
    Taro.setStorageSync(env, storage)
  },
  getStorage() {
    return Taro.getStorageSync(env) || {}
  },
  clear() {
    Taro.clearStorageSync();
  }
}
