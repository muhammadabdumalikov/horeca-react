import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import FakturaTable from './components/FakturaTable'
import OrdersTableTools from './components/FakturaTableTools'
import OrderDeleteConfirmation from './components/FakturaGetConfirmation'

injectReducer('fakturaStore', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Фактура</h3>
                <OrdersTableTools />
            </div>
            <FakturaTable />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
