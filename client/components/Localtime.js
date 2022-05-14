import {useState, useEffect} from 'react';
const LocalTime = ({data, setVideoSource}) => {
    const [time, setTime] = useState(new Date());
    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());


    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
            const sec = new Date().getSeconds();
            const alarmList = data[0].userDetail.alarm
            // console.log("time", alarmList)
            alarmList.forEach((val, idx) => {
                if (Number(val.alerthour) === Number(hour) && Number(val.alertminute) === Number(minute)) {
                    console.log(Number(val.alerthour) === Number(hour))
                    console.log(Number(val.alertminute) === Number(minute))

                }
            })
            if (String(sec) === "0") {
                setHour(new Date().getHours());
                setMinute(new Date().getMinutes());
                
            }
        }, 1000);
        return (() => {
            clearInterval(id)
        })
    }, [data]);
    return (
        <>
            <div style={{fontSize:20}}>{time.toLocaleTimeString()}</div>
        </>
    )
}

export default LocalTime;