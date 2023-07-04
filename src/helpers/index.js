export const timeToMiliSeconds = (time) => {
  const timeArray = time.split(":");
  const s1 = parseInt(timeArray[0])*60*60;
  const s2 = parseInt(timeArray[1])*60;
  const s3 = parseInt(timeArray[2]);
  const totalSeconds = s1+s2+s3;
  return totalSeconds * 1000;
}

export const miliSecondsToTime = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}