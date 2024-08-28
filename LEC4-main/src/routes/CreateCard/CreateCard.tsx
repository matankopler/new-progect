
import { CardType } from '../../@types/types'
import { useForm } from 'react-hook-form';
import patterns from '../../validation/patterns';
import "./CreateCard.scss"
import { getCardsById, setCreateCard, updateMyCard } from '../../services/cards';
import { showErrorDialog, showSuccessDialog } from '../../Ui/dialogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const createCard = () => {
    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CardType>();
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            getCardsById(id).then((res => {
                for (const key in res.data) {
                    const value = res.data[key]
                    delete value._id

                    if ([
                        'title',
                        'subtitle', 'description', 'phone', 'email', 'image', 'address'
                    ].includes(key)) {
                        setValue(key as any, value)
                    }
                }
            }))
        }
    }, [])

    const onSubmit = (data: CardType) => {
        if (id) {
            updateMyCard(id, data).then((res) => {
                showSuccessDialog("Success", "Update").then(() => {
                    navigate("/MyCards")
                    console.log(res)
                })
            })
        } else {
            setCreateCard(data).then((res) => {
                (res.data)
                console.log('res', res)
                showSuccessDialog("Success", "created").then(() => {
                    navigate('/MyCards')
                })
            })
                .catch((e) => {
                    showErrorDialog("Error", e.response.data)
                })
        }
    }

    return (
        <div className="createcard-container bg-blue-100 dark:bg-blue-600">
            <h2 className="text-4xl p-5 dark:text-white">Create Card</h2>
            <form className="form-container" noValidate onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder='Title'
                    type="text"
                    {...register("title", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.title && (
                    <p className="text-red-500">{errors.title?.message}</p>
                )}

                <input
                    placeholder='Subtitle'
                    type="text"
                    {...register("subtitle", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.subtitle && (
                    <p className="text-red-500">{errors.subtitle?.message}</p>
                )}

                <input
                    placeholder='Description'
                    type="text"
                    {...register("description", {

                        minLength: { value: 2, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.description && (
                    <p className="text-red-500">{errors.description?.message}</p>
                )}

                <input
                    placeholder='Phone'
                    type="tel"
                    {...register("phone", {
                        required: "Must fill in",
                        minLength: { value: 9, message: "Too Short" },
                        maxLength: { value: 14, message: "Too Long" }
                    })}
                />
                {errors.phone && (
                    <p className="text-red-500">{errors.phone?.message}</p>
                )}

                <input
                    placeholder='Email'
                    type="email"
                    {...register("email", {
                        required: "Must fill in",
                        pattern: {
                            value: patterns.email,
                            message: "Invalid email"
                        }
                    })}
                />
                {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                )}

                <input
                    placeholder='Web'
                    type="text"
                    {...register("description", {
                        required: "Must fill in",
                        minLength: { value: 14, message: "Too Short" },
                        maxLength: { value: 255, message: "Too Long" }
                    })}
                />
                {errors.web && (
                    <p className="text-red-500">{errors.web?.message}</p>
                )}

                <input
                    placeholder='Image Url'
                    type="url"
                    {...register("image.url", {
                        required: "Must fill in",
                        pattern: {
                            value: patterns.url,
                            message: "Invalid image URL",
                        },
                    })}
                />
                {errors.image?.url && (
                    <p className="text-red-500"> {errors.image?.url?.message}</p>
                )}

                <input
                    placeholder='Image Description'
                    type="text"
                    {...register("image.alt", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.image?.alt && (
                    <p className="text-red-500">{errors.image?.alt?.message}</p>
                )}

                <input
                    placeholder='State'
                    type="text"
                    {...register("address.state", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.state && (
                    <p className="text-red-500">{errors.address?.state?.message}</p>
                )}

                <input
                    placeholder='Country'
                    type="text"
                    {...register("address.country", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.country && (
                    <p className="text-red-500">{errors.address?.country?.message}</p>
                )}

                <input
                    placeholder='City'
                    type="text"
                    {...register("address.city", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.city && (
                    <p className="text-red-500">{errors.address?.city?.message}</p>
                )}

                <input
                    placeholder='Street'
                    type="text"
                    {...register("address.street", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.street && (
                    <p className="text-red-500">{errors.address?.street?.message}</p>
                )}

                <input
                    placeholder='HouseNumber'
                    type="number"
                    {...register("address.houseNumber", {
                        required: "Must fill in",
                        minLength: { value: 1, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.houseNumber && (
                    <p className="text-red-500">{errors.address?.houseNumber?.message}</p>
                )}

                <input
                    placeholder='Zip'
                    type="number"
                    {...register("address.zip", {
                        required: "Must fill in",
                        minLength: { value: 2, message: "Too short" },
                        maxLength: { value: 255, message: "Too long" },
                    })}
                />
                {errors.address?.zip && (
                    <p className="text-red-500">{errors.address?.zip?.message}</p>
                )}

                <button className="sumbmit" type="submit">Sumbmit</button>

            </form>
        </div>
    )
}

export default createCard