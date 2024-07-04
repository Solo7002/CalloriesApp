import React, { useEffect, useState } from 'react';
import styles from './CircularProgressBar.module.css';

const CircularProgressBar = ({ value, max }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = 100;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arcLength = (240 / 360) * circumference;
  const offset = arcLength - (animatedValue / max) * arcLength;
  const [style, setStyle] = useState('');

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);


  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className={styles.circularProgressBar}
    >
      <circle
        stroke="gray"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset="0"
      />
      <circle
        stroke={offset >= 0 ? "#73A942": "darkred"}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset={offset >= 0 ? offset : 0}
        className={`${styles.progressCircle} ${style}`}
        transform={`rotate(-120 ${radius} ${radius})`}
      />
    </svg>
  );
};

export default CircularProgressBar;
