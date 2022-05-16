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
            if (sec === 1) {
                // 비동기 처리
                setHour(String(new Date().getHours()));
                setMinute(String(new Date().getMinutes()));
                console.log("실행되는지 확인", new Date().getMinutes())
                // 아래 함수가 위에 함수보다 먼저 실행됨
                alarmList.forEach((val, idx) => {
                    // console.log(val.alerthour, val.alertmin, new Date().getHours(), new Date().getMinutes(),Number(val.alerthour) === Number(hour) && Number(val.alertmin) === Number(minute))
                    if (Number(val.alerthour) === Number(new Date().getHours()) && Number(val.alertmin) === Number(new Date().getMinutes())) {
                        // 동영상 url넘겨주면 바꿔줌
                        console.log("시간이 똑같은지 확인합니다")
                        setVideoSource(val.mp4Url)
                        console.log("동영상이 넘어가나요?")
                        // setVideoSource('./sample-mp4-file-small.mp4')
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