import axios from 'axios';

export default class ThumbsApi {

    constructor() {
        this.baseUrl = import.meta.env.VITE_SERVICES_LOCATION
    }

    getThumbs() {
        return axios.get(`${this.baseUrl}/_/stylekit/get/thumbs`)
        .then( response => response.data )
    }

    getLists() {
        return axios.get(`${this.baseUrl}/_/stylekit/get/lists`)
        .then( response => response.data )
    }

    getFileData() {
        return axios.get(`${this.baseUrl}/_/router/get/filedata`)
        .then( response => response.data )
    }

    setFileData(data) {
        return axios.post(`${this.baseUrl}/_/router/set/filedata`, data)
        .then( response => response.data )
    }

    createNewPackage(data) {
        return axios.post(`${this.baseUrl}/_/package/create`, data)
        .then( response => response.data )
    }

    getComponents() {
        return axios.get(`${this.baseUrl}/_/plan/get/components`)
        .then( response => response.data )
    }

    getComponent(handle) {
        return axios.get(`${this.baseUrl}/_/plan/get/component/${handle}`)
        .then( response => response.data )
    }

    getComponentRoot(handle) {
        return axios.post(`${this.baseUrl}/_/plan/get/component/root`, null)
        .then( response => response.data )
    }

    getComponentCode(data) {
        return axios.post(`${this.baseUrl}/_/plan/get/component/code`, data)
        .then( response => response.data )
    }

    getComponentSass(data) {
        return axios.post(`${this.baseUrl}/_/plan/get/component/sass`, data)
        .then( response => response.data )
    }

}
