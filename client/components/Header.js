// import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import Button from '@mui/material/Button';
import BasicModal from './BasicModal'

// import { setModalOpen } from "@/modules";
// import { setCallToken } from "@/modules";

export function Header({data, onSubmitAlarm, onChangeAlarm, modalObject}) {
	// const dispatch = useDispatch();

	return (
		<header className="header">
			<h1 className="header__h1">
				안녕하세요  <span>{data?.userDetail.name}님</span>
			</h1>
			{/* <Button
				variant="contained"
				size="large"
				className="btn__icon"
				styles={{fontSize: 10}}
				// onClick={() => {
				// 	dispatch(setModalOpen(true));
				// }}
			>
				<PersonAddSVG /> <b>알람 추가</b>
			</Button> */}
			<BasicModal modalObject={modalObject} onSubmitAlarm={onSubmitAlarm} onChangeAlarm={onChangeAlarm} />
            {/* <button onClick={alertHello}>hello</button> */}
		</header>
	);
}
