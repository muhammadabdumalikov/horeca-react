import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useSelector } from 'react-redux'
import reducer from './../OrdersList/store'
import { injectReducer } from 'store/index'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import OrdersStep from './components/ordersStep'
// import ProductForm from '../EmployesForm'

injectReducer('ordersStore', reducer)

const ProductEdit = () => {
    const navigate = useNavigate()

    const loading = useSelector((state) => state.ordersStore.data.loading)

    // const handleFormSubmit = async (values, setSubmitting) => {
    //     try {
    //         setSubmitting(true)
    //         const success = await updateEmploye(values)
    //         if (success) {
    //             popNotification('обновлено')
    //         }
    //         setSubmitting(false)
    //     } catch (e) {
    //         if (e.response.status === 449) {
    //             toast.push(
    //                 <Notification
    //                     title={'Ошибка'}
    //                     type="danger"
    //                     duration={2500}
    //                 >
    //                     {e.response.data.message}
    //                 </Notification>,
    //                 {
    //                     placement: 'top-center',
    //                 }
    //             )
    //         }
    //         setSubmitting(false)
    //     }
    // }

    const handleDiscard = () => {
        navigate('/orders')
    }

    // const popNotification = (keyword) => {
    //     toast.push(
    //         <Notification
    //             title={`Успешно ${keyword}`}
    //             type="success"
    //             duration={2500}
    //         >
    //             Агент успешно {keyword}
    //         </Notification>,
    //         {
    //             placement: 'top-center',
    //         }
    //     )
    //     navigate('/orders')
    // }

    return (
        <>
            <Loading loading={false}>
                {!isEmpty([{}]) && (
                    <>
                        <OrdersStep onDiscard={handleDiscard} />
                    </>
                )}
            </Loading>
            {!loading && isEmpty([{}]) && (
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
