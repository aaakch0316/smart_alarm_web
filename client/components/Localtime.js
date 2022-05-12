import {useState, useEffect} from 'react';
const LocalTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const id = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return (() => clearInterval(id))
    }, []);
    return (
        <>
            <div style={{fontSize:20}}>{time.toLocaleTimeString()}</div>
        </>
    )
}

export default LocalTime;