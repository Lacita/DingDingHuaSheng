<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :model="formState">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="项目编号"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input style="width: 100%" placeholder="项目编号" v-model="formState.projectId" />
            </a-form-item>
          </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="项目名称"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input style="width: 100%" placeholder="项目名称" v-model="formState.projectName" />
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
      <a-table
        :columns="columns"
        :rowKey="record=>record.id"
        :dataSource="dataSource"
        :showToast="`共${this.pagination.total}条数据`"
        :pagination="{...pagination, onChange: onPageChange}"
        @selectedRowChange="handleTableChange"
      >
        <a slot="id" slot-scope="text" @click="doOperate(text)">Operate</a>
      </a-table>
    </div>
    <a-modal
        title="变更"
        :visible="showEditVision"
        @ok="handleOkDoOperate"
        @cancel="handleCancelOperate"
    >
      <p>确定调整打卡项目状态？</p>
    </a-modal>
  </a-card>
</template>

<script>
import {addProject, doOperateUpdate, getProject} from "@/api/getCallInRecord";
const columns = [
  {
    title: '项目编号',
    dataIndex: 'projectId',
    width: 100,
    align: 'center',
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
    align: 'center',
    customRender: (text) => {
      if (text === 0){
        return '禁用';
      }
      else{
        return '正常';
      }
  }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    width: 100,
    align: 'center',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  }
]

export default {
  name: 'QueryList',
  data () {
    return {
      tempProjectId: '',
      showEditVision: false,
      addProjectId: '',
      addProjectName: '',
      advanced: true,
      confirmLoading: false,
      columns: columns,
      visible: false,
      dataSource: [],
      formState: {
        projectId:'',
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
    this.getData()
  },
  methods: {
    // 调整调整打卡项目状态
    handleOkDoOperate(){
      this.confirmEdit(this.tempProjectId)
    },
    // 项目状态调整
    confirmEdit(id){
      let data = new FormData()
      data.append('id',id)
      doOperateUpdate(data).then(res => {
        if (res.data.code === 2000){
          this.$message.success('调整成功')
          this.getData()
        }
        else{
          this.$message.error('调整失败')
        }
      })
      this.showEditVision = false
    },
    // 取消项目状态调整
    handleCancelOperate(){
      this.showEditVision =false
    },
    // 开启弹框，并传值修改的数据ID
    doOperate(id){
      this.showEditVision = true
      this.tempProjectId = id
    },
    // 添加打卡项目
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
         this.addProjectId = '';
         this.addProjectName = '';
        this.visible = false;
        this.confirmLoading = false;
        this.getData()
      }, 500);
    },
    // 取消弹框展示
    handleCancel() {
      this.visible = false;
    },
    // 打开项目新增弹框界面
    showModal() {
      this.visible = true;
    },
    // 页面变化分页展示
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      getProject(this.formState.projectId,this.formState.projectName,page,10).then(res =>{
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    // 初始化获取出局
    getData() {
      getProject(this.formState.projectId,this.formState.projectName,1,10).then( res =>{
            this.dataSource = res.data.data.data
            this.pagination.total = res.data.data.total
      }
      )
    },
    // 页面触发执行方法
    handleTableChange (page) {
      console.log(page.current)
      getProject(this.formState.projectId,this.formState.projectName,page.current,10).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    // 查询方法
    doSearch () {
      getProject(this.formState.projectId,this.formState.projectName,1,10).then(res => {
        console.log(res)
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
