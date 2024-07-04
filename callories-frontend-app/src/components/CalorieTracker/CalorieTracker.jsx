import React from 'react';
import CircularProgressBar from '../CircularProgress/CircularProgressBar';
import styles from './CalorieTracker.module.css';

const CalorieTracker = () => {
    const progress = 1800; // сюда кол-во калорий
    const max = 2160; // сюда норму калорий за день

    return (
        <div className={styles.calorieTracker}>
            <CircularProgressBar value={progress} max={max} />
            <div className={styles.details}>
                <div className={styles.calories}>{progress}</div>
                <div>ккал</div>
                <div className={styles.icon}>🔥</div>
            </div>
        </div>
    );
};

export default CalorieTracker;
