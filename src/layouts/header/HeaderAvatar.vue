<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" src="http://12966727.s21i.faiusr.com/4/ABUIABAEGAAgzsjSmwYo156s7AEw9gE4fg.png"/>
      <span class="name">{{userName}}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapState} from 'vuex'
import {logout} from '@/services/user'
import {doGetJwtToken} from "@/api/getCallInRecord";
import store from "@/store";

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapState('setting', ['isMobile','userName']),

  },
  mounted() {
    this.setUserName()
  },
  methods: {
    logout() {
      logout()
      this.$router.push('/login')
    },
    setUserName() {
      if (this.$store.state["setting/userName"] == null) {
        doGetJwtToken().then(res=>{
          if (res.data.code === 2000){
            store.commit("setting/setUserName",res.data.data)
          }
          else {
            this.message.error(res.data.data)
          }
        })
      }
      else {
       return true
      }

    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
