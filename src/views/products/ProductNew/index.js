import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../ProductForm'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

const ProductNew = () => {
    const navigate = useNavigate()


    const handleFormSubmit = async (values, setSubmitting) => {
        // const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        // const persistData = deepParseJson(rawPersistData)

        // let accessToken = persistData.auth.session.token
        // setSubmitting(true)

        console.log(values)

        // try {
        //     const formData = new FormData()
        //     formData.append('topic', values.topic)
        //     formData.append('content', values.content)
        //     formData.append('file', values.img)

        //     const response = await axios.post(
        //         'https://horecaapi.uz/api/ntf/create',
        //         formData,
        //         {
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'multipart/form-data',
        //                 token: accessToken,
        //             },
        //         }
        //     )

        //     if (response.status === 201) {
        //         toast.push(
        //             <Notification
        //                 title={'Успешно добавлено'}
        //                 type="success"
        //                 duration={2500}
        //             >
        //                 Уведомления успешно добавлены
        //             </Notification>,
        //             {
        //                 placement: 'top-center',
        //             }
        //         )
        //         navigate('/notifications')
        //     }

        //     setSubmitting(false)
        // } catch (error) {
        //     if (error.response.status === 449) {
        //         toast.push(
        //             <Notification
        //                 title={'Ошибка'}
        //                 type="danger"
        //                 duration={2500}
        //             >
        //                 Пожалуйста, заполните все поля
        //             </Notification>,
        //             {
        //                 placement: 'top-center',
        //             }
        //         )
        //     }
        //     setSubmitting(false)
        // }
    }

    const handleDiscard = () => {
        navigate('/products')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
