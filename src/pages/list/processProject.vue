<template>
  <a-card>
    <a-card title="用户信息查询" layout="vertical" bordered>
    <a-form layout="horizontal" :model="formState">
      <a-col :md="8" :sm="24" >
        <a-form-item
            label="项目名称"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 1}"
        >
          <a-select placeholder="请选择" v-model="formState.id"  >
            <a-select-option v-for="i in customerData" :key="i.id" :value="i.id" >{{i.customerName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="doSearch">查询</a-button>
      </span>
    </a-form>
    </a-card>
    <div style="margin: 1%"></div>
    <CustomerInfo :param="customerId" ref="customerInfo"/>
    <div style="margin: 5%"></div>
    <CustomerRecord  :param="customerId" ref="child"/>
    <div style="margin: 5%"></div>
    <ReachResult :param="customerId" ref="researchChild"/>
  </a-card>
</template>

<script>
import CustomerInfo from  "@/pages/list/projectDetails/CustomerInfo";
import CustomerRecord from "@/pages/list/projectDetails/CustomerRecord";
import ReachResult from "@/pages/list/projectDetails/ReachResult";
import {getCustomerLists} from "@/api/custom";

export default {
  name: 'processProject',
  components: {ReachResult, CustomerRecord,CustomerInfo},
  data () {
    return {
      customerInfo:'',
      customerData:'',
      customerId:'',
      advanced: true,
      loading: true,
      dataSource: [],
      formState: {
        id:''
      },
      selectedRows: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  mounted() {
    this.getData()
    getCustomerLists().then(res=>{
      this.customerData=res.data.data
    })
  },
  methods: {
    getData(){
      console.log()
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      // this.getData()
      this.handleTableChange(page)
    },
    doSearch() {
      // console.log(this.formState.id)
      // this.customerId = this.formState.id
      this.$refs.customerInfo.showInfoDetails(this.formState.id);
      this.$refs.child.getCustomerRecord(this.formState.id);
      this.$refs.researchChild.researchRecord(this.formState.id);
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
