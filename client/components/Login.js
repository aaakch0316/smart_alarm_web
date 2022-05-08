import cx from "clsx";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useDispatch }  from "react-redux";

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
                <input onChange={onChange} className={cx("input","")} name="password" />
                <button type="submit"  className="btn btn__primary">로그인</button>
            </div>
        </form>
    )
}
