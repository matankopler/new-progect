import { useForm } from "react-hook-form"
import { RegisterUser } from "../../@types/types"
import patterns from "../../validation/patterns";
import "./Register.scss"
import { useState } from "react";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { registerMock } from "../../mocks/register";
import { useNavigate } from "react-router-dom";
import auth from "../../services/auth";
import dialogs from "../../Ui/dialogs";


const Register = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<RegisterUser>({ defaultValues: registerMock })

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const onRegister = (data: RegisterUser) => {
        auth
            .register(data)
            .then((res) => {
                localStorage.setItem("user_id", res.data._id)
                console.log(res)
                dialogs.success("Success", "register").then(() => {
                    navigate("/login")
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data)
            });
    };

    return (
        <div className="register-container bg-blue-100 dark:bg-blue-600">
            <h2 className="text-4xl p-5 dark:text-white">Register</h2>
            <form className="form-container" noValidate onSubmit={handleSubmit(onRegister)}>
                <input
                    placeholder="First Name"
                    type="text"
                    {...register("name.first", {
                        required: "Must Fill In",
                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.name?.first && (
                    <p className="text-red-500">{errors.name?.first?.message}</p>
                )}

                <input
                    placeholder="Middle Name"
                    type="text"
                    {...register("name.middle", {
                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.name?.middle && (
                    <p className="text-red-500">{errors.name?.middle?.message}</p>
                )}

                <input
                    placeholder="Last Name"
                    type="text"
                    {...register("name.last", {
                        required: "Must Fill In",
                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.name?.last && (
                    <p className="text-red-500">{errors.name?.last?.message}</p>
                )}

                <input
                    placeholder="Phone"
                    type="tel"
                    {...register("phone", {
                        required: "Must Fill",
                        minLength: { value: 9, message: "Too Short" },
                        maxLength: { value: 14, message: "Too Long" }
                    })}
                />
                {errors.phone && (
                    <p className="text-red-500">{errors.phone?.message}</p>
                )}

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

                <input
                    placeholder="Image URL"
                    type="url"
                    {...register("image.url", {
                        pattern: {
                            value: patterns.url,
                            message: "Invalid image URL",
                        },
                    })}
                />
                {errors.image?.url && (
                    <p className="text-red-500">{errors.image?.url?.message}</p>
                )}

                <input
                    placeholder="Image Description"
                    type="text"
                    {...register("image.alt", {
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.image?.alt && (
                    <p className="text-red-500">{errors.image?.alt?.message}</p>
                )}

                <input
                    placeholder="State"
                    type="text"
                    {...register("address.state", {
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.state && (
                    <p className="text-red-500">{errors.address?.state?.message}</p>
                )}

                <input
                    placeholder="Country"
                    type="text"
                    {...register("address.country", {
                        required: "Must Fill In",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.country && (
                    <p className="text-red-500">{errors.address?.country?.message}</p>
                )}

                <input
                    placeholder="City"
                    type="text"
                    {...register("address.city", {
                        required: "Must Fill In",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.city && (
                    <p className="text-red-500">{errors.address?.city?.message}</p>
                )}

                <input
                    placeholder="Street"
                    type="text"
                    {...register("address.street", {
                        required: "Must Fill In",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.street && (
                    <p className="text-red-500">{errors.address?.street?.message}</p>
                )}

                <input
                    placeholder="House Number"
                    type="number"
                    {...register("address.houseNumber", {
                        required: "Must Fill In",
                        min: { value: 2, message: "Too small" },
                        max: { value: 256, message: "Too big" },
                    })}
                />
                {errors.address?.houseNumber && (
                    <p className="text-red-500">
                        {errors.address?.houseNumber?.message}
                    </p>
                )}

                <input
                    placeholder="Zip"
                    type="number"
                    {...register("address.zip", {
                        required: "Must Fill In",
                        min: { value: 2, message: "Too small" },
                        max: { value: 100000000, message: "Too big" },
                    })}
                />
                {errors.address?.zip && (
                    <p className="text-red-500">{errors.address?.zip?.message}</p>
                )}

                <section className="checkbox-container">
                    <span><FcBusinessman /></span>
                    <label htmlFor="isBusiness">Business</label>
                    <input
                        id="isBusiness"
                        type="checkbox"
                        {...register("isBusiness", {
                            required: "This field is mandatory",
                        })}
                    />
                    {errors.isBusiness && (
                        <p className="text-red-500">{errors.isBusiness?.message}</p>
                    )}
                </section>

                <button className="sumbmit" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register