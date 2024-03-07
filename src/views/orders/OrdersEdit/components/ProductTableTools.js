import React from 'react'
import { Button } from 'components/ui'
import {
    HiOutlineArrowLeft,
    HiOutlineCash,
    HiOutlineLocationMarker,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ProductsTableFilter from './ProductsTableFilter'
import { useDispatch } from 'react-redux'
import { toggleEditOrderStep, toggleEditPayment } from '../store/stateSlice'

const ProductTableTools = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDiscard = () => {
        navigate("/orders")
    }

    const handleOrderStep = () => {
        dispatch(toggleEditOrderStep(true))
    }
    const handleOpenEditPayment = () => {
        dispatch(toggleEditPayment(true))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            
            <ProductsTableFilter/>
            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <Button
                    onClick={handleOrderStep}
                    block
                    size="sm"
                    icon={<HiOutlineLocationMarker />}
                >
                    Процесс заказа
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <Button
                    onClick={handleOpenEditPayment}
                    block
                    size="sm"
                    icon={<HiOutlineCash />}
                >
                    Ввести сумму
                </Button>
            </div>
            {/* <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Скачать
                </Button>
            </Link> */}
            <div className="flex flex-col lg:flex-row lg:items-center">
                <Button
                    onClick={handleDiscard}
                    block
                    size="sm"
                    icon={<HiOutlineArrowLeft />}
                >
                    Назад
                </Button>
            </div>
        </div>
    )
}

export default ProductTableTools
