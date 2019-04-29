import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Login',
      component: resolve => require(['@/page/Login.vue'], resolve),
    }, {
      path: '/',
      component: resolve => require(['@/page/index.vue'], resolve),
    },
    {
      path: '/index',
      component: resolve => require(['@/page/index.vue'], resolve),
      redirect: '/mini_app/manage_banner',
      children: [
        // 设置
        {
          path: '/set_up/add_menu',
          component: resolve => require(['@/page/set_up/add_menu.vue'], resolve)
        },
        {
          path: '/set_up/menu_list',
          component: resolve => require(['@/page/set_up/menu_list.vue'], resolve)
        },
        {
          path: '/set_up/add_role',
          component: resolve => require(['@/page/set_up/add_role.vue'], resolve)
        },
        {
          path: '/set_up/role_list',
          component: resolve => require(['@/page/set_up/role_list.vue'], resolve)
        },
        {
          path: '/set_up/user_list',
          component: resolve => require(['@/page/set_up/user_list.vue'], resolve)
        },
        {
          path: '/set_up/addStaff',
          component: resolve => require(['@/page/set_up/addStaff.vue'], resolve)
        },
        // 小程序   
        {
          path: '/mini_app/Lesson_essay_code',
          component: resolve => require(['@/page/mini_app/Lesson_essay_code.vue'], resolve)
        },
        {
          path: '/mini_app/manage_banner',
          component: resolve => require(['@/page/mini_app/manage_banner.vue'], resolve)
        },
        {
          path: '/mini_app/vip_code',
          component: resolve => require(['@/page/mini_app/vip_code.vue'], resolve)
        },
        {
          path: '/mini_app/qr_code',
          component: resolve => require(['@/page/mini_app/qr_code.vue'], resolve)
        },
        {
          path: '/mini_app/add_banner',
          component: resolve => require(['@/page/mini_app/add_banner.vue'], resolve)
        },
        {
          path: '/mini_app/manage_Magazine',
          component: resolve => require(['@/page/mini_app/manage_Magazine.vue'], resolve)
        },
        {
          path: '/mini_app/add_Magazine',
          component: resolve => require(['@/page/mini_app/add_Magazine.vue'], resolve)
        },
        {
          path: '/mini_app/Magazine_chapters',
          component: resolve => require(['@/page/mini_app/Magazine_chapters.vue'], resolve)
        },
        {
          path: '/mini_app/add_Magazine_chapters',
          component: resolve => require(['@/page/mini_app/add_Magazine_chapters.vue'], resolve)
        },
        {
          path: '/mini_app/manage_smallLesson',
          component: resolve => require(['@/page/mini_app/manage_smallLesson.vue'], resolve)
        },
        {
          path: '/mini_app/add_smallLesson',
          component: resolve => require(['@/page/mini_app/add_smallLesson.vue'], resolve)
        },
        {
          path: '/mini_app/Lesson_essay',
          component: resolve => require(['@/page/mini_app/Lesson_essay.vue'], resolve)
        },
        {
          path: '/mini_app/add_Lesson_essay',
          component: resolve => require(['@/page/mini_app/add_Lesson_essay.vue'], resolve)
        },
        {
          path: '/mini_app/manage_TalkShow',
          component: resolve => require(['@/page/mini_app/manage_TalkShow.vue'], resolve)
        },
        {
          path: '/mini_app/add_TalkShow',
          component: resolve => require(['@/page/mini_app/add_TalkShow.vue'], resolve)
        },
        {
          path: '/mini_app/manage_yearMagazine',
          component: resolve => require(['@/page/mini_app/manage_yearMagazine.vue'], resolve)
        },
        {
          path: '/mini_app/add_yearMagazine',
          component: resolve => require(['@/page/mini_app/add_yearMagazine.vue'], resolve)
        },
        {
          path: '/mini_app/set_year',
          component: resolve => require(['@/page/mini_app/set_year.vue'], resolve)
        },
        {
          path: '/mini_app/manage_helpExplain',
          component: resolve => require(['@/page/mini_app/manage_helpExplain.vue'], resolve)
        },
        {
          path: '/mini_app/add_helpExplain',
          component: resolve => require(['@/page/mini_app/add_helpExplain.vue'], resolve)
        },
        {
          path: '/mini_app/add_helpExplain',
          component: resolve => require(['@/page/mini_app/add_helpExplain.vue'], resolve)
        },
        {
          path: '/mini_app/About_us',
          component: resolve => require(['@/page/mini_app/About_us.vue'], resolve)
        },
        // 用户
        {
          path: '/user/user_list',
          component: resolve => require(['@/page/user/user_list.vue'], resolve)
        },
        {
          path: '/user/user_detail',
          component: resolve => require(['@/page/user/user_detail.vue'], resolve)
        },
        {
          path: '/user/Subscribe',
          component: resolve => require(['@/page/user/Subscribe.vue'], resolve)
        },
        {
          path: '/user/manage_distribution',
          component: resolve => require(['@/page/user/manage_distribution.vue'], resolve)
        },
        {
          path: '/user/distribution_detail',
          component: resolve => require(['@/page/user/distribution_detail.vue'], resolve)
        },
        {
          path: '/user/lift_pic',
          component: resolve => require(['@/page/user/lift_pic.vue'], resolve)
        },
        // 订单
        {
          path: '/order/order_list',
          component: resolve => require(['@/page/order/order_list.vue'], resolve)
        },
        {
          path: '/order/order_detail',
          component: resolve => require(['@/page/order/order_detail.vue'], resolve)
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
