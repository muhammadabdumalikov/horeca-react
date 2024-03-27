import React from 'react'
import { Button } from 'components/ui'
import { HiOutlineArrowLeft, HiOutlineCash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ProductsTableFilter from './ProductsTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import { toggleEditPayment } from '../store/stateSlice'
import ProductStatusFilter from './ProductsStatusFilter'

const ProductTableTools = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDiscard = () => {
        navigate('/orders')
    }

    // const handleOrderStep = () => {
    //     dispatch(toggleEditOrderStep(true))
    // }
    const productList = useSelector(
        (state) => state.xordersStore.data.productList
    )
    const handleOpenEditPayment = () => {
        dispatch(toggleEditPayment(true))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <span className='font-semibold'>Доставщик:</span> <ProductsTableFilter />
            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <span className='font-semibold'>Статус заказа:</span> <ProductStatusFilter />
                {/* <Button
                    onClick={handleOrderStep}
                    block
                    size="sm"
                    icon={<HiOutlineLocationMarker />}
                >
                    Процесс заказа
                </Button> */}
            </div>
           {productList.status !== 3 || productList.paid === 1 && 2 && <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <Button
                    onClick={handleOpenEditPayment}
                    block
                    size="sm"
                    icon={<HiOutlineCash />}
                >
                    Ввести сумму
                </Button>
            </div>}
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
