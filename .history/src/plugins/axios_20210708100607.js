"use strict";

import Vue from 'vue';
import axios from 'axios';
import {Notification, Loading} from 'element-ui';

import el from "element-ui/src/locale/lang/el";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: 'http://localhost:8090'
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

const request = (url, method, params, callback) => {
    const loading = Loading.service({
        text: '拼命加载中',
        background: 'rgba(255,255,255,0.7)'
    })
    const config = {
        url: url,
        method: method
    }
    if (method === 'get') {
        config.params = params
    } else {
        const formData = new FormData()
        for (let key in params) {
            formData.append(key, params[key])
        }
        config.data = formData
    }
    _axios.request(config).then(response => {
        console.log(response);
        if (response.data.code === 200) {
            callback(response.data)
        } else {
            Notification.error({
                title: '错误',
                message: response.data.message
            })
        }
    }).catch(error => {
        Notification.error({
            title: '错误',
            message: error
        })
    }).finally(() => {
        loading.close()
    })
}

Vue.prototype.request = request

Vue.prototype.get = (url, params, callback) => {
    request(url, 'get', params, response => {
        callback(response.obj)
    })
}

Vue.prototype.post = (url, params, callback) => {
    request(url, 'post', params, response => {
        Notification.success({
            title: '成功',
            message: response.message
        })
        callback(response.obj)
    })
}

Vue.use(Plugin)

export default Plugin;
