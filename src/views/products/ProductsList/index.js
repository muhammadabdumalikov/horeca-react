import { AdaptableCard } from 'components/shared'
import React from 'react'
import ProductTableTools from './components/ProductTableTools'
import ProductTable from './components/ProductTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('salesProductList', reducer)

const Products = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Продукты</h3>
                <ProductTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default Products
