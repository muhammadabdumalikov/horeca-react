import React from 'react'
import AgentsTableFilter from './OrdersTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import OrderSetStatusMultiple from './OrdersSetMultipleStatus'
import { HiDownload } from 'react-icons/hi'
import { Button, Notification, toast } from 'components/ui'
import { isEmpty } from 'lodash'
import { generateExcel } from './OrdersExcelPattern'
import { getOrders } from '../store/dataSlice'
import { apiGetFakturaOrder } from 'services/SalesService'
import OrdersPaymentTypeFilter from './OrdersPaymentTypeFilter'
import OrdersTableSearch from './OrdersTableSearch'
import OrdersTableSearchByClient from './OrdersTableSearchByClient'

const ProductTableTools = () => {
    const dispatch = useDispatch()

    const selectedRows = useSelector(
        (state) => state.ordersStore.state.selectedRows
    )

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.ordersStore.data.tableData
    )

    const onEditActivity = async () => {
        const success = await apiGetFakturaOrder({ order_ids: selectedRows })

        if (!isEmpty(success)) {
            generateExcel(success)
            popNotification(' Успешно получено', 'success')
            dispatch(
                getOrders({
                    search,
                    limit: pageSize,
                    offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
                })
            )
        } else {
            popNotification('Список пуст', 'danger')
        }
    }

    const popNotification = (keyword, type) => {
        toast.push(
            <Notification title={`${keyword}`} type={type} duration={2500}>
                {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        // navigate(`/products`)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {selectedRows.length > 0 && <OrderSetStatusMultiple />}
            {selectedRows.length > 0 && (
                <Button
                    className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                    size="sm"
                    icon={<HiDownload />}
                    onClick={onEditActivity}
                >
                    Фактура для склада
                </Button>
            )}
            {/* <ProductTableSearch /> */}

            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                {/* <span className="font-semibold md:mr-2">Номер заказа:</span> */}
                <OrdersTableSearchByClient />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                {/* <span className="font-semibold md:mr-2">Номер заказа:</span> */}
                <OrdersTableSearch />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <span className="font-semibold">Тип оплаты:</span>
                <OrdersPaymentTypeFilter />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center md:mx-2">
                <span className="font-semibold">Статус заказа:</span>
                <AgentsTableFilter />
            </div>
        </div>
    )
}

export default ProductTableTools
