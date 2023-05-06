<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :model="formState">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="项目名称"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input-number style="width: 100%" placeholder="请输入" v-model="formState.projectName" />
            </a-form-item>
          </a-col>
        </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="doSearch">查询</a-button>
        </span>
        <span style="float: left; margin-top: 3px;">
          <a-button type="link"  @click="showModal">项目新增</a-button>
        </span>
      </a-form>
      <a-modal
          title="添加打卡项目"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
      >
        <a-form
            id="components-form-demo-normal-login"
            class="add-project"
        >
          <a-form-item>
            <a-input
                placeholder="请输入项目编号"
                v-model="addProjectId"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
                placeholder="请输入项目名称"
                v-model="addProjectName"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :showToast="`共${this.pagination.total}条数据`"
        :pagination="{...pagination, onChange: onPageChange}"
        @selectedRowChange="handleTableChange"
      >
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {addProject, doSearchQuery, getProject} from "@/api/getCallInRecord";
const columns = [
  {
    title: '项目编号',
    dataIndex: 'projectId',
    width: 100,
    align: 'center'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 100,
    align: 'center'
  },
  {
    title: '项目状态',
    dataIndex: 'projectStatus',
    width: 150,
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    align: 'center'
  }
]

export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      addProjectId: '',
      addProjectName: '',
      advanced: true,
      confirmLoading: false,
      loading:true,
      columns: columns,
      visible: false,
      dataSource: [],
      formState: {
        projectName:''
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  mounted() {
    this.loading = false
    this.getData()
  },
  methods: {
     handleOk() {
      let formData = new FormData()
      formData.append('projectId',this.addProjectId)
      formData.append('projectName',this.addProjectName)
       addProject(formData).then(res => {
        if (res.data.code === 2000){
          this.$message.success('添加成功')
        }
        else {
          this.$message.error('添加失败')
        }
      })
       setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.getData()
      }, 1000);
    },
    handleCancel() {
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.getData()
    },
    getData() {
      getProject(this.formState.projectName,1,10).then( res =>{
            this.dataSource = res.data.data.data
            this.pagination.total = res.data.data.total
            this.loading = false
      }
      )
    },
    handleTableChange (page) {
      const params = {
        'startPage': page.current,
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
        'startTime': (this.formState.startTime) === "" ? (new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay()) : (this.formState.startTime).format('YYYY-MM-DD'),
        'endTime': (this.formState.endTime) === "" ? (new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay()) : (this.formState.endTime).format('YYYY-MM-DD'),
        'title': this.formState.title,
        'userName': this.formState.userName,
        'type': this.formState.type,
        'startPage': 0,
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
