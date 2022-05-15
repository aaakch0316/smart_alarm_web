import cx from "clsx";
import Button from '@mui/material/Button';
import Router from 'next/router';


// import {
// 	signin
// } from "../modules";

export function Login({onChange, onSubmit}) {
    return (
        <form 
            className="form"
            onSubmit={onSubmit}
        >
            <div className="form__element">
                <h1>로그인</h1>
                <label
                    htmlFor="emailInput"
                    className={cx("label", "")}
                >
                 
                        <>
                            Email&nbsp;<span className="label__required">*</span>
                        </>
      
                </label>
                <input id="emailInput" className={cx("input", "")} type="text" name="email" onChange={onChange} />
                <label
                    htmlFor="passwordInput"
                    className={cx("label", "")}
                >
                        <>
                            Password&nbsp;<span className="label__required">*</span>
                        </>
                </label> 
                <input onChange={onChange} className={cx("input","")} name="password" type="password"/>
                <button type="submit"  className="btn btn__primary">LOGIN</button>
                
            </div>
            <Button
				// variant="contained"
				size="large"
				className="btn"
				// styles={{fontSize: 10}}
				onClick={() => {
                    Router.push("/auth/register")
				}}
			> SIGNUP
			</Button>
        </form>
    )
}
