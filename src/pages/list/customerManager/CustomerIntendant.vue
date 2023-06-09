<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" :model="formState">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="客户编号"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input style="width: 100%" placeholder="客户编号" v-model="formState.customerCode" />
            </a-form-item>
          </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="客户名称"
                  :labelCol="{span: 5}"
                  :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input style="width: 100%" placeholder="客户名称" v-model="formState.customerName" />
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
        </a-row>

        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="doSearch">查询</a-button>
        </span>
        <span style="float: left; margin-top: 3px;">
          <a-button type="link"  @click="showModal">客户新增</a-button>
        </span>
      </a-form>
      <a-modal v-model="visible"
               @ok="showConfirm"
               @cancel="handleCancel"
               title="修改客户信息" >
        <a-form
            id="components-form-demo-normal-login"
            class="add-project"
            :form="form"
        >
          <a-form-item label="客户代码">
            <a-input
                placeholder="客户代码"
                v-decorator="['customerCode',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="客户名称">
            <a-input
                placeholder="客户名称"
                v-decorator="['customerName',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="客户根据情况">
            <a-select  v-decorator="['currentStatus',{initialValue:'0'}]">
              <a-select-option value="0">进行中</a-select-option>
              <a-select-option value="1">已成交</a-select-option>
              <a-select-option value="2">已关闭</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="客户类型">
            <a-select  v-decorator="['customerType',{initialValue:'0'}]">
              <a-select-option value="0">A类客户</a-select-option>
              <a-select-option value="1">B类客户</a-select-option>
              <a-select-option value="2">C类客户</a-select-option>
              <a-select-option value="3">D类客户</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="客户地址">
            <a-input
                placeholder="客户地址"
                v-decorator="['customerAddress',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="客户手机">
            <a-input
                placeholder="客户手机"
                v-decorator="['customerPhone',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="企业类型">
            <a-input
                placeholder="企业类型"
                v-decorator="['industryType',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="企业规模">
            <a-input
                placeholder="企业规模"
                v-decorator="['industrySize',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="企业性质">
            <a-input
                placeholder="企业性质"
                v-decorator="['corporateNature',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="公司规模">
            <a-input
                placeholder="公司规模"
                v-decorator="['companySize',{initialValue:this.formValue.companySize}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="营收规模">
            <a-input
                placeholder="营收规模"
                v-decorator="['revenueScale',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="回款能力">
            <a-input
                placeholder="回款能力"
                v-decorator="['returnRate',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="是否上市">
            <a-select  v-decorator="['isMarket',{initialValue:'0'}]">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="股票代码">
            <a-input
                placeholder="股票代码"
                v-decorator="['stockCode',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="产品类型">
            <a-input
                placeholder="产品类型"
                v-decorator="['productType',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item label="设备名称">
            <a-input
                placeholder="设备名称"
                v-decorator="['deviceName',{initialValue:''}]"
            >
              <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
                v-decorator="['operateUser',{initialValue:userName}]"
                hidden
            >
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
      </a-table>
    </div>
  </a-card>
</template>

<script>
import {insertCustomerInfo, showCustomerVo} from "@/api/custom";
import {mapState} from "vuex";
const columns = [
  {
    title: '客户名称',
    dataIndex: 'customerName',
    width: 100,
    align: 'center',
  },
  {
    title: '客户代码',
    dataIndex: 'customerCode',
    width: 100,
    align: 'center'
  },
  {
    title: '客户状态',
    dataIndex: 'currentStatus',
    width: 150,
    align: 'center',
    customRender: (text) => {
      if (text === 0){
        return '进行中';
      }
      else if (text === 1){
        return '已成交';
      }
      else {
        return '已结束';
      }
  }
  },
  {
    title: '对应客服',
    dataIndex: 'operateUser',
    width: 100,
    align: 'center'
  }
]

export default {
  name: 'CustomerIntendant',
  data () {
    return {
      formValue:{
        id:'',
        customerCode:'',
        customerName:'',
        customerType:'',
        currentStatus:'',
        customerAddress:'',
        customerPhone:'',
        industryType:'',
        industrySize:'',
        corporateNature:'',
        companySize:'',
        revenueScale:'',
        returnRate:'',
        isMarket:'',
        stockCode:'',
        productType:'',
        deviceName:'',
      },
      customerCode:'',
      customerName:'',
      showEditVision: false,
      advanced: true,
      confirmLoading: false,
      columns: columns,
      visible: false,
      dataSource: [],
      formState: {
        customerName:'',
        customerCode:'',
        currentStatus:'',
        operateUser:''
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  computed: {
    ...mapState('setting', ['userName']),
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'CustomerIntendant' });
  },
  mounted() {
    this.getData()
  },
  methods: {
    showConfirm(e){
      let that = this
      that.$confirm({
        title: '确定提交修改吗?',
        content: <div style="color:red;">提交客户信息修改记录</div>,
        onOk() {
          that.handleSubmit(e)
          setTimeout(()=>{
            that.getData()
          },500)
        },
    onCancel() {
          that.form.resetFields();
          that.visible = false;
        },
        class: 'test',
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        insertCustomerInfo(values).then(res=>{
          if (res.data.code === 2000){
            this.$message.success("操作成功")
          }
          else{
            this.$message.error(res.data.data)
          }
        }).catch(
        )
      });
      this.form.resetFields();
      this.visible = false;
  },
    // 开启弹框，并传值修改的数据ID
    doOperate(id){
      this.showEditVision = true
      this.tempProjectId = id
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
      let data ={
        "customerCode":this.formState.customerCode,
        "customerName":this.formState.customerName,
        "currentStatus":this.formState.currentStatus,
        "page":page,
        "size":pageSize
      }
      showCustomerVo(data).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    // 初始化获取数据
    getData() {
      let data ={
        "page":1,
        "size":10
      }
      showCustomerVo(data).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    // 页面触发执行方法
    handleTableChange (page) {
      let data ={
        "customerCode":this.formState.customerCode,
        "customerName":this.formState.customerName,
        "currentStatus":this.formState.currentStatus,
        "page":page,
        "size":10
      }
      showCustomerVo(data).then(res => {
        this.dataSource = res.data.data.data
        this.pagination.total = res.data.data.total
      })
    },
    // 查询方法
    doSearch () {
      let data ={
        "customerCode":this.formState.customerCode,
        "customerName":this.formState.customerName,
        "currentStatus":this.formState.currentStatus,
        "page":1,
        "size":10
      }
      showCustomerVo(data).then(res => {
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
