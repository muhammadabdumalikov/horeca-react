import { AdaptableCard } from 'components/shared'
import React from 'react'
import CompanyTableTools from './components/CompanyTableTools'
import CompanyTable from './components/CompanyTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('salesCompanyList', reducer)

const Company = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Компании</h3>
                <CompanyTableTools />
            </div>
            <CompanyTable />
        </AdaptableCard>
    )
}

export default Company
