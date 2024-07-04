import React from 'react'
import styles from './MainPage.module.css'
import CalorieTracker from '../../components/CalorieTracker/CalorieTracker'
import facebook from '../../images/icons/facebook.png';
import instagram from '../../images/icons/instagram.png';
import twitter from '../../images/icons/twitter.png';
import whatsapp from '../../images/icons/whatsapp.png';
import linkedin from '../../images/icons/linkedin.png';
import youtube from '../../images/icons/youtube.png';

export default function MainPage() {

    return (
        <div className={styles.main}>
            <div className={styles.mainContent}>
                <div className={styles.column}>
                    <div className={styles.aboutUs}>
                        <h2 style={{textAlign: 'center'}}>Про нас</h2>
                        <ul>
                            <li><b>Слідкуйте</b> за тим, як змінився ваш прогрес у споживанні калорій разом зі СТАТИСТИКОЮ</li>
                            <li><b>Створіть</b> свій власний раціон завдяки таблиці PFCC</li>
                            <li><b>Будь у формі</b></li>
                        </ul>
                    </div>
                </div>
                <CalorieTracker className={styles.column} />
                <div className={styles.column}><div className={styles.socialMedia}>
                    <h2 style={{textAlign: 'center'}}>Наші соціальні мережі</h2>
                    <div className={styles.icons}>
                        <img src={facebook} alt="Facebook" />
                        <img src={instagram} alt="Instagram" />
                        <img src={youtube} alt="Youtube" />
                        <img src={twitter} alt="Twitter" />
                        <img src={whatsapp} alt="WhatsApp" />
                        <img src={linkedin} alt="LinkedIn" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
