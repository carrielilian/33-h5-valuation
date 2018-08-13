/**
 * 日期格式化
 * @author RidingWind
 * create at 2017/12/12
 */
import moment from 'moment';

// change to cn locale
moment.locale('zh-cn');

const HOLIDAYS = ['2017-01-01', '2017-01-02', '2017-01-27', '2017-01-28', '2017-01-29', '2017-01-30', '2017-01-31', '2017-02-01',
  '2017-02-02', '2017-04-02', '2017-04-03', '2017-04-04', '2017-05-01', '2017-05-28', '2017-05-29', '2017-05-30', '2017-10-01',
  '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

function isWorkDay(day) {
  // Sunday as 0 and Saturday as 6.
  if (day.day() === 0 || day.day() === 6) {
    return false;
  }
  const dayStr = day.format('YYYY-MM-DD');

  // return _.findIndex(HOLIDAYS, str => dayStr === str) === -1;
  return `${HOLIDAYS}`.indexOf(dayStr) === -1;
}

function nextWorkDay(day) {
  while (!isWorkDay(day)) {
    day.add(1, 'd');
  }
  day.add(1, 'd');
  while (!isWorkDay(day)) {
    day.add(1, 'd');
  }
  return day;
}

function parse(timeStr, fmt) {
  if (timeStr === null) {
    return null;
  }
  if (fmt === null) {
    return moment(timeStr, 'YYYY-MM-DD HH:mm');
  }
  return moment(timeStr, fmt);
}

export function getMsByDay(dayMS, fmt) {
  const day = moment(dayMS);
  let DATE;
  if (fmt) {
    DATE = day.format(fmt);
  } else {
    DATE = day.format('YYYY-MM-DD  HH:mm');
  }
  return DATE;
}

export function getWorkDayByOffset(dayStr, offset, fmt) {
  let day = parse(dayStr, fmt);
  for (let i = 0; i < offset; i += 1) {
    day = nextWorkDay(day);
  }
  return day.format('YYYY-MM-DD');
}

/**
 * strDay1 - strDay2 相差的天数
 * @param strDay1
 * @param strDay2
 * @param fmt
 * @returns {number}
 */
export function dayDiff(strDay1, strDay2, fmt) {
  const day1 = parse(strDay1, fmt);
  const day2 = parse(strDay2, fmt);
  if (day1 === null || day2 === null) {
    return 0;
  }
  return day1.diff(day2, 'days');
}

export function parseTime(timeStr, fmt) {
  const tm = parse(timeStr, fmt);
  if (tm === null) {
    return null;
  }
  return tm.toDate();
}

export function format(time, fmt) {
  const day = moment(time);
  let DATE;
  if (fmt) {
    DATE = day.format(fmt);
  } else {
    DATE = day.format('YYYY-MM-DD');
  }
  return DATE;
}

export function add(time, addon, type) {
  return moment(time).add(addon, type).toDate();
}
