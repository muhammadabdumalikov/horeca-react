import React from 'react'
import ProductTableSearch from './EmployesTableSearch'
import NotificationTableFIlter from './EmployesTableFilter'

const ProductTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
                {/* <ProductTableSearch /> */}
                <NotificationTableFIlter />
        </div>
    )
}

export default ProductTableTools
