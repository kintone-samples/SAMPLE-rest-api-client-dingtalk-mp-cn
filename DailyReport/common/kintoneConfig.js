module.exports = {
  baseUrl: 'https://xxx.cybozu.cn', //kintone的base Url
  username: 'xxx', // kintone的用户名
  password: 'xxx', // 登录密码
  appId: 'xxx', // "日报"应用的ID
  field: {
    name: {name: '员工姓名', code: '员工姓名'},
    department: {name: '部门', code: '部门'},
    workingHours: {name: '上班时间', code: '上班时间'},
    offHours: {name: '下班时间', code: '下班时间'},
    work: {name: '日报：', code: '日报'},
    think: {name: '感想：', code: '感想'},
    image: {name: '上传图片', code: '图片'},
    comment: {name: '领导评语：', code: '领导评语'},
    create_time: {name: '创建时间', code: '创建时间'},
    user_id: {name: '用户id', code: '用户id'},
  },
};
