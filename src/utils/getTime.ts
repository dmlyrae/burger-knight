import moment from 'moment';

export const getTimeFromTimestamp = (timestamp: string | undefined): string => {

	const momentDate = moment(timestamp);
	const now = moment(new Date()); 
	const isToday = momentDate.isSame(now, "day");
	const yesterday = now.clone().subtract(1, 'days').startOf('day');
	const isYesterday = momentDate.isSame(yesterday, 'd');
	const weekAgo = now.clone().subtract(7, 'days').startOf('day');
	const isWeekAgo = momentDate.isAfter(weekAgo);

	const time = momentDate.format('HH:mm');
	const timeAgo = momentDate.fromNow();

	if (isToday) {
		return `сегодня, ${time}`
	} 

	if (isYesterday) {
		return `вчера, ${time}`
	} 

	return `${timeAgo}, ${time}`
		.replace(/^ a/, '')
		.replace(/days/, 'дней')
		.replace(/ago/, 'назад')
		.replace(/month/, 'месяц(ев)')
}