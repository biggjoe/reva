import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  function getTimeRemaining(targetDate) {
    const now = new Date();
    const totalSeconds = Math.max(
      0,
      Math.floor((targetDate.getTime() - now.getTime()) / 1000)
    );
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (endTime) {
      const targetDate = new Date(endTime.toString() * 1000);
      setTimeRemaining(getTimeRemaining(targetDate));

      const interval = setInterval(() => {
        setTimeRemaining(getTimeRemaining(targetDate));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endTime]);

  if (!timeRemaining) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/*   <div className="time-container">
     <div className="timebox">{timeRemaining.days} D</div>
      <div className="timebox">{timeRemaining.hours} H</div>
      <div className="timebox">{timeRemaining.minutes} M</div>
      <div className="timebox">{timeRemaining.seconds} S</div> 
    </div>*/}

      <div className="tm-box contents-right">
        <span className="tm-span">
          {timeRemaining.days}
          <span className="tmxs">D</span>
        </span>
        <span className="tm-span">
          {timeRemaining.hours}
          <span className="tmxs">H</span>
        </span>
        <span className="tm-span">
          {timeRemaining.minutes}
          <span className="tmxs">M</span>
        </span>
        <span className="tm-span">
          {timeRemaining.seconds}
          <span className="tmxs">S</span>
        </span>
      </div>
    </>
  );
};

export default CountdownTimer;
