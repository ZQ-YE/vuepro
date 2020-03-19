const menulist=[{
    path: '/table',
    remark:"layout",
    name: '主页',
    redirect:'noRedirect',
    hidden:false,
    meta: { title: '列表', icon: 'fa fa-list' },
    children: [
      {
        path: 'userlist',
        name: '列表',
        remark:"list1",
        hidden:false,
        meta: { title: '列表1' }
      },
      {
        path: 'userlist2',
        name: '列表',
        remark:"list2",
        hidden:false,
        meta: { title: '列表2' }
      }
    ]
  },{
    path: '/limit',
    remark:"layout",
    name: '主页',
    redirect:'noRedirect',
    hidden:false,
    meta: { title: '权限', icon: 'fa fa-street-view' },
    children: [
      {
        path: 'tree',
        name: '权限数',
        remark:"tree",
        hidden:false,
        meta: { title: '权限数' }
      }
    ]
  }]

export default menulist