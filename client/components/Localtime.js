import {useState, useEffect} from 'react';
const LocalTime = ({data, setVideoSource}) => {
    const [time, setTime] = useState(new Date());
    const [hour, setHour] = useState(new Date().getHours());
    const [minute, setMinute] = useState(new Date().getMinutes());


    useEffect(() => {
        const id = setInterval(async () => {
            setTime(new Date());
            const sec = new Date().getSeconds();
            const alarmList = data[0].userDetail.alarm
            if (Number(sec) === 1) {
                // 비동기 처리
                await setHour(new Date().getHours());
                await setMinute(new Date().getMinutes());
                console.log("실행되는지 확인")
                // 아래 함수가 위에 함수보다 먼저 실행됨
                alarmList.forEach((val, idx) => {
                    console.log(val.alerthour, val.alertmin, hour, minute,Number(val.alerthour) === Number(hour) && Number(val.alertmin) === Number(minute))
                    if (Number(val.alerthour) === Number(hour) && Number(val.alertmin) === Number(minute)) {
                        // 동영상 url넘겨주면 바꿔줌
                        setVideoSource(vla.mp4Url)
                        console.log("hi")
                    }
                })
                
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