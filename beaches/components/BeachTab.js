// BeachTab.js
import React, { useState } from 'react';
import styles from './BeachTab.module.css';

const BeachTab = ({ beach, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!beach) {
    return null; // or handle loading state appropriately
  }

  const handleTabClick = () => {
    onClick(); // Trigger onClick passed from the parent component
    toggleExpand(); // Optionally toggle expand state
  };

  return (
    <div className={styles.beachTab} onClick={handleTabClick}>
      <div className={styles.beachName}>
        {beach.name}
        <span className={`${styles.arrow} ${isExpanded ? styles.up : styles.down}`}></span>
      </div>
      <div className={`${styles.beachStats} ${isExpanded ? styles.expanded : ''}`}>
        <ul>
          <li>Water Temperature: {beach.statistics.waterTemperature}°F</li>
          <li>Wave Height: {beach.statistics.waveHeight} meters</li>
          <li>Crowdedness: {beach.statistics.crowdedness}/10</li>
          <li>Predicted E.Coli Level: {beach.data.PredictedEcoliLevel} cfu /  100 ml</li>
          <li>Predicted Enterococci Levels: {beach.data.PredictedDNAReadingMean} cfu /  100 ml</li>
        </ul>
      </div>
    </div>
  );
};

export default BeachTab;