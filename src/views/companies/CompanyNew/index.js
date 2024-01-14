import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateCompany } from 'services/SalesService'
import ProductForm from '../CompanyForm'

const ProductNew = () => {
    const navigate = useNavigate()

    const createCompany = async (data) => {
        const response = await apiCreateCompany(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await createCompany(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Компания успешно добавлен'}
                    type="success"
                    duration={2500}
                >
                    Компания успешно добавлен
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/companies')
        }
    }

    const handleDiscard = () => {
        navigate('/companies')
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
