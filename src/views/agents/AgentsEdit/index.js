import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAgents, updateAgent } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../AgentsForm'

injectReducer('salesAgentEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const agentsData = useSelector(
        (state) => state.salesAgentEdit.data.agentsList
    )

    const loading = useSelector((state) => state.salesAgentEdit.data.loading)

    const getAgentById = (id) => {
        const data = agentsData?.data?.list?.find((item) => item.id == id)
        if (data?.id) {
            return {
                region_id: data?.region_id,
                fullname: data?.fullname,
                contact: data?.contact,
                username: data?.username,
                password: data?.password,
                id: data?.id,
            }
        }
    }

    const data = getAgentById(id)

    const fetchData = (data) => {
        dispatch(getAgents(data))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)
            const success = await updateAgent(values)
            if (success) {
                popNotification('обновлено')
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

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Успешно ${keyword}`}
                type="success"
                duration={2500}
            >
                Агент успешно {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/agents')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={false}>
                {!isEmpty(data) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">Агент не найден!</h3>
                </div>
            )}
        </>
    )
}

export default ProductEdit
