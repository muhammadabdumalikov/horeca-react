import React, { useCallback, useEffect } from 'react'
import { Notification, Select, toast } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck } from 'react-icons/hi'
import { setOrderStatus } from '../store/dataSlice'
import { useParams } from 'react-router-dom'
import { updateOrderStatus } from 'views/orders/OrdersList/store/dataSlice'

const ProductStatusFilter = () => {
    const dispatch = useDispatch()

    const { id: orderId } = useParams()

    const orderStatus = useSelector(
        (state) => state.xordersStore.data.orderStatus
    )

    const productList = useSelector(
        (state) => state.xordersStore.data.productList
    )

    const statusOfOrder = [
        { value: 1, label: 'Получен' },
        { value: 7, label: 'На складе' },
        { value: 2, label: 'Отгружен' },
        { value: 3, label: 'Доставлен' },
        { value: 4, label: 'Отменен' },
    ]

    console.log(productList, 'productList')

    const CustomSelectOption = ({ innerProps, label, isSelected }) => {
        return (
            <div
                className={`flex items-center justify-between p-2 cursor-pointer ${
                    isSelected
                        ? 'bg-gray-100 dark:bg-gray-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                {...innerProps}
            >
                <div className="flex items-center gap-2">
                    <span>{label}</span>
                </div>
                {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
            </div>
        )
    }

    const onStatusFilterChange = async (selected) => {
        dispatch(setOrderStatus({ orderStatus: selected?.value }))

        try {
            const success = await dispatch(
                updateOrderStatus({
                    order_id: orderId,
                    status: `${selected?.value}`,
                })
            )
            if (success.payload.success) {
                toast.push(
                    <Notification
                        title={'Успешно изменено'}
                        type="success"
                        duration={2500}
                    >
                        Cтатус заказа успешно изменен
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch (e) {
            if (e.response.status) {
                toast.push(
                    <Notification
                        title={'Ошибка'}
                        type="danger"
                        duration={2500}
                    >
                        {e.response.data.message}
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
        }
    }

    const fetchData = useCallback(() => {
        dispatch(setOrderStatus({ orderStatus: productList?.status }))
    }, [dispatch, productList?.status])

    useEffect(() => {
        fetchData()
    }, [fetchData, dispatch])

    return (
        <Select
            options={statusOfOrder}
            size="sm"
            isDisabled={productList?.status === 3}
            className="ml-4 min-w-[130px] disabled"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
            }}
            value={statusOfOrder.filter(
                (option) => option.value === orderStatus
            )}
        />
    )
}

export default ProductStatusFilter
