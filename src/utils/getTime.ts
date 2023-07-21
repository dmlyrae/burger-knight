import moment from 'moment';

export const getTimeFromTimestamp = (orderTimeISO: string | undefined): string => {
  const orderDay = moment(orderTimeISO).format('DD');
  const orderTime = moment(orderTimeISO).format('HH:mm');
  const todayDay = moment().format('DD');

  const yesterdayMessageFromOrder = moment(orderTimeISO).fromNow();

  if (orderDay === todayDay) {
      return `today, ${orderTime}`;
  } else if (yesterdayMessageFromOrder === 'days ago') {
      return `yesterday, ${orderTime}`;
  } else {
      return `${yesterdayMessageFromOrder}, ${orderTime}`;
  }
}