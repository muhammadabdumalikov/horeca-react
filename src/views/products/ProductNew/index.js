import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from 'services/SalesService'
import ProductForm from '../ProductForm'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateSalesProduct(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        // setSubmitting(true)
        // const success = await addProduct(values)
        // setSubmitting(false)
        // if (success) {
        //     toast.push(
        //         <Notification
        //             title={'Successfuly added'}
        //             type="success"
        //             duration={2500}
        //         >
        //             Товар успешно добавлен
        //         </Notification>,
        //         {
        //             placement: 'top-center',
        //         }
        //     )
        //     navigate('/products')
        console.log(values, 'values')
        // return ''
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
