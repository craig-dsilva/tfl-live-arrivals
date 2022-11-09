const toMinutes = (seconds: number) =>
  seconds < 60 ? 'Due' : Math.round(seconds / 60) + ' min';

export default toMinutes;
