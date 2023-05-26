<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :model="formState">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="员工姓名"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" v-model="formState.userName" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="打卡类型"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-select placeholder="请选择" v-model="formState.type" >
                <a-select-option value="1">正班</a-select-option>
                <a-select-option value="3">外勤</a-select-option>
                <a-select-option value="4">加班</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="部门"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input style="width: 100%" placeholder="请输入" v-model="formState.dept" />
            </a-form-item>
          </a-col>
        </a-row>
          <a-row v-if="advanced">
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="开始日期"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-date-picker style="width: 100%" placeholder="请输入打卡开始日期" v-model="formState.startTime" :allowClear="false" />
            </a-form-item>
          </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="结束日期"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-date-picker style="width: 100%" placeholder="请输入打卡结束日期" v-model="formState.endTime" :allowClear="false" />
              </a-form-item>
            </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="岗位"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" v-model="formState.title" />
            </a-form-item>
          </a-col>
        </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="doSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="doExport">导出</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
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
import {doExportData, doSearchQuery} from "@/api/getCallInRecord";
const columns = [
  {
    title: '员工姓名',
    dataIndex: 'userName',
    width: 100,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '部门',
    dataIndex: 'dept',
    align: 'center'
  },
  {
    title: '岗位',
    dataIndex: 'title',
    align: 'center'
  },
  {
    title: '工号',
    dataIndex: 'jobNumber',
    align: 'center'
  },
  {
    title: '打卡日期',
    dataIndex: 'clockDate',
    align: 'center'
  },
  {
    title: '上班时间',
    children:[
      {
        title: '上班时间',
        dataIndex: 'clockInTime',
        align: 'center'
      },
      {
        title: '下班时间',
        dataIndex: 'knockOffTime',
        align: 'center'
      },
      {
        title: '工作时长',
        dataIndex: 'workTimeResult',
        align: 'center'
      },
      {
        title:'异常考勤',
        children:[
          {
            'title':'迟到',
            dataIndex: 'lateSituation',
            align: 'center'
          },
          {
            title:'早退',
            dataIndex: 'earlySituation',
            align: 'center'
          }
        ]
      }
    ]
  },
  {
    title: '加班时间',
    children: [
      {
        title: '加班开始时间',
        dataIndex: 'overTime',
        align: 'center'
      },
      {
        title: '加班结束时间',
        dataIndex: 'overTimeEnd',
        align: 'center'
      },
      {
        title: '加班时长',
        dataIndex: 'overTimeResult',
        align: 'center'
      }
    ]
  },
  {
    title: '打卡位置',
    dataIndex: 'location',
    align: 'center',
  },
  {
    title: '打卡备注',
    dataIndex: 'note',
    align: 'center',
  },
  {
    title: '打卡项目',
    dataIndex: 'project',
    align: 'center'
  },
  {
    title: '外勤地点',
    children: [
      {
        title: '上班地点',
        dataIndex: 'fieldLocation',
        align: 'center'
      },
      {
        title: '下班地点',
        dataIndex: 'fieldKnockLocation',
        align: 'center'
      }
    ]
  },
  {
    title: '打卡类型',
    dataIndex: 'callInType',
    align: 'center',
    width: 100,
    fixed: 'right'
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
        userName:'',
        type: '',
        dept: '',
        startTime: '',
        endTime: '',
        title: ''
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
        'dept': this.formState.dept,
        'startTime': (this.formState.startTime) === '' ? null : (this.formState.startTime).format('YYYY-MM-DD'),
        'endTime': (this.formState.endTime) === '' ? null : (this.formState.endTime).format('YYYY-MM-DD'),
        'title': this.formState.title,
        'userName': this.formState.userName,
        'type': this.formState.type
      }
     await doExportData(exportData).then(res => {
        const blob = new Blob([res.data], { type: 'application/xlsx' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = '员工打卡信息.xlsx'
        link.click()
        URL.revokeObjectURL(url)
      })
    },
    getData() {
      const params = {
        'startPage': 1,
        'size': 10
      }
      doSearchQuery(params).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTableChange (page) {
      const params = {
        'dept': this.formState.dept,
        'startTime': (this.formState.startTime) === "" ? null : (this.formState.startTime).format('YYYY-MM-DD'),
        'endTime': (this.formState.endTime) === "" ? null : (this.formState.endTime).format('YYYY-MM-DD'),
        'title': this.formState.title,
        'userName': this.formState.userName,
        'type': this.formState.type,
        'startPage': page,
        'size': 10
      }
      doSearchQuery(params).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    doSearch () {
      const data = {
        'dept': this.formState.dept,
        'startTime': (this.formState.startTime) === '' || null ? null : (this.formState.startTime).format('YYYY-MM-DD'),
        'endTime': (this.formState.endTime) === '' || null ? null : (this.formState.endTime).format('YYYY-MM-DD'),
        'title': this.formState.title,
        'userName': this.formState.userName,
        'type': this.formState.type,
        'startPage': 1,
        'size': 10
      }
      doSearchQuery(data).then(res => {
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
