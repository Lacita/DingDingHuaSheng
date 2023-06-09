<template>
  <a-card title="客服反馈" layout="vertical" bordered>
  <div>
    <a-table
        :rowKey="record=>record.id"
        bordered
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{ x: 'max-content' }"
        :showToast="`共${this.pagination.total}条数据`"
        :pagination="{...pagination, onChange: onPageChange}"
        @selectedRowChange="handleTableChange"
    >
    </a-table>
  </div>
    <div class="divider" style="height: 16px"/>
    <div>
      <a-button type="primary" style="float: right" @click="openModal">
        客服项目进展反馈
      </a-button>
      <AddCustomerRecord :param="visible" :param2="customerId" @getData="reFresh()" ref="addCustomerInfo"/>
    </div>
  </a-card>
</template>

<script>
import {customerInfoRecord} from "@/api/custom";
import AddCustomerRecord from "@/pages/list/projectDetails/AddCustomerRecord";

const columns = [
  {
    title: '拜访情况',
    dataIndex: 'visitSituation',
    width: 100,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '价格洽谈结果',
    dataIndex: 'priceSituation',
    align: 'center'
  },
  {
    title: '付款条件情况',
    dataIndex: 'payForSituation',
    align: 'center'
  },
  {
    title: '存在问题',
    dataIndex: 'existingProblem',
    align: 'center'
  },
  {
    title: '解决方案',
    dataIndex: 'solution',
    align: 'center'
  },
  {
    title: '反馈人员',
    dataIndex: 'feedbackUser',
    align: 'center'
  },
  {
    title: '反馈时间',
    dataIndex: 'updateTime',
    align: 'center'
  }
]
export default {
  name:"CustomerRecord",
  components: {AddCustomerRecord},
  data() {
    return {
      visible:false,
      customerId:'',
      columns: columns,
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  methods: {
    reFresh(){
      this.getCustomerRecord(this.customerId)
    },
    handleOk(){
      console.log('用户点击确认')
    },
    openModal(){
      let status = true
      let customerId = this.customerId
      this.$refs.addCustomerInfo.addDetails(status,customerId);
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.handleTableChange(page)
      // this.getData()
    },
    handleTableChange(page) {
      let data ={
        "customerId":this.customerId,
        "page":page,
        "size":5
      }
      customerInfoRecord(data).then(res=>{
        this.dataSource=res.data.data.data
        this.pagination.total=res.data.data.total
      })
    },
    getCustomerRecord(customerId){
      this.customerId = customerId
      let data ={
        "customerId":customerId,
        "page":1,
        "size":5
      }
      customerInfoRecord(data).then(res=>{
        this.dataSource=res.data.data.data
        this.pagination.total=res.data.data.total
      })
    }
  }
}

</script>