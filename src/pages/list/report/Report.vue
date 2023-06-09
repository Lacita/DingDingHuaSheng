<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :model="formState">
        <div :class="advanced ? null: 'fold'">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="客户名称"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input placeholder="请输入" v-model="formState.customerName" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="客户状态"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-select placeholder="请选择" v-model="formState.currentStatus" >
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">进行中</a-select-option>
                  <a-select-option value="1">已成交</a-select-option>
                  <a-select-option value="2">已关闭</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="doSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="doExport">导出</a-button>
        </span>
          </a-row>
        </div>
      </a-form>
    </div>
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
  </a-card>
</template>

<script>
import {exportCustomerRecord, showCustomerReportVo} from "@/api/custom";
const columns = [
  {
    title: '客户名称',
    dataIndex: 'customerName',
    width: 150,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '客服反馈情况',
    children:[
      {
        title: '拜访情况',
        dataIndex: 'visitSituation',
        align: 'center'
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
        title: '反馈客服',
        dataIndex: 'feedbackUser',
        align: 'center'
      },
      {
        title: '反馈时间',
        dataIndex: 'customerUpdateTime',
        align: 'center'
      },
    ]
  },
  {
    title: '研发反馈',
    children: [
      {
        title: '打样结果',
        dataIndex: 'researchSituation',
        align: 'center'
      },
      {
        title: '存在问题',
        dataIndex: 'researchExistingProblem',
        align: 'center'
      },
      {
        title: '解决方案',
        dataIndex: 'researchSolution',
        align: 'center'
      },
      {
        title: '研发反馈人员',
        dataIndex: 'researchFeedbackUser',
        align: 'center'
      },
      {
        title: '研发人员反馈时间',
        dataIndex: 'researchUpdateTime',
        align: 'center'
      }
    ]
  },

]

export default {
  name: 'QueryList',
  data () {
    return {
      advanced: true,
      loading: true,
      columns: columns,
      dataSource: [],
      formState: {
        customerName:'',
        customerId: '',
        currentStatus:''
      },
      selectedRows: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  mounted() {
    this.getData()
  },
  methods: {
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      // this.getData()
      this.handleTableChange(page)
    },
    async doExport () {
      const exportData = {
        'currentStatus':this.formState.currentStatus,
        'customerName':this.formState.customerName,
        'customerId':this.formState.customerId,
      }
      await exportCustomerRecord(exportData).then(res => {
        const blob = new Blob([res.data], { type: 'application/xlsx' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = '客户进度跟进表.xlsx'
        link.click()
        URL.revokeObjectURL(url)
      })
    },
    getData() {
      const params = {
        'startPage': 1,
        'size': 10
      }
      showCustomerReportVo(params).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    handleTableChange (page) {
      const params = {
        'currentStatus':this.formState.currentStatus,
        'customerName':this.formState.customerName,
        'customerId':this.formState.customerId,
        'startPage': page,
        'size': 10
      }
      showCustomerReportVo(params).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    doSearch () {
      const data = {
        'currentStatus':this.formState.currentStatus,
        'customerName':this.formState.customerName,
        'customerId':this.formState.customerId,
        'startPage': 1,
        'size': 10
      }
      showCustomerReportVo(data).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
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
