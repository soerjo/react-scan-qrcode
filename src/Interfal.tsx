import React, { useState, useEffect, useRef } from "react";

const Interfal = () => {
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const stopTimer = () => {
    intervalRef.current && window.clearInterval(intervalRef.current);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      HookTimer - {timer} -<button onClick={stopTimer}>StopTimer</button>
    </div>
  );
};

export default Interfal;
