import {METHOD, request} from "@/utils/request";

const recordApi = {
    baseUrl: 'http://www.oahuasheng.com:8090',
    // baseUrl: 'http://127.0.0.1:8090',
    getCallInRecord: '/hs/getClockInRecord',
    exportData: '/hs/export',
    doLogin: '/hs/login',
    addProjectUrl: '/hs/addNewProject',
    updateStatus: '/hs/updateProject'
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

export function getProject (projectId,projectName,page,size){
    return request(recordApi.baseUrl+`/hs/showProject&projectId=${projectId}&projectName=${projectName}&page=${page}&size=${size}`,METHOD.GET)
}

export function addProject (data) {
    return request(recordApi.baseUrl+recordApi.addProjectUrl,METHOD.POST,data,{'Content-Type':'application/x-www-form-urlencoded'})
}

export function doOperateUpdate (id) {
    return request(recordApi.baseUrl+recordApi.updateStatus,METHOD.POST,id,{'Content-Type':'application/x-www-form-urlencoded'})
}
