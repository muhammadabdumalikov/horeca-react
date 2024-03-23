import React from 'react'
import { Select, Badge } from 'components/ui'
import { getOrders, setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'

const { Control } = components

const options = [
    { value: '', label: 'Все', color: 'bg-gray-500' },
    { value: 3, label: 'Оплачен', color: 'bg-emerald-500' },
    { value: 1, label: 'Неоплачен', color: 'bg-emerald-500' },
    { value: 2, label: 'Частично оплачен', color: 'bg-emerald-500' },
]

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
                <Badge innerClass={data.color} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    innerClass={selected.color}
                />
            )}
            {children}
        </Control>
    )
}

const OrdersPaymentTypeFilter = () => {
    const dispatch = useDispatch()

    const { paidStatus } = useSelector(
        (state) => state.ordersStore.data.filterData
    )

    const onStatusFilterChange = (selected) => {
        dispatch(setFilterData({ paidStatus: selected?.value }))
        dispatch(
            getOrders(selected?.value ? { paid_status: selected?.value } : {})
        )
    }

    return (
        <Select
            options={options}
            size="sm"
            className="ml-4 min-w-[130px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={options.filter((option) => option.value === paidStatus)}
        />
    )
}

export default OrdersPaymentTypeFilter
