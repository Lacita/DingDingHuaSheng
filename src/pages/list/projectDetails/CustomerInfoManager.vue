<template>
  <div>
    <a-modal v-model="visible"
             @ok="showConfirm"
             @cancel="handleCancel"
             width="1"
             title="新增打样记录" >
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
        <a-form-item label="打样情况">
          <a-input
              placeholder="打样情况"
              v-decorator="['researchSituation',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="存在问题">
          <a-input
              placeholder="存在问题"
              v-decorator="['existingProblem',{initialValue:''}]"
          >
            <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="解决方案">
          <a-input
              placeholder="解决方案"
              v-decorator="['solution',{initialValue:''}]"
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
import { insertResearchRecord} from "@/api/custom";
import {mapState} from "vuex";

export default {
  name: 'CustomerInfoManager',
  data() {
    return {
      customerId:'',
      formValue:{
        visitSituation:'',
        priceSituation:'',
        payForSituation:'',
        existingProblem:'',
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
     showConfirm(e){
      let that = this
      that.$confirm({
        title: '确定提交表单吗?',
        content: <div style="color:red;">提交打样记录</div>,
         onOk() {
          that.handleSubmit(e)
          setTimeout(()=>{
            that.$emit("getResearchData")
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
        insertResearchRecord(values).then(res=>{
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