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

export function dateEOD(timeStamp) {
  return new Date().setHours(23, 59, 59, 59);
}

export function dateNextDay(timeStamp) {
  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  tomorrow.setHours(20, 0, 0, 0);
  console.log("utils/helpers dateNextDay:", tomorrow);
  return tomorrow;
}
