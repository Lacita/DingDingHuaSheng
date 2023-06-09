<template>
  <a-card title="研发情况" layout="vertical" bordered>
  <div>
    <a-table
        :rowKey="record=>record.id"
        bordered
        :columns="development"
        :dataSource="dataSource"
        :scroll="{ x: 'max-content' }"
        :showToast="`共${this.pagination.total}条数据`"
        :pagination="{...pagination, onChange: onPageChange}"
        @selectedRowChange="handleTableChange"
    >
    </a-table>
    <div class="divider" style="height: 16px"/>
    <div class="result" >
      <a-button type="primary" style="float: right" @click="openResearchModal">
        研发打样进展反馈
      </a-button>
      <AddResearchRecord :param="visible" :param2="customerId" @getResearchData="reFreshResearch()" ref="addResearchInfo"/>
    </div>
  </div>
  </a-card>
</template>

<script>
import { researchInfoRecord} from "@/api/custom";
import AddResearchRecord from "@/pages/list/projectDetails/AddResearchRecord";

const development = [
  {
    title: '打样结果',
    dataIndex: 'researchSituation',
    width: 100,
    align: 'center'
  },
  {
    title: '存在问题',
    dataIndex: 'existingProblem',
    width: 100,
    align: 'center'
  },
  {
    title: '解决方案',
    dataIndex: 'solution',
    width: 100,
    align: 'center'
  },
  {
    title: '反馈人员',
    dataIndex: 'feedbackUser',
    width: 100,
    align: 'center'
  },
  {
    title: '反馈时间',
    dataIndex: 'updateTime',
    width: 100,
    align: 'center'
  }
]

export default {
  name: "ReachResult",
  components: {AddResearchRecord},
  data() {
    return {
      visible:false,
      customerId:'',
      development: development,
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        showTotal: total => `共 ${total} 条数据`
      }
    }
  },
  methods: {
    // 打开会话。并传参到子组件
    openResearchModal(){
      let status = true
      let customerId = this.customerId
      this.$refs.addResearchInfo.addResearchDetails(status,customerId);
    },
    // 提供给子类调用的方法
    reFreshResearch(){
      this.researchRecord(this.customerId)
    },
    // 页面变化执行参数
    onPageChange(page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.handleTableChange(page)
      // this.getData()
    },
    // 处理页面变化方法逻辑
    handleTableChange(page) {
      let data = {
        "customerId":this.customerId,
        "page":page,
        "size":5
      }
      // 获取研发进程结果
      researchInfoRecord(data).then(res=>{
        this.dataSource=res.data.data.data
        this.pagination.total=res.data.data.total
      })
    },
    // 获取研发进程结果
    researchRecord(customerId){
      this.customerId = customerId
      let data = {
        "customerId":customerId,
        "page":1,
        "size":5
      }
      researchInfoRecord(data).then(res=>{
        this.dataSource=res.data.data.data
        this.pagination.total=res.data.data.total
      })
    }
  }
}

</script>