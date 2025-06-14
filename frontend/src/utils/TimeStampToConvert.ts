export function formatTOKSTDateTime(time  :string) : string{
    if (!time) return '';

    const utcDate = new Date(time);
    if (isNaN(utcDate.getTime())) {
        console.warn('Invalid date:', time);
        return '';
    }

    // KST 변환 (UTC + 9시간)
    const kstTimestamp = utcDate.getTime() + 9 * 60 * 60 * 1000;
    const kstDate = new Date(kstTimestamp);

    const year = kstDate.getFullYear();
    const month = kstDate.getMonth() + 1;
    const day = kstDate.getDate();
    let hour = kstDate.getHours();
    const minute = kstDate.getMinutes();

    const isAM = hour < 12;
    const ampm = isAM ? '오전' : '오후';

    if (!isAM && hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    const paddedMinute = String(minute).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}:${paddedMinute}`;
} 