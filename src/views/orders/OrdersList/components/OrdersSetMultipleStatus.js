import React from 'react'
import { Select, toast, Notification } from 'components/ui'
import {
    getOrders,
    setMultipleSelect,
} from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck } from 'react-icons/hi'
import { apiSetDeliverStatusMultiple } from 'services/SalesService'
import { setSelectedRows } from '../store/stateSlice'

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
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

const OrderSetStatusMultiple = () => {
    const dispatch = useDispatch()

    const { deliver } = useSelector(
        (state) => state.ordersStore.data.multipleSelect
    )
    const selectedRows = useSelector(
        (state) => state.ordersStore.state.selectedRows
    )

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.ordersStore.data.tableData
    )

    const deliversList = useSelector(
        (state) => state.ordersStore.data.deliversList
    )

    const categoryOptions = deliversList?.map((category) => ({
        label: `${category.first_name} ${category.last_name}`,
        value: category.id,
    }))

    const updateStatus = async (selected) => {
        const success = await apiSetDeliverStatusMultiple({
            order_ids: selectedRows,
            deliver_id: selected?.value,
        })

        if (success.status === 201) {
            popNotification('изменено доставщик')
            dispatch(setSelectedRows([]))
            dispatch(
                getOrders({
                    offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
                    limit: pageSize,
                    search,
                })
            )
        }
    }
    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Успешно ${keyword}`}
                type="success"
                duration={2500}
            >
                Успешно {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    const onStatusFilterChange = (selected) => {
        dispatch(setMultipleSelect({ deliver: selected?.value }))
        updateStatus(selected)
    }

    return (
        <Select
            options={categoryOptions}
            size="sm"
            className="ml-4 min-w-[130px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
            }}
            value={categoryOptions.filter((option) => option.value === deliver)}
        />
    )
}

export default OrderSetStatusMultiple
