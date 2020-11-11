import React from "react";

export function convertTitleToKey(title) {
  return title.replace(" ", "");
}

export function dateFormatted() {
  return moment().format("YYYMMDD");
}

export function timestampToDate(timeStamp) {
  const newDate = new Date(timeStamp);
  return newDate.toString();
}

export function dateEOD() {
  return new Date().setHours(23, 59, 59, 59);
}

export function dateNextDay() {
  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow.setHours(20, 0, 0, 0);
  return tomorrow.getTime();
}
