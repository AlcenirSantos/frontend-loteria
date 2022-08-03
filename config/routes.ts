export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    name: 'betsLotomania',
    icon: 'ContainerOutlined',
    component: './betsLotomania/',
  },
  {
    path: '/lotomania',
    name: 'lotomania',
    icon: 'ContainerOutlined',
    component: './lotomania/',
  },
  {
    path: '/betsLotofacil',
    name: 'betsLotofacil',
    icon: 'ContainerOutlined',
    component: './betsLotofacil/',
  },
  {
    path: '/lotofacil',
    name: 'lotofacil',
    icon: 'ContainerOutlined',
    component: './lotofacil/',
  },
  {
    path: '/users',
    name: 'user',
    icon: 'UsergroupAddOutlined',
    component: './user/',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  // {
  //   path: '/',
  //   redirect: '/welcome',
  // },
  // {
  //   component: './404',
  // },
];
