import cx from "clsx";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { useDispatch }  from "react-redux";

// import {
// 	getToken
// } from "../modules";

export function Signup() {
    const dispatch = useDispatch();
    const router = useRouter()
    const { register, handleSubmit, errors, reset, setValue } = useForm();

    // 일단은 input상관없이 token얻어오는걸로 test
    const onSubmitHandler = async() => {
        // dispatch(getToken())
        router.push('/setting')
    }
    return (

        <form 
            className="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
        >
            <div className="form__element">
                <h1>회원가입</h1>
                <label
                    htmlFor="idInput"
                    className={cx("label", errors.name && "label--error")}
                >
                    {errors.name ? (
                        "ID is required!"
                    ) : (
                        <>
                            ID&nbsp;<span className="label__required">*</span>
                        </>
                    )}
                </label>
                <input id="idInput" className="input" className={cx("input", errors.id && "input--error")} type="text" name="id"/>
                <label
                    htmlFor="emailInput"
                    className={cx("label", errors.email && "label--error")}
                >
                    {errors.email ? (
                        "Email is required!"
                    ) : (
                        <>
                            Email&nbsp;<span className="label__required">*</span>
                        </>
                    )}
                </label>
                <input id="emailInput" className={cx("input", errors.email && "input--error")} className="input" type="text" name="email"/>
                <label
                    htmlFor="passwordInput"
                    className={cx("label", errors.name && "label--error")}
                >
                    {errors.name ? (
                        "Password is required!"
                    ) : (
                        <>
                            Password&nbsp;<span className="label__required">*</span>
                        </>
                    )}
                </label>
                <input id="passwordInput" className={cx("input", errors.password && "input--error")} className="input" type="text" name="password"/>
                <button type="submit" className="btn btn__primary">회원가입</button>
            </div>
        </form>
    )
}
