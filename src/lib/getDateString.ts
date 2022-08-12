const getPadString = (target: string | number): string => {
  return String(target).padStart(2, '0');
};

const getDateString = (date: string | undefined): string => {
  if (!date) {
    return '날짜 정보가 존재하지 않습니다.';
  }

  const dateObject = new Date(date);

  return `${dateObject.getFullYear() % 100}.${getPadString(
    dateObject.getMonth() + 1
  )}.${getPadString(dateObject.getDate())} ${getPadString(dateObject.getHours())}:${getPadString(
    dateObject.getMinutes()
  )}:${getPadString(dateObject.getSeconds())}`;
};

export default getDateString;
