<template>
  <a-card title="用户信息查询" layout="vertical" bordered>
      <a-select mode="tags" style="width: 100%" placeholder="请选择客户" size="large" @change="handleChange">
        <a-select-option v-for="i in customerData" :key="i.id">
          {{i.customerName}}
        </a-select-option>
      </a-select>
  </a-card>

</template>
<script>
import {getCustomerLists} from '@/api/custom'
export default {
  name:"CustomerSearch",
  data() {
    return {
      customerData:''
    }
  },
  created() {
    getCustomerLists().then(res =>{
        this.customerData = res.data.data
    })
  },
  methods: {
    async handleChange(value) {
      this.$emit('customId',value[0])
    },
  },
};
</script>