import { AdaptableCard } from 'components/shared'
import React from 'react'
import AgentsTableTools from './components/AgentsTableTools'
import AgentsTable from './components/AgentsTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('agentsList', reducer)

const Products = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Агенты</h3>
                <AgentsTableTools />
            </div>
            <AgentsTable />
        </AdaptableCard>
    )
}

export default Products
