import React from "react";
const DurationPipe = (props: any) => {
  const { start, end } = props;
  let nowUnix = new Date();
  let startUnix = new Date(parseInt(start));
  let endUnix = new Date(parseInt(end));
  //
  var a = new Date(parseInt(start));
  var b = new Date(parseInt(end));
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const start_year = a.getFullYear();
  const end_year = b.getFullYear();
  const start_month = months[a.getMonth()];
  const end_month = months[b.getMonth()];

  const start_date = a.getDate();
  const end_date = b.getDate();

  ///
  let tma: string = `${start_month} ${start_date} - ${end_month}${end_date}, ${end_year}`;

  return <React.Fragment>{tma}</React.Fragment>;
};

export default React.memo(DurationPipe);
