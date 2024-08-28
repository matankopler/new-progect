import { useForm } from "react-hook-form"
import { LoginUser } from "../../@types/types";
import auth, { login } from "../../services/auth";
import dialogs, { showErrorDialog, showSuccessDialog } from "../../Ui/dialogs";
import { useNavigate } from "react-router-dom";
import patterns from "../../validation/patterns";
import { useContext, useState } from "react";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import "./Login.scss"
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)
    const onLogin = (data: LoginUser) => {
        auth
            .login(data)
            .then((res) => {
                showSuccessDialog("Login", "Logged In").then(() => {
                    login(res.data);
                    navigate("/");
                });
            })
            .catch((e) => {
                dialogs.error("Login Error", e.response.data)
            });
    };
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>();

    return (
        <div className="login-container  bg-blue-100 dark:bg-blue-600">
            <h2 className="text-4xl p-5 dark:text-white">Login Page</h2>
            <form className="form-container" noValidate onSubmit={handleSubmit(onLogin)}>
                <input
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                        required: "Must Fill In",
                        pattern: {
                            value: patterns.email,
                            message: "Invalid email"
                        }
                    })}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}

                <div className="password-comtainer">
                    <input
                        placeholder="Password"
                        type={showPassword ? `text` : `password`}
                        {...register("password", {
                            required: "Must Fill In",
                            pattern: {
                                value: patterns.password,
                                message: "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
                            }
                        })}
                    />
                    <button type="button" onClick={() => {
                        setShowPassword((s) => !s);
                    }}>
                        {showPassword ? <BsEyeSlashFill /> : <BsEye />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500">{errors.password?.message}</p>
                    )}
                </div>
                <button className="sumbmit" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login