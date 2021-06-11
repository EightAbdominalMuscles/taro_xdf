import Taro from "@tarojs/taro";
export const getTaroStorageSync = (key) => {
    return Taro.getStorageSync(key)
}
export const setTaroStorageSync = (key, value) => {
    return Taro.setStorageSync(key, value)
}