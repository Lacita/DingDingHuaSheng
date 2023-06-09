import {METHOD, request} from "@/utils/request";

const recordApi = {
    // baseUrl: 'http://www.oahuasheng.com:8090',
    baseUrl: 'http://127.0.0.1:8090/customer',
    getCustomer:"/getCustomerLists",
    CustomerInfo:'/showCustomerInfo',
    researchInfoRecord:'/selectResearchInfoRecord',
    customerResult:'/selectCustomerInfoRecord',
    insertCustomerProcess:'/insertCustomerProcess',
    getResearchRecord:'/insertResearchProcess',
    updateCustomerInfo:'/updateCustomerInfo',
    showCustomerVo:'/showCustomerVo',
    insertCustomerInfo:'/insertCustomerInfo',
    showCustomerReportVo:'/showCustomerReportVo',
    exportCustomerRecord:'/exportCustomerRecord'
}

// export function doSearchQuery (data) {
//     return request({
//         url: recordApi.getCallInRecord,
//         method: 'post',
//         data: data
//     })
// }

export function getCustomerLists(){
    return request(recordApi.baseUrl+recordApi.getCustomer,METHOD.GET)
}

export function showCustomerInfo(data){
    return request(recordApi.baseUrl+recordApi.CustomerInfo,METHOD.POST,data)
}

export function researchInfoRecord(data){
    return request(recordApi.baseUrl+recordApi.researchInfoRecord,METHOD.POST,data)
}

export function customerInfoRecord(data){
    return request(recordApi.baseUrl+recordApi.customerResult,METHOD.POST,data)
}

export function insertCustomerProcess(data){
    return request(recordApi.baseUrl+recordApi.insertCustomerProcess,METHOD.POST,data)
}

export function insertResearchRecord(data){
    return request(recordApi.baseUrl+recordApi.getResearchRecord,METHOD.POST,data)
}

export function updateCustomerInfo(data){
    return request(recordApi.baseUrl+recordApi.updateCustomerInfo,METHOD.POST,data)
}

export function showCustomerVo(data){
    return request(recordApi.baseUrl+recordApi.showCustomerVo,METHOD.POST,data)
}

export function insertCustomerInfo(data){
    return request(recordApi.baseUrl+recordApi.insertCustomerInfo,METHOD.POST,data)
}

export function showCustomerReportVo(data){
    return request(recordApi.baseUrl+recordApi.showCustomerReportVo,METHOD.POST,data)
}

export function exportCustomerRecord(data){
    return request(recordApi.baseUrl+recordApi.exportCustomerRecord,METHOD.POST,data,{ responseType: "blob"})
}