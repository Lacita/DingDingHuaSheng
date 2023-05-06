import {METHOD, request} from "@/utils/request";

const recordApi = {
    baseUrl: 'http://127.0.0.1:8090',
    getCallInRecord: '/hs/getClockInRecord',
    exportData: '/hs/export',
    doLogin: '/hs/login',
    addProjectUrl: '/hs/addNewProject'
}

// export function doSearchQuery (data) {
//     return request({
//         url: recordApi.getCallInRecord,
//         method: 'post',
//         data: data
//     })
// }
export function doLogin (userName,password) {
    return request(recordApi.baseUrl+recordApi.doLogin,METHOD.POST,{
        "userName":userName,
        "password":password
    })
}

export function doSearchQuery (data) {
    return request(recordApi.baseUrl+recordApi.getCallInRecord,METHOD.POST,data)
}

export function doExportData (data) {
    return request(recordApi.baseUrl+recordApi.exportData,METHOD.POST,data,{ responseType: "blob"})
}

export function getProject (projectName,page,size){
    return request(recordApi.baseUrl+`/hs/showProject&projectName=${projectName}&page=${page}&size=${size}`,METHOD.GET)
}

export function addProject (data) {
    return request(recordApi.baseUrl+recordApi.addProjectUrl,METHOD.POST,data,{'Content-Type':'application/x-www-form-urlencoded'})
}
