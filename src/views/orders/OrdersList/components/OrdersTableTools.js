import React from 'react'
import AgentsTableFilter from './OrdersTableFilter'
import { useSelector } from 'react-redux'
import OrderSetStatusMultiple from './OrdersSetMultipleStatus'

const ProductTableTools = () => {
    const selectedRows = useSelector(
        (state) => state.ordersStore.state.selectedRows
    )

    

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {selectedRows.length > 0 &&
               <OrderSetStatusMultiple/>
            }

            {/* <ProductTableSearch /> */}
            <AgentsTableFilter />
        </div>
    )
}

export default ProductTableTools
