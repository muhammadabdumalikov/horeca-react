import React, { useEffect } from 'react'
import { Notification, Select, toast } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck } from 'react-icons/hi'
import { getDelivers, setFilterData } from '../store/dataSlice'
import { useParams } from 'react-router-dom'
import { apiUpdateOrderDeliver } from 'services/SalesService'

const ProductsTableFilter = () => {
    const dispatch = useDispatch()

    const { id: orderId } = useParams()

    const { status } = useSelector(
        (state) => state.xordersStore.data.filterData
    )
    const deliversList = useSelector(
        (state) => state.xordersStore.data.deliversList
    )
    const productList = useSelector(
        (state) => state.xordersStore.data.productList
    )

    console.log(productList?.deliver_id, 'productList')

    const sortOptions = (data) => {
        return data.map((item) => ({
            label: `${item.first_name} ${item.last_name}`,
            value: item.id,
        }))
    }

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

    const changeDelivery = async (data) => {
        const response = await apiUpdateOrderDeliver(data)
        return response.data
    }

    const onStatusFilterChange = async (selected) => {
        dispatch(setFilterData({ status: selected?.value }))

        try {
            const { success } = await changeDelivery({
                order_id: orderId,
                deliver_id: selected?.value,
            })

            if (success) {
                toast.push(
                    <Notification
                        title={'Успешно изменено'}
                        type="success"
                        duration={2500}
                    >
                        Доставщик успешно изменен
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

    useEffect(() => {
        dispatch(getDelivers({ role: 4 }))
    }, [dispatch])

    return (
        <Select
            options={sortOptions(deliversList)}
            size="sm"
            className="ml-4 min-w-[130px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
            }}
            // defaultValue={{value: productList?.deliver_id, label: productList?.first_name}}
            value={sortOptions(deliversList).filter(
                (option) => option.value === status
            )}
        />
    )
}

export default ProductsTableFilter
