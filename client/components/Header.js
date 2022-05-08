// import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
// import { setModalOpen } from "@/modules";
// import { setCallToken } from "@/modules";

export function Header() {
	// const dispatch = useDispatch();

	return (
		<header class="header">
			<h1 class="header__h1">
				안녕하세요  <span>김명자님</span>
			</h1>
			<button
				class="btn btn__primary btn__icon"
				// onClick={() => {
				// 	dispatch(setModalOpen(true));
				// }}
			>
				<PersonAddSVG /> <span>알람추가</span>
			</button>
            {/* <button onClick={alertHello}>hello</button> */}
		</header>
	);
}
