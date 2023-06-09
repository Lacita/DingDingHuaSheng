<template>
  <div>
    <a-modal v-model="visible"
             @ok="showConfirm"
             @cancel="handleCancel"
             width="1"
             title="新增客户拜访记录" >
      <a-form
          id="components-form-demo-normal-login"
          class="add-project"
          :form="form"
      >
        <a-form-item>
        <a-input
            v-decorator="['customerId',{initialValue:this.customerId}]"
            hidden
        >
        </a-input>
        </a-form-item>
        <a-form-item label="拜访情况">
          <a-input
              placeholder="拜访情况"
              v-decorator="['visitSituation',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="价格洽谈结果">
          <a-input
              placeholder="价格洽谈结果"
              v-decorator="['priceSituation',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="付款条件情况">
          <a-input
              placeholder="付款条件情况"
              v-decorator="['payForSituation',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="money-collect" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="存在问题">
          <a-input
              placeholder="存在问题"
              v-decorator="['existingProblem',{initialValue:''}]"
          >
          >
            <a-icon slot="prefix" type="question-circle" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="解决方案">
          <a-input
              placeholder="解决方案"
              v-decorator="['solution',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="bulb" style="color: rgba(0,0,0,.25)" />
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
import {insertCustomerProcess} from "@/api/custom";
import {mapState} from "vuex";

export default {
  name: 'AddCustomerRecord',
  data() {
    return {
      customerId:'',
      formValue:{
        visitSituation:'',
        priceSituation:'',
        payForSituation:'',
        existingProblem:'',
      },
      form: this.$form.createForm(this, { name: 'coordinated' }),
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
     showConfirm(e){
      let that = this
      that.$confirm({
        title: '确定提交表单吗?',
        content: <div style="color:red;">提交客户跟进记录</div>,
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
    addDetails(status,customerId){
      this.visible=status
      this.customerId = customerId
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        insertCustomerProcess(values).then(res=>{
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