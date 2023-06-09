<template>
  <div>
    <a-modal v-model="visible"
             @ok="showConfirm"
             @cancel="handleCancel"
             title="修改客户信息" >
      <a-form
          id="components-form-demo-normal-login"
          class="add-project"
          :form="form"
      >
        <a-form-item>
        <a-input
            v-decorator="['id',{initialValue:this.formValue.id}]"
            hidden
        >
        </a-input>
        </a-form-item>
        <a-form-item label="客户代码">
          <a-input
              placeholder="客户代码"
              v-decorator="['customerCode',{initialValue:this.formValue.customerCode}]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="客户名称">
          <a-input
              placeholder="客户名称"
              v-decorator="['customerName',{initialValue:this.formValue.customerName}]"
          >
            <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="客户根据情况">
          <a-select  v-decorator="['currentStatus',{initialValue:this.formValue.currentStatus+''}]">
            <a-select-option value="0">进行中</a-select-option>
            <a-select-option value="1">已成交</a-select-option>
            <a-select-option value="2">已关闭</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="客户类型">
            <a-select  v-decorator="['customerType',{initialValue:this.formValue.customerType+''}]">
              <a-select-option value="0">A类客户</a-select-option>
              <a-select-option value="1">B类客户</a-select-option>
              <a-select-option value="2">C类客户</a-select-option>
              <a-select-option value="3">D类客户</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="客户地址">
          <a-input
              placeholder="客户地址"
              v-decorator="['customerAddress',{initialValue:this.formValue.customerAddress}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="客户手机">
          <a-input
              placeholder="客户手机"
              v-decorator="['customerPhone',{initialValue:this.formValue.customerPhone}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="企业类型">
          <a-input
              placeholder="企业类型"
              v-decorator="['industryType',{initialValue:this.formValue.industryType}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="企业规模">
          <a-input
              placeholder="企业规模"
              v-decorator="['industrySize',{initialValue:this.formValue.industrySize}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="企业性质">
          <a-input
              placeholder="企业性质"
              v-decorator="['corporateNature',{initialValue:this.formValue.corporateNature}]"
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
              v-decorator="['revenueScale',{initialValue:this.formValue.revenueScale}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="回款能力">
          <a-input
              placeholder="回款能力"
              v-decorator="['returnRate',{initialValue:this.formValue.returnRate}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="是否上市">
          <a-select  v-decorator="['isMarket',{initialValue:this.formValue.isMarket+''}]">
            <a-select-option value="0">是</a-select-option>
            <a-select-option value="1">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="股票代码">
          <a-input
              placeholder="股票代码"
              v-decorator="['stockCode',{initialValue:this.formValue.stockCode}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="产品类型">
          <a-input
              placeholder="产品类型"
              v-decorator="['productType',{initialValue:this.formValue.productType}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="设备名称">
          <a-input
              placeholder="设备名称"
              v-decorator="['deviceName',{initialValue:this.formValue.deviceName}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-decorator="['feedbackUser',{initialValue:userName}]"
              hidden
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script>
import {showCustomerInfo, updateCustomerInfo} from "@/api/custom";
import {mapState} from "vuex";

export default {
  name: 'AddCustomerDetails',
  data() {
    return {
      customerId:'',
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
      form: this.$form.createForm(this, { name: 'research' }),
      solution:'',
      visible:false,
    };
  },
  computed: {
    ...mapState('setting', ['userName']),
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    // 接收父类传递的信息，用于定义customerId以及调整visible值
    async alterDetails(status,customerId){
      console.log('添加用户信息获取的customerId为'+customerId)
      this.visible = status
      this.customerId=customerId
      // 获取当前客户信息
      let data = {
        "id":customerId
      }
      await showCustomerInfo(data).then(res=>{
          this.formValue = res.data.data
      })
    },
     showConfirm(e){
      let that = this
      that.$confirm({
        title: '确定提交修改吗?',
        content: <div style="color:red;">提交客户信息修改记录</div>,
         onOk() {
          that.handleSubmit(e)
          setTimeout(()=>{
            that.$emit("getData")
          },500)
        },
        onCancel() {
          that.form.resetFields();
          that.visible = false;
        },
        class: 'test',
      });
    },
    handleCancel(){
      this.visible = false
    },
    addResearchDetails(status,customerId){
      this.visible=status
      this.customerId = customerId
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        updateCustomerInfo(values).then(res=>{
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
  },
};
</script>