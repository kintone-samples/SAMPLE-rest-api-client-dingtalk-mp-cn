const {KintoneRestAPIClientDingTalkMP} = require('@kintone/rest-api-client-dingtalk-mp');
const kintoneConfig = require('./kintoneConfig');

const kintoneClient = new KintoneRestAPIClientDingTalkMP({
  baseUrl: kintoneConfig.baseUrl,
  auth: {
    username: kintoneConfig.username,
    password: kintoneConfig.password,
  },
});

const getMonday = () => {
  const nowTemp = new Date();//当前时间
  const oneDayLong = 24*60*60*1000 ;//一天的毫秒数
  const c_time = nowTemp.getTime() ;//当前时间的毫秒时间
  const c_day = nowTemp.getDay()||7;//当前时间的星期几
  const m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
  const monday = new Date(m_time);//设置周一时间对象
  const m_year = monday.getFullYear();
  let m_month = monday.getMonth()+1;
  let m_date = monday.getDate();

  m_month = m_month < 10 ? "0" + m_month : m_month;
  m_date = m_date < 10 ? "0" + m_date : m_date;

  return m_year+'-'+m_month+'-'+m_date;
}

const getFirstDay = () => {
  const nowTemp = new Date();
  const firstDayTime = nowTemp.setDate(1);
  const firstDay = new Date(firstDayTime);
  const m_year = firstDay.getFullYear();
  let m_month = firstDay.getMonth()+1;
  let m_date = firstDay.getDate();

  m_month = m_month < 10 ? "0" + m_month : m_month;
  m_date = m_date < 10 ? "0" + m_date : m_date;

  return m_year+'-'+m_month+'-'+m_date;
}

const getHour = () => {
  const nowTemp = new Date();
  let hour = nowTemp.getHours();
  let minutes = nowTemp.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hour + ':' + minutes;
}

const formatHour = time => {
  const dateTemp = new Date(time);
  let hour = dateTemp.getHours();
  let minutes = dateTemp.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hour + ':' + minutes;
}

const getDateFrom = () => {
  const nowTemp = new Date();

  const m_year = nowTemp.getFullYear();
  let m_month = nowTemp.getMonth()+1;
  let m_date = nowTemp.getDate();

  m_month = m_month < 10 ? "0" + m_month : m_month;
  m_date = m_date < 10 ? "0" + m_date : m_date;

  return m_year+'-'+m_month+'-'+m_date+' 00:00:00';
}

const getDateTo = () => {
  const nowTemp = new Date();

  const m_year = nowTemp.getFullYear();
  let m_month = nowTemp.getMonth()+1;
  let m_date = nowTemp.getDate()+1;

  m_month = m_month < 10 ? "0" + m_month : m_month;
  m_date = m_date < 10 ? "0" + m_date : m_date;

  return m_year+'-'+m_month+'-'+m_date+' 00:00:00';
}

const formatDate = date => {
  const dateTemp = new Date(date);
  const m_year = dateTemp.getFullYear();
  let m_month = dateTemp.getMonth()+1;
  let m_date = dateTemp.getDate();

  m_month = m_month < 10 ? "0" + m_month : m_month;
  m_date = m_date < 10 ? "0" + m_date : m_date;

  return m_year+'-'+m_month+'-'+m_date;
}

module.exports = {
  kintoneClient: kintoneClient,
  getMonday : getMonday,
  getFirstDay : getFirstDay,
  getHour : getHour,
  formatHour: formatHour,
  getDateFrom: getDateFrom,
  getDateTo : getDateTo,
  formatDate : formatDate,
};