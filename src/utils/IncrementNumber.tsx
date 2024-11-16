'use client';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface IncrementNumberProps {
  start: number;
  end: number;
  duration: number;
  style: string;
}

const IncrementNumber: React.FC<IncrementNumberProps> = ({ start, end, duration, style }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animation to trigger multiple times
    threshold: 0.5, // Percentage of the component's visibility before triggering
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false); // Reset animation when out of view
    }
  }, [inView]);

  return (
    <div className={style} ref={ref}>
      {shouldAnimate ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          separator=","
        />
      ) : null}
    </div>
  );
};

export default IncrementNumber;
