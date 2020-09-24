const kintoneConfig = require('../../common/kintoneConfig');
const dingTalkConfig = require('../../common/dingTalkConfig');
const utility = require('../../common/utility');

Page({
  data:{
    department:'',
    name:'',
    workingHours: utility.getHour(),
    offHours: utility.getHour(),
    think:'',
    workingHoursTitle:kintoneConfig.field.workingHours.name,
    offHoursTitle:kintoneConfig.field.offHours.name,
    workTitle:kintoneConfig.field.work.name,
    thinkTitle:kintoneConfig.field.think.name,
    imageTitle:kintoneConfig.field.image.name,
    src:[],
    fileKeys:[],
    work:'今日工作：\n' +
         '\n' +
         '明日预定：\n',
  },

  onLoad(query) {
    this.getToken();
  },
  getToken(){
    let t = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/html",
      },
      url: 'https://oapi.dingtalk.com/gettoken',
      method: 'GET', 
      data: {
        appkey: dingTalkConfig.appkey,
        appsecret: dingTalkConfig.appsecret,
      },
      dataType: 'json',
      success: function(res) {
        if(res.status === 200){
          t.getUser(res.data['access_token']);
          t.getWorkingHour(res.data['access_token']);
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  getUser(token){
    let t = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/html",
      },
      url: 'https://oapi.dingtalk.com/user/get',
      method: 'GET',
      data: {
        access_token: token,
        userid: dingTalkConfig.userid,
      },
      dataType: 'json',
      success: function(res) {
        if(res.status === 200){
          t.setData({
            name: res.data['name']
          });
          t.getDepart(token,res.data['department']);
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  getDepart(token,departmentId){
    let t = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/html",
      },
      url: 'https://oapi.dingtalk.com/department/get',
      method: 'GET',
      data: {
        access_token: token,
        id: departmentId,
      },
      dataType: 'json',
      success: function(res) {
        if(res.status === 200){
          t.setData({
            department: res.data['name']
          });
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  getWorkingHour(token){
    let t = this;
    dd.httpRequest({
      headers: {
        "Content-Type": "application/json",
      },
      url: 'https://oapi.dingtalk.com/attendance/listRecord?access_token=' + token,
      method: 'POST',
      data: JSON.stringify({
        userIds: [dingTalkConfig.userid],
        checkDateFrom: utility.getDateFrom(),
        checkDateTo: utility.getDateTo(),
        offset: 0,
        limit: 10
      }),
      dataType: 'json',
      success: function(res) {
        if(res.status === 200){
          let records = res.data['recordresult'];
          records.forEach(function (v, index) { 
            if(v.hasOwnProperty('checkType') && v['checkType'] == "OnDuty"){
              t.setData({
                workingHours: utility.formatHour(v['userCheckTime'])
              });
            }else if(v.hasOwnProperty('checkType') && v['checkType'] == "OffDuty"){
              t.setData({
                offHours: utility.formatHour(v['userCheckTime'])
              });
            }
          });
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  addRecord(){
    const kintoneRecord = utility.kintoneClient.record;

    let record = {};
    record[kintoneConfig.field.user_id.code] = {value: dingTalkConfig.userid};
    record[kintoneConfig.field.department.code] = {value: this.data.department};
    record[kintoneConfig.field.name.code] = {value: this.data.name};
    record[kintoneConfig.field.workingHours.code] = {value: this.data.workingHours};
    record[kintoneConfig.field.offHours.code] = {value: this.data.offHours};
    record[kintoneConfig.field.work.code] = {value: this.data.work};
    record[kintoneConfig.field.think.code] = {value: this.data.think};
    if (this.data.fileKeys.length > 0) {
      let imgKeys=[];
      this.data.fileKeys.forEach(function (v, i) {
        imgKeys[i] = {fileKey:v};
      });
      record[kintoneConfig.field.image.code] = {value: imgKeys};
    }

    kintoneRecord.addRecord({app: kintoneConfig.appId, record: record}).then(rsp => {
      dd.redirectTo({
        url: '../detail/detail?id=' + rsp.id
      })
    }).catch(e => {
      console.log(e.get());
    });
  },
  bindStartPickerChange(e) {
    this.setData({
      workingHours: e.detail.value,
    });
  },
  bindEndPickerChange(e) {
    this.setData({
      offHours: e.detail.value,
    });
  },
  bindWorkTextAreaBlur(e) {
    this.setData({
      work: e.detail.value,
    });
  },
  bindThinkTextAreaBlur(e) {
    this.setData({
      think: e.detail.value,
    });
  },
  chooseImage() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 3,
      success: (res) => {
        if (res && res.filePaths) {
          const urls = [];
          const files = [];
          res.filePaths.forEach(function (url, index) {
            urls[index] = url;

            const kintoneFile = utility.kintoneClient.file;
            kintoneFile.uploadFile({filePath: url}).then((rsp) => {
              files[index] = rsp.fileKey;
            }).catch((err) => {
              console.log(err);
            });
          });

          this.setData({
            fileKeys:files,
            src:urls,
          }); 
        }
      }
    })
  }
});
