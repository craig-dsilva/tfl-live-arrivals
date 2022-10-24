const stationName = (str) => {
  if (str.includes('Station')) {
    const split = str.split(' ');
    split.splice(split.length - 2, 2);
    return split.join(' ');
  }
  return str;
};

export default stationName;
