import dayjs from 'dayjs';

export const getDatetime = (date: string): string => dayjs(date).format('DD/MM/YYYY');
export const getHumanizedDateTime = (date: string): string => dayjs(date).format('MMMM D, YYYY');
