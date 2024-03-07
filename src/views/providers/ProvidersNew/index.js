import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateProvider } from 'services/SalesService'
import AgentsForm from '../ProvidersForm'

const AgentsNew = () => {
    const navigate = useNavigate()

    const addProvider = async (data) => {
        const response = await apiCreateProvider(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)
            const success = await addProvider(values)

            if (success) {
                toast.push(
                    <Notification
                        title={'Успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Поставщик успешно добавлен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/providers')
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
        navigate('/providers')
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
