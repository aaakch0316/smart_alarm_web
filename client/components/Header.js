import BasicModal from './BasicModal'

export function Header({data, onSubmitAlarm, onChangeAlarm, modalObject}) {
    const disease = data?.userDetail.feature
    const style = {
        marginRight: "10px",
    }
	return (
		<header className="header">
			<h1 className="header__h1">
				안녕하세요  <span>{data?.userDetail.name}님</span>
			</h1>
            <div>
                <p fontWeight="bold">나이: {data?.userDetail.age}세</p>
            </div>
            <div>
                <p fontWeight="bold">
                    보유 질병 : {disease?.length === 0 ? '특이질병없음' : disease?.map(val => (<span style={style}>{val}</span>))}
                </p>
            </div>
			<BasicModal modalObject={modalObject} onSubmitAlarm={onSubmitAlarm} onChangeAlarm={onChangeAlarm} />
		</header>
	);
}
