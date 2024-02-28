import { AdaptableCard } from 'components/shared'
import React from 'react'
import EmployesTableTools from './components/OrdersTableTools'
import EmployesTable from './components/OrdersTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('ordersStore', reducer)

const Orders = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Заказы</h3>
                <EmployesTableTools />
            </div>
            <EmployesTable />
        </AdaptableCard>
    )
}

export default Orders
