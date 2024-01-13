import { AdaptableCard } from 'components/shared'
import React from 'react'
import { injectReducer } from 'store'
import reducer from './store'
import CategoryTable from './components/CategoryTable'
import CategoryTableTools from './components/CategoryTableTools'

injectReducer('categoryList', reducer)

const Products = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Категории</h3>
                <CategoryTableTools />
            </div>
            <CategoryTable />
        </AdaptableCard>
    )
}

export default Products
