<template>
  <a-card>
    <a-descriptions title="客户明细" layout="vertical" bordered>
      <a-descriptions-item label="客户名称">
        {{customerInfo.customerName}}
      </a-descriptions-item>
      <a-descriptions-item label="企业规模">
        {{customerInfo.companySize}}
      </a-descriptions-item>
      <a-descriptions-item label="公司类型">
        {{customerInfo.corporateNature}}
      </a-descriptions-item>
      <a-descriptions-item label="客户地址">
        {{ customerInfo.customerAddress }}
      </a-descriptions-item>
      <a-descriptions-item label="客户类别">
        <a-badge status="success" text="A类" v-if="customerInfo.customerType===0" />
        <a-badge status="processing" text="B类" v-if="customerInfo.customerType===1" />
        <a-badge status="default" text="C类" v-if="customerInfo.customerType===2" />
        <a-badge status="warning" text="D类" v-if="customerInfo.customerType===3" />
      </a-descriptions-item>
      <a-descriptions-item label="客户代码">
        {{customerInfo.customerCode}}
      </a-descriptions-item>
      <a-descriptions-item label="当前阶段" >
        <a-badge status="processing" text="进行中" v-if="customerInfo.currentStatus===0" />
        <a-badge status="success" text="已成交" v-if="customerInfo.currentStatus===1" />
        <a-badge status="error" text="已关闭" v-if="customerInfo.currentStatus===2" />
      </a-descriptions-item>
      <a-descriptions-item label="客户手机">
        {{customerInfo.customerPhone}}
      </a-descriptions-item>
      <a-descriptions-item label="设备名称">
        {{customerInfo.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="企业规模">
        {{customerInfo.industrySize}}
      </a-descriptions-item>
      <a-descriptions-item label="企业类型">
        {{customerInfo.industryType }}
      </a-descriptions-item>
      <a-descriptions-item label="营收规模">
        {{customerInfo.returnRate}}
      </a-descriptions-item>
      <a-descriptions-item label="回款能力">
        {{customerInfo.revenueScale}}
      </a-descriptions-item>
      <a-descriptions-item label="是否上市">
        <a-badge status="processing" text="未上市" v-if="customerInfo.isMarket===0" />
        <a-badge status="success" text="已上市" v-if="customerInfo.isMarket===1" />
      </a-descriptions-item>
      <a-descriptions-item label="股票代码">
        {{customerInfo.stockCode}}
      </a-descriptions-item>
    </a-descriptions>
    <div class="divider" style="height: 16px"></div>
    <div style="float: right">
      <a-button type="primary" @click="openModal" >
        客户信息变更
      </a-button>
      <AddCustomerDetails ::param="visible" :param2="customerId" @getData="reFresh" ref="addCustomerDetails"/>
    </div>
  </a-card>
</template>

<script>
import {showCustomerInfo} from "@/api/custom";
import AddCustomerDetails from "@/pages/list/projectDetails/AddCustomerDetails";

export default {
  name:"CustomerInfo",
  components: {AddCustomerDetails},
  data(){
    return {
      customerId:'',
      visible:false,
      customerInfo:''
    }
  },
  mounted() {
    console.log('用户详细信息表获取内容为'+this.customerId)
  },
  methods:{
    reFresh(){
      this.showInfoDetails(this.customerId)
    },
    openModal(){
      let status = true
      let customerId = this.customerId
      console.log('父亲节点customerId为'+customerId)
      this.$refs.addCustomerDetails.alterDetails(status,customerId);
    },
    showInfoDetails(customerId){
      let data = {
        "id":customerId
      }
      this.customerId=customerId
      showCustomerInfo(data).then(res=>{
        this.customerInfo=res.data.data
      })
    },
  }
}
</script>