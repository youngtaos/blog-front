import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import moment from 'moment/moment';

const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
const [NowYear, NowMouth, NowDay] = nowTime.split(' ')[0].split('-');
const [NowHours, NowMounties, NowSeconds] = nowTime.split(' ')[1].split(':');


const diffDay = (lastDate, earlyDate) => {
    return (Date.parse(lastDate) - Date.parse(earlyDate)) / 1000 / 60 / 60 / 24;
}



const CountDown = (props) => {
    const [over, setOver] = useState(false);
    const { graduationYear } = props;
    const GraduationTime = {
        year: parseInt(graduationYear),
        mouth: 7,
        day: 1,
        hours: parseInt(NowHours),
        minutes: parseInt(NowMounties),
        seconds: parseInt(NowSeconds)
    }

    let NowTime = {
        year: parseInt(NowYear),
        mouth: parseInt(NowMouth),
        day: parseInt(NowDay)
    }
    const RemainingDay = diffDay(`${GraduationTime.year}/${GraduationTime.mouth}/${GraduationTime.day}`, `${NowTime.year}/${NowTime.mouth}/${NowTime.day}`) - 1;
    const obj = { days: parseInt(RemainingDay), hours: 24 - GraduationTime.hours, minutes: 59 - GraduationTime.minutes, seconds: 59 - GraduationTime.seconds }


    const [time, setTime] = useState(obj);

    const tick = () => {
        if (over) return;
        if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            setOver(true);
        }
        else if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            setTime({
                days: time.days - 1,
                hours: 23,
                minutes: 59,
                seconds: 59
            });
        }
        else if (time.minutes === 0 && time.seconds === 0)
            setTime({
                days: time.days,
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            });
        else if (time.seconds === 0)
            setTime({
                days: time.days,
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            });
        else
            setTime({
                days: time.days,
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
    };


    useEffect(() => {
        // 执行定时
        let timerID = setInterval(() => tick(), 1000);
        // 卸载组件时进行清理
        return () => clearInterval(timerID);
    });
    return (
        <div className={styles.countdownWrapper}>
            <div className={styles.timeTittle}>大学剩余时间</div>
            <div className={styles.CountDowntime}>{`${time.days.toString()}天
                ${time.hours.toString().padStart(2, "0")}时
                ${time.minutes.toString().padStart(2, "0")}分
                ${time.seconds.toString().padStart(2, "0")}秒`}</div>
        </div>
    )
}

export default CountDown;