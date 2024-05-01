import moment from 'moment';

// Function to convert UTC time to local time
export function convertUtcToLocal(utcDateString) {
  const utcTime = moment.utc(utcDateString);
  const localTime = utcTime.local().format('YYYY-MM-DD HH:mm:ss');
  return localTime;
}
