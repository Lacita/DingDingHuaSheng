import TabsView from '@/layouts/tabs/TabsView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path:'/loading',
      name:'loading',
      component: () => import('@/pages/login/LoginLoading')
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'list',
          name: '打卡管理',
          meta: {
            icon: 'history'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '项目打卡记录查询',
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'queryWithNoProject',
              name: '非项目打卡记录查询',
              component: () => import('@/pages/list/QueryListWithNoProject'),
            },
            {
              path: 'primary',
              name: '打卡项目管理',
              component: () => import('@/pages/list/QueryProjectList'),
            },
          ]
        },
        {
          path: 'customer',
          name: '商机管理',
          meta: {
            icon: 'solution'
          },
          component: PageView,
          children: [
            {
              path: 'detail',
              name: '项目进程细节',
              component: () => import('@/pages/list/processProject'),
            },
            {
              path: 'customerManager',
              name: '客户管理',
              component: () => import('@/pages/list/customerManager/CustomerIntendant'),
            },
            {
              path: 'report',
              name: '客户信息报表',
              component: () => import('@/pages/list/report/Report'),
            }
          ]
        },
      ]
    }
  ]}

export default options
