import { AdaptableCard } from 'components/shared'
import React from 'react'
import ProvidersTools from './components/ProvidersTableTools'
import Providers from './components/ProvidersTable'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('providersStore', reducer)

const Employes = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Поставщик</h3>
                <ProvidersTools />
            </div>
            <Providers />
        </AdaptableCard>
    )
}

export default Employes
