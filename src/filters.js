export default {
  // Get elapsed time (only maximum unit)
  // 获取已经过去多久(只取最大单位)
  getLastTimeStr(time) {
    let agoDate = new Date(time);
    let nowDate = new Date();
    let array = [
      {
        time: nowDate.getFullYear() - agoDate.getFullYear(),
        s: '年前'
      },
      {
        time: (nowDate.getMonth() + 1) - (agoDate.getMonth() + 1),
        s: '月前'
      },
      {
        time: nowDate.getDate() - agoDate.getDate(),
        s: '天前'
      },
      {
        time: nowDate.getHours() - agoDate.getHours(),
        s: '小时前'
      },
      {
        time: nowDate.getMinutes() - agoDate.getMinutes(),
        s: '分钟前'
      },
      {
        time: nowDate.getSeconds() - agoDate.getSeconds(),
        s: '秒前'
      }
    ];
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i]['time'] >= 1) {
        return array[i]['time'] + array[i]['s'];
      }
    }
    return '0秒前';
  }
};
