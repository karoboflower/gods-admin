/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 将时间转换为时间戳
 * @param date 时间，可以是字符串、Date对象、dayjs对象等
 * @param unit 时间戳单位，'second' 返回秒级时间戳，'millisecond' 返回毫秒级时间戳
 * @returns 时间戳
 */
export function formatToTimestamp(date?: dayjs.ConfigType, unit: 'second' | 'millisecond' = 'second'): number {
  const timestamp = dayjs(date).valueOf(); // 获取毫秒级时间戳
  return unit === 'second' ? Math.floor(timestamp / 1000) : timestamp;
}

export const dateUtil = dayjs;
