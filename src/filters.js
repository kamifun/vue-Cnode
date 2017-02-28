export default {
  // Get elapsed time (only maximum unit)
  // 获取已经过去多久(只取最大单位)
  getLastTimeStr(time) {
    let agoDate = new Date(time);
    let nowDate = new Date();
    let array = [{
      time: nowDate.getFullYear() - agoDate.getFullYear(),
      s: '年前'
    }, {
      time: (nowDate.getMonth() + 1) - (agoDate.getMonth() + 1),
      s: '月前'
    }, {
      time: nowDate.getDate() - agoDate.getDate(),
      s: '天前'
    }, {
      time: nowDate.getHours() - agoDate.getHours(),
      s: '小时前'
    }, {
      time: nowDate.getMinutes() - agoDate.getMinutes(),
      s: '分钟前'
    }, {
      time: nowDate.getSeconds() - agoDate.getSeconds(),
      s: '秒前'
    }];
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i]['time'] >= 1) {
        return array[i]['time'] + array[i]['s'];
      }
    }
    return '0秒前';
  },
  // 时间格式转换
  dateFormat(time, format) {
    let getTwo = num => num >= 10 ? num : '0' + num;
    let date = new Date(time);
    let cfg = {
      yyyy: date.getFullYear(),
      yy: date.getFullYear().toString().substring(2),
      M: date.getMonth() + 1,
      MM: getTwo(date.getMonth() + 1),
      d: date.getDate(),
      dd: getTwo(date.getDate()),
      hh: getTwo(date.getHours()),
      h: date.getHours(),
      mm: getTwo(date.getMinutes()),
      m: date.getMinutes(),
      ss: getTwo(date.getSeconds()),
      s: date.getSeconds()
    };
    format = format || 'yyyy-MM-dd hh:mm:ss';
    format = format.replace(/([a-zA-Z])(\1)*/g, m => cfg[m] || new TypeError('没有' + m + '格式'));
    return format;
  }
};
