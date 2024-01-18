import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateAgent } from 'services/SalesService'
import AgentsForm from '../AgentsForm'

const AgentsNew = () => {
    const navigate = useNavigate()

    const addAgent = async (data) => {
        const response = await apiCreateAgent(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)
            const success = await addAgent(values)

            if (success) {
                toast.push(
                    <Notification
                        title={'Успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Агент успешно добавлен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/agents')
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
