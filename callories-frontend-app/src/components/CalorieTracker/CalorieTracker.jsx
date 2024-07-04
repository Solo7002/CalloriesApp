import React, { useEffect, useState } from 'react';
import CircularProgressBar from '../CircularProgress/CircularProgressBar';
import styles from './CalorieTracker.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const CalorieTracker = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')).token);
    const [CurrentUser, setCurrentUser] = useState({}); 

    const [NowCalories, setNowCalories] = useState(0);
    const [RecomendedCalories, setRecomendedCalories] = useState(0);
    const loadData = (user_id) => {
        let temp_calories = 0;
        let sel_date = new Date();
        console.log('sel_date',sel_date)
        axios.get(`https://localhost:7172/api/MealHistory/byUserId/${user_id}`, { headers: {Authorization: `Bearer ${token} ` } })
        .then(res => {
            console.log('res.data',res.data)
            const promises = res.data.map((mh) => {
                console.log('mh.mealDateTime',mh.mealDateTime)
                let mhDate = new Date(mh.mealDateTime);

                if (mhDate.getFullYear() === sel_date.getFullYear() && 
                    mhDate.getMonth() === sel_date.getMonth() && 
                    mhDate.getDate() === sel_date.getDate()) {
                    
                    return axios.get(`https://localhost:7172/api/Product/${mh.productId}`, { 
                        headers: { Authorization: `Bearer ${token}` } 
                    })
                    .then(res => {
                        temp_calories += res.data.calories;
                        console.log("res.data.calories: ", temp_calories + res.data.calories);
                    })
                    .catch(err => {
                        console.log('err', err);
                    });
                }
            });
            console.log('qweqw')

            Promise.all(promises).then(() => {
                setNowCalories(Math.round(temp_calories * 100) / 100);
            });
         })
        .catch(err => {
            console.log('err', err)
        });
    }

    useEffect(() => {
        const decoded = jwtDecode(token);
        console.log('decoded',decoded)
        console.log('decoded.unique_name',decoded.unique_name)
        axios.get(`https://localhost:7172/api/User/byLogin/${decoded.unique_name}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => { 
                setCurrentUser(res.data);
                console.log('res.data',res.data)
                console.log('res.data.userId',res.data.userId)

                let bmr = (res.data.weight * (res.data.isMan?24:22));
                let tdee = bmr * 1.5;

                switch (res.data.aim){
                    case "1": // Набрати вагу
                        setRecomendedCalories(tdee + 500);
                        break;
                    case "2": // Втримати вагу
                        setRecomendedCalories(tdee);
                        break;
                    case "3": // Скинути вагу
                        setRecomendedCalories(tdee - 500);
                        break;
                    default: // Втримати вагу
                        setRecomendedCalories(tdee);   
                        break;
                }
                loadData(res.data.userId);
             })
            .catch(err => {
                console.log('err', err)
            });
    }, [token])

    return (
        <div className={styles.calorieTracker}>
            <CircularProgressBar value={CurrentUser ? NowCalories : 0} max={RecomendedCalories} />
            <div className={styles.details}>
                <div className={styles.calories}>{CurrentUser ? NowCalories : 0}</div>
                <div>ккал</div>
                <div className={styles.icon}>🔥</div>
            </div>
            {
                CurrentUser
                ?
                null
                :
                "Авторизуйтесь для отримання доступу до інформації"
            }
        </div>
    );
};

export default CalorieTracker;
