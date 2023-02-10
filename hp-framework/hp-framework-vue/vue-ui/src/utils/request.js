import axios from "axios";
import {Message} from 'element-ui'


// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // axios中请求配置有baseURL选项，表示请求URL公共部分
    timeout: 10000, // 超时
    headers: { // 头信息
        'My-Custom-Header': 'hupeng',
        // 'Content-Type': 'application/json;charset=utf-8'
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'multipart/form-data'
    }
})


// 响应拦截器
service.interceptors.response.use(res => { // 成功时的回调
        console.log('成功', res)
        const code = res.data.code
        if (code != '000000') {
            Message.error(res.data.msg)

            return Promise.reject(res.data.msg) // 如果此处reject，业务调用出是拿不动调用res结果的
        }
        return res.data
    }, res => { // 失败时的回调
        // console.log('失败', res)
        return Promise.reject('error');
    }
    )

export default service