import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './EmployesTableSearch'
import { Link } from 'react-router-dom'
import AgentsTableFilter from './EmployesTableFilter'

const ProductTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            <AgentsTableFilter />

            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                {/* <Button block size="sm" icon={<HiDownload />}>
                    Скачать
                </Button> */}
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/employes/add"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Добавить сотрудника
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
