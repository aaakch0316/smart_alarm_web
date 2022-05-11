import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
// import {useDispatch}  from "react-redux";

// ai가 보이는 메인 페이지
// 알람추가를 할수있다
// 알람을 테이블에서 확인할수있고, 수정 삭제 가능
export function Studio({data}) {
    // const dispatch = useDispatch()
    const router = useRouter()
    // mount
    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         router.push('/login')
    //     }
    // })
    const [hours, setHours] = useState('')
    const [min, setMin] = useState('')
    const [seconds, setSeconds] = useState('')

    useEffect(() => { 
        // 현재시각
        const setDate = () => {
            const now = new Date();
            setHours(String(now.getHours()).padStart(2,'0'));
            setMin(String(now.getMinutes()).padStart(2,'0'));
            setSeconds(String(now.getSeconds()).padStart(2,'0'));
        };
        
        setInterval(setDate, 1000);
    })
    return (
        <div className="layout">
            {/* <button className="btn btn__primary" onClick={()=>{
                dispatch(getToken())
            }}>1: 토큰받기</button> */}
            {/* 알람 추가하는 모달에 넣기 */}
            {/* <button className="btn btn__primary">2: 영상보기</button> */}
            <div className="video">
                <div className="time">
                    <span className="hand">현재시각  </span>
                    <span className="hand hour-hand">{hours}:</span>
                    <span className="hand min-hand">{min}:</span>
                    <span className="hand sec-hand">{seconds}</span>
                </div>
                <div className="video-table">
                    <video width="80%" height="500px"  controls>
                        <source src="https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/ysy_2_a8d4cf2dbe8a094cc62a0a1e6a80cfc8.mp4"></source>
                    </video>
                    <table className="table">
                        <thead className="table__head">
                            <tr>
                                <th>시간</th>
                                <th>내용</th>
                                <th>설정</th>
                            </tr>
                        </thead>

                        <tbody className="table__body">
                            {data?.userDetail.alarm.map(({_id, content, alerthour, alertmin, period})=>(
                                <tr key={_id}>
                                    <td>{alerthour} : {alertmin}</td>
                                    <td>{content}</td>
                                    <td>
                                        <button className="btn btn__compact">수정</button>
                                        <button className="btn btn__compact">삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
