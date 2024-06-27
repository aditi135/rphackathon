import React, { useState } from 'react';
import styles from './BeachTab.module.css';

const BeachTab = ({ beach }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!beach) {
    return null; // or return a loading placeholder
  }

  return (
    <div className={styles.beachTab}>
      <div 
        className={styles.beachName} 
        onClick={toggleExpand}
      >
        {beach.name}
        <span className={`${styles.arrow} ${isExpanded ? styles.up : styles.down}`}>
          
        </span>
      </div>
      <div className={`${styles.beachStats} ${isExpanded ? styles.expanded : ''}`}>
        <ul>
          <li>Water Temperature: {beach.statistics.waterTemperature}°F</li>
          <li>Wave Height: {beach.statistics.waveHeight} meters</li>
          <li>Crowdedness: {beach.statistics.crowdedness}/10</li>
        </ul>
      </div>
    </div>
  );
};

export default BeachTab;