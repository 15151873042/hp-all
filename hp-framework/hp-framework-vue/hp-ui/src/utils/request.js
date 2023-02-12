import axios from 'axios'
import {getToken} from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import {Message} from "element-ui";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // axios中请求配置有baseURL选项，表示请求URL公共部分
    timeout: 10000, // 超时
    headers: { // 头信息
        'My-Custom-Header': 'hupeng',
    }
})

// request拦截器
service.interceptors.request.use(config => {
    // console.log(config) // config为发送请求的配置信息

    // 是否需求携带token（除非请求中明确不带token，否则都携带）
    const isToken = !(config.headers.isToken === false)
    if (isToken && getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']

    // 二进制数据则直接返回
    if(res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data
    }

    if (code === 401) {

    } else if (code === 500) {
        Message({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(msg))
    } else if (code != 200) {
        Notification.error({
            title: msg
        })
        return Promise.reject('error')
    } else {
      return res.data
    }
}, error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
        message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
        message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default service