import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateEmployes } from 'services/SalesService'
import AgentsForm from '../EmployesForm'

const OrdersNew = () => {
    const navigate = useNavigate()

    const addEmployes = async (data) => {
        const response = await apiCreateEmployes(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)
            const success = await addEmployes(values)

            if (success) {
                toast.push(
                    <Notification
                        title={'Успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Сотрудник успешно добавлен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/employes')
            }
            setSubmitting(false)
        } catch (e) {
            if (e.response.status === 449) {
                toast.push(
                    <Notification
                        title={'Ошибка'}
                        type="danger"
                        duration={2500}
                    >
                        {e.response.data.message}
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
            setSubmitting(false)
        }
    }

    const handleDiscard = () => {
        navigate('/employes')
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

export default OrdersNew
