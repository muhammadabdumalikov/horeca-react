import { AdaptableCard } from 'components/shared'
import React from 'react'
import EmployesTableTools from './components/EmployesTableTools'
import EmployesTable from './components/EmployesTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('paidStore', reducer)

const DebtUsers = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Оплаченная сумма</h3>
                <EmployesTableTools />
            </div>
            <EmployesTable />
        </AdaptableCard>
    )
}

export default DebtUsers
