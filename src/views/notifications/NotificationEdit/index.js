import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getNotifications } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../NotificationForm'
import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'
import axios from 'axios'

injectReducer('salesNotificationEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const notificationData = useSelector(
        (state) => state.salesNotificationEdit.data.notificationsList
    )

    const getCategoryById = (id) => {
        const data = notificationData?.data?.list?.find((item) => item.id == id)

        if (data?.id) {
            return {
                topic: data?.topic,
                content: data?.content,
                image: 'https://horecaapi.uz/' + data?.image,
                id: data?.id,
            }
        }
    }

    const data = getCategoryById(id)

    const loading = useSelector(
        (state) => state.salesNotificationEdit.data.loading
    )

    const fetchData = () => {
        dispatch(getNotifications({}))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        let accessToken = persistData.auth.session.token
        setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('topic', values.topic)
            formData.append('content', values.content)
            formData.append('file', values.img)
            formData.append('id', values.id)

            const response = await axios.put(
                'https://horecaapi.uz/api/ntf/update',
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        token: accessToken,
                    },
                }
            )

            if (response.status === 201) {
                toast.push(
                    <Notification
                        title={'Успешно добавлено'}
                        type="success"
                        duration={2500}
                    >
                        Уведомления успешно добавлены
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/notifications')
            }

            setSubmitting(false)
        } catch (error) {
            if (error.response.status === 449) {
                toast.push(
                    <Notification
                        title={'Ошибка'}
                        type="danger"
                        duration={2500}
                    >
                        Пожалуйста, заполните все поля
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
        navigate('/notifications')
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
                {!isEmpty(notificationData) && (
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
            {!loading && isEmpty(notificationData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">Товар не найден!</h3>
                </div>
            )}
        </>
    )
}

export default ProductEdit
