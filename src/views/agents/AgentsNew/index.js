import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateSalesProduct } from 'services/SalesService'
import AgentsForm from '../AgentsForm'

const AgentsNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateSalesProduct(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Агенты успешно добавлен
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/agents')
        }
    }

    const handleDiscard = () => {
        navigate('/agents')
    }

    return (
        <>
            <AgentsForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AgentsNew
