import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import FakturaTable from './components/AktSverkaTable'
import OrdersTableTools from './components/AktSverkaTableTools'
import OrderDeleteConfirmation from './components/AktSverkaGetConfirmation'

injectReducer('aktSverka', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Aкт сверка</h3>
                <OrdersTableTools />
            </div>
            <FakturaTable />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
