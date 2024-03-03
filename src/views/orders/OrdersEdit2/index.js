import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage, AdaptableCard } from 'components/shared'
import { toast, Notification, Select } from 'components/ui'
import { useSelector } from 'react-redux'
import reducer from '../OrdersList/store'
import { injectReducer } from 'store/index'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import OrdersStep from '../OrdersEdit/components/ordersStep'

injectReducer('ordersStore', reducer)

const ProductEdit = () => {
    const navigate = useNavigate()

    const loading = useSelector((state) => state.ordersStore.data.loading)

    const handleDiscard = () => {
        navigate('/orders')
    }

    return (
        <>
            <Loading loading={false}>
                {!isEmpty([{}]) && (
                    <>
                        <AdaptableCard className="h-full" bodyClass="h-full">
                            <div className="lg:flex items-center justify-between mb-4">
                                <h3 className="mb-4 lg:mb-0">Заказы</h3>
                                {/* <EmployesTableTools /> */}
                            </div>
                            {/* <EmployesTable /> */}
                        </AdaptableCard>
                        {/* <OrdersStep onDiscard={handleDiscard} /> */}
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
