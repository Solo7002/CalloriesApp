import React from 'react';
import CircularProgressBar from '../CircularProgress/CircularProgressBar';
import styles from './CalorieTracker.module.css';

const CalorieTracker = () => {
    const progress = 1800; // сюда кол-во калорий
    const max = 2160; // сюда норму калорий за день
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className={styles.calorieTracker}>
            <CircularProgressBar value={user ? progress : 0} max={max} />
            <div className={styles.details}>
                <div className={styles.calories}>{user ? progress : 0}</div>
                <div>ккал</div>
                <div className={styles.icon}>🔥</div>
            </div>
            {
                user
                ?
                null
                :
                "Авторизуйтесь для отримання доступу до інформації"
            }
        </div>
    );
};

export default CalorieTracker;
