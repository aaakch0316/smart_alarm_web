import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import LocalTime from './Localtime';
import AiSelectorModal from './AiSelectorModal';

export function Studio({data, aiModelInfo, onChangeModelInfo, onTargetModelInfo, videoSource, setVideoSource, onDelAlarm, modalAiObject, dataAi}) {

    const latestData = data.length -1
    useEffect(() => {
        document.querySelector('#video').autoplay = true;
    }, [videoSource])


    return (
        <div className="layout">

            <div className="video">
                <div className="time">
                    <LocalTime data={data} setVideoSource={setVideoSource}/>
                </div>
                <div className="video-table">
                    <video src={videoSource} id="video" width="80%" height="500px" controls autoPlay>
                        {/* <source /> */}
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
                            {data[latestData]?.userDetail?.alarm.map((alarm)=>(
                                <tr key={alarm._id}>
                                    <td>{alarm.alerthour.padStart(2,'0')} : {alarm.alertmin.padStart(2,'0')}</td>
                                    <td>{alarm.content}</td>
                                    {alarm.mp4Url? 
                                    <td>
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
                                        aiModelInfo={aiModelInfo}
                                        dataAi={dataAi}
                                        onChangeModelInfo={onChangeModelInfo}
                                        onTargetModelInfo={onTargetModelInfo}
                                        alarm={alarm}
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
