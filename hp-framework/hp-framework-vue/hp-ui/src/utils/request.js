import axios from 'axios'
import store from '@/store'
import {getToken} from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import {Message, MessageBox} from "element-ui";
import {tansParams} from "@/utils/ruoyi";

let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

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

    // get请求映射params参数，逐层解析
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
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
        if (!isRelogin.show) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('LogOut').then(() => {
                    location.href = '/login'; // 地址栏刷新去登录页，vuex中的数据会被清空
                })
            }).catch(() => {
                isRelogin.show = false;
            })
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
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
    }
    else {
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

// 通用下载方法
export function download(url, params, filename, config) {
    downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
    return service.post(url, params, {
        transformRequest: [(params) => { return tansParams(params) }],
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'blob',
        ...config
    }).then(async (data) => {
        const isLogin = await blobValidate(data);
        if (isLogin) {
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text();
            const rspObj = JSON.parse(resText);
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
            Message.error(errMsg);
        }
        downloadLoadingInstance.close();
    }).catch((r) => {
        console.error(r)
        Message.error('下载文件出现错误，请联系管理员！')
        downloadLoadingInstance.close();
    })
}

export default service