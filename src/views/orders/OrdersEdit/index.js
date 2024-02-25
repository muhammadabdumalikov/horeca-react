import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderById, updateEmploye } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
// import ProductForm from '../EmployesForm'

injectReducer('ordersStoreEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const agentsData = useSelector(
        (state) => state.ordersStoreEdit.data.ordersItem
    )

    const loading = useSelector((state) => state.ordersStoreEdit.data.loading)


    const handleFormSubmit = async (values, setSubmitting) => {
        try {
            setSubmitting(true)
            const success = await updateEmploye(values)
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
        navigate('/orders')
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
        navigate('/orders')
    }

    useEffect(() => {
        dispatch(getOrderById({id}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(agentsData) && (
                    <>
                        {/* <ProductForm
                            type="edit"
                            initialData={agentsData}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        /> */}
                    </>
                )}
            </Loading>
            {!loading && isEmpty(agentsData) && (
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
