import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useNavigate, useParams } from 'react-router-dom'
import {
    getNotificationById,
    updateNotification,
} from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../NotificationForm'

injectReducer('salesNotificationEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { id } = useParams()

    const notificationData = useSelector(
        (state) => state.salesNotificationEdit.data.notificationsList
    )

    const loading = useSelector(
        (state) => state.salesNotificationEdit.data.loading
    )

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateNotification(values)
        setSubmitting(false)
        if (success) {
            popNotification('обновлено')
        }
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Успешно  ${keyword}`}
                type="success"
                duration={2500}
            >
                Успешно {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/notifications')
    }

    const handleDiscard = () => {
        navigate('/notifications')
    }

    useEffect(() => {
        dispatch(getNotificationById({ id }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(notificationData) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={notificationData}
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
