const kintoneConfig = require('../../common/kintoneConfig');
const utility = require('../../common/utility');

Page({

  data:{
    department:'',
    name:'',
    workingHours:'',
    offHours:'',
    work:'',
    think:'',
    workingHoursTitle:kintoneConfig.field.workingHours.name,
    offHoursTitle:kintoneConfig.field.offHours.name,
    workTitle:kintoneConfig.field.work.name,
    thinkTitle:kintoneConfig.field.think.name,
    imageTitle:kintoneConfig.field.image.name,
    commentTitle:kintoneConfig.field.comment.name,
    src:['','',''],
  },

  onLoad(query) {
    const kintoneRecord = utility.kintoneClient.record;
    kintoneRecord.getRecord({app: kintoneConfig.appId, id: query.id}).then((rsp) => {
      const record = rsp.record;

      this.setData({
        name:record[kintoneConfig.field.name.code].value,
        department:record[kintoneConfig.field.department.code].value,
        workingHours:record[kintoneConfig.field.workingHours.code].value,
        offHours:record[kintoneConfig.field.offHours.code].value,
        work:record[kintoneConfig.field.work.code].value,
        think:record[kintoneConfig.field.think.code].value,
        comment:record[kintoneConfig.field.comment.code].value,
      });

      if (record.hasOwnProperty(kintoneConfig.field.image.code) && record[kintoneConfig.field.image.code].value.length > 0) {       
        const filekeys = record[kintoneConfig.field.image.code].value;
        const urls = [];
        const t = this;
        filekeys.forEach(function (v, index) {
          const fileKey = v.fileKey;
          const kintoneFile = utility.kintoneClient.file;
          kintoneFile.downloadFile({fileKey}).then(rsp => {
            urls[index] = rsp.filePath;
            t.setData({
              src:urls,
            });
          }).catch((err) => {
            console.log(err.get());
          });
        });
      }      
    }).catch((err) => {
      console.log(err.get());
    });
  },
  getimg(){
    this.setData({
        src:this.data.src
    });
  },
});
