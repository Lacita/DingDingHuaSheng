<template>
  <div id="app">
    <div id="login_container"></div>
  </div>
</template>
<script>
export default {
  name: "DingTalkLogin",
  data() {
    return {
      appid: "dingruerscmkzl824rdo",
      redirectUrl: "http://127.0.0.1:8091/#/list/query",
      apiUrl:"http://127.0.0.1:8080/#/loading",
      dingCodeConfig: {
        id: "login_container",
        style: "border:none;background-color:#FFFFFF;",
        width: "350",
        height: "420",
      },
    };
  },
  computed: {
    getRedirectUrl() {
      return encodeURIComponent(this.apiUrl);
    },
    getAuthUrl() {
      return `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${this.appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${this.getRedirectUrl}`;
    },
    getGoto() {
      return encodeURIComponent(this.getAuthUrl);
    },
    getDingCodeConfig() {
      return { ...this.dingCodeConfig, goto: this.getGoto };
    },
  },
  created() {
    //调用
    this.initDingJs();
  },
  mounted() {
    this.addDingListener();
    this.initDingLogin();
  },
  methods: {
    initDingJs() {
      !(function (window, document) {
        function d(a) {
          let e,
              c = document.createElement("iframe"),
              d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto;
          (d += a.style ? "&style=" + encodeURIComponent(a.style) : ""),
              (d += a.href ? "&href=" + a.href : ""),
              (c.src = d),
              (c.frameBorder = "0"),
              (c.allowTransparency = "true"),
              (c.scrolling = "no"),
              (c.width = a.width ? a.width + "px" : "365px"),
              (c.height = a.height ? a.height + "px" : "400px"),
              (e = document.getElementById(a.id)),
              (e.innerHTML = ""),
              e.appendChild(c);
        }
        window.DDLogin = d;
      })(window, document);
    },
    addDingListener() {
      let self = this;
      let handleLoginTmpCode = function (loginTmpCode) {
        window.location.href = self.getAuthUrl + `&loginTmpCode=${loginTmpCode}`;
        // console.log("success"+self.getAuthUrl + `&loginTmpCode=${loginTmpCode}`)
      };
      let handleMessage = function (event) {
        if (event.origin === "https://login.dingtalk.com") {
          handleLoginTmpCode(event.data);
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
    initDingLogin() {
      window.DDLogin(this.getDingCodeConfig);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
