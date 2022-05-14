import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import LocalTime from './Localtime';
import AiSelectorModal from './AiSelectorModal';

export function Studio({data, onDelAlarm, modalAiObject, dataAi}) {
    const latestData = data.length -1


    return (
        <div className="layout">

            <div className="video">
                <div className="time">
                    <LocalTime />
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
                            {/* {data.map(({_id, content, alerthour, alertmin, period, mp4Url})=>( */}
                            {data[latestData]?.userDetail?.alarm.map((alarm)=>(
                                <tr key={alarm._id}>
                                    <td>{alarm.alerthour} : {alarm.alertmin}</td>
                                    <td>{alarm.content}</td>
                                    {alarm.mp4Url? 
                                    <td>
                                        {/* <Button variant="contained">수정</Button> */}
                                        <Button variant="contained" onClick={(e)=>onDelAlarm(alarm, e)} >삭제</Button>
                                    </td>
                                    : 
                                    <td>
                                        {/* <Button
                                            fullWidth
                                            variant="contained"
                                            // sx={{ mt: 1, mb: 2 }}
                                        >
                                            모델생성
                                        </Button> */}
                            			<AiSelectorModal 
                                        modalAiObject={modalAiObject} 
                                        dataAi={dataAi}
                                        // onSubmitAlarm={onSubmitAlarm} 
                                        // onChangeAlarm={onChangeAlarm} 
                                        />

                                        <Button variant="contained" onClick={(e)=> onDelAlarm(alarm, e)} >삭제</Button>
                                    </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
