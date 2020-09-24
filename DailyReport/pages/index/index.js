import list from '../list';
const kintoneConfig = require('../../common/kintoneConfig');
const utility = require('../../common/utility');
const dingTalkConfig = require('../../common/dingTalkConfig');

Page({
  ...list,
  data: {
    listData: {
      onItemTap: 'handleListItemTap',
      data: [],
    },
    tags: [
        {
            label: '全部',
            selected: true,
            onChange: 'onTagChangeAll',
        },
        {
            label: '本周日报',
            selected: false,
            onChange: 'onTagChangeWeek',
        },
        {
            label: '本月日报',
            selected: false,
            onChange: 'onTagChangeMonth',
        },
    ]
  },
  onLoad(query) {
    this.getDailyList('all');
  },
  onShow(){
    this.getDailyList('all');
  },
  addDaily(){
    dd.navigateTo({
      url: '../add/add'
    })
  },
  handleListItemTap(e) {
    dd.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    });
  },
  onTagChangeAll(e) {
    this.setData({
      'tags[0].selected' : true,
      'tags[1].selected' : false,
      'tags[2].selected' : false,
    });
    this.getDailyList('all');
  },
  onTagChangeWeek(e) {
    this.setData({
      'tags[0].selected' : false,
      'tags[1].selected' : true,
      'tags[2].selected' : false,
    });
    this.getDailyList('week');
  },
  onTagChangeMonth(e) {
    this.setData({
      'tags[0].selected' : false,
      'tags[1].selected' : false,
      'tags[2].selected' : true,
    });
    this.getDailyList('month');
  },
  getDailyList(type){
    let query = `${kintoneConfig.field.user_id.code}` + '=' + dingTalkConfig.userid +  ' order by ' +`${kintoneConfig.field.create_time.code}` + ' desc';
    if(type == 'week'){
      const monday = utility.getMonday();
      query = `${kintoneConfig.field.user_id.code}` + '=' + dingTalkConfig.userid + ' and ' + `${kintoneConfig.field.create_time.code}` + '>"' + monday  + '" order by ' +`${kintoneConfig.field.create_time.code}` + ' desc';
    }else if(type == 'month'){
      const firstDay = utility.getFirstDay();
      query = `${kintoneConfig.field.user_id.code}` + '=' + dingTalkConfig.userid + ' and ' + `${kintoneConfig.field.create_time.code}` + '>"' + firstDay  + '" order by ' +`${kintoneConfig.field.create_time.code}` + ' desc';
    }
    const params = {
      app: kintoneConfig.appId,
      query: query,
      fields: [
        '$id',
        kintoneConfig.field.work.code,
        kintoneConfig.field.image.code,
        kintoneConfig.field.create_time.code,
      ],
      totalCount: true
    };
    const t = this;
    const kintoneRecord = utility.kintoneClient.record;
    return kintoneRecord.getRecords(params).then((rsp) => {
      const records = rsp.records;
      let result = [];
      for (let i = 0; i < records.length; i++) {
        if (records[i].hasOwnProperty(kintoneConfig.field.image.code) && records[i][kintoneConfig.field.image.code].value.length > 0) {
          const fileKey = records[i][kintoneConfig.field.image.code].value[0].fileKey;
          const kintoneFile = utility.kintoneClient.file;
          kintoneFile.downloadFile({fileKey}).then(rsp => {
            let fPath='listData.data[' + i + '].filePath';
            t.setData({
              [fPath] : rsp.filePath
            });
          }).catch(e => {
            console.log(e.get());
          });
        }

        result.push({     
            title: utility.formatDate(records[i][kintoneConfig.field.create_time.code]['value']) + "\n" + records[i][kintoneConfig.field.work.code]['value'],
            id: records[i]['$id']['value'],
        });
      }

      this.setData({
        'listData.data' : result
      });
    }).catch((err) => {
      console.log(err);
    });  
  }
})