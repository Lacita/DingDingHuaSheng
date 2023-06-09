<template>
  <div class="example" style="height: 100%" >
    <div class="divider" style="height: 35%"></div>
    <a-spin :spinning=loadingStatus size="large" tip="登录中"  />
  </div>
</template>

<script>
import {doDingTalkLogin} from "@/api/getCallInRecord";
export default {
  name: "App",
  data() {
    return {
      loadingStatus:true
    };
  },
  mounted() {
    this.getCode()
  },
  methods: {
     async getCode() {
      let tempCode =  this.$route.query.code
      console.log('tempcode',tempCode)
      let myData = new FormData()
      await myData.append('code',tempCode+"")
      await doDingTalkLogin(myData).then(res =>{
        if (res.data.code === 2000){
          localStorage.setItem('token',res.data.data);
          setTimeout(()=>{
            this.$router.push("/list/query")
          },500)
          this.loadingStatus=false
        }
        else {
          this.$router.push("/login")
          setTimeout(()=>{
            this.message.error("请重新扫码")
          },500)
        }
      })
    },
  },
};
</script>

<style scoped>
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0);
  /*border-radius: 4px;*/
  /*margin-bottom: 20px;*/
  /*padding: 30px 50px;*/
  /*margin: 20px 0;*/
}
</style>

