import React from 'react'
import { Select, Badge } from 'components/ui'
import { getDeliveryOrders, setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'

const { Control } = components

const options = [
    { value: '', label: 'Все', color: 'bg-gray-500' },
    { value: 1, label: 'Получен', color: 'bg-emerald-500' },
    { value: 7, label: 'На складе', color: 'bg-emerald-500' },
    { value: 2, label: 'Отгружен', color: 'bg-emerald-500' },
    { value: 3, label: 'Доставлен', color: 'bg-emerald-500' },
    { value: 4, label: 'Отменен', color: 'bg-red-500' },
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

const NotificationTableFIlter = () => {
    const dispatch = useDispatch()

    const { status } = useSelector(
        (state) => state.ordersStore.data.filterData
    )

    const onStatusFilterChange = (selected) => {
        dispatch(setFilterData({ status: selected?.value }))
        dispatch(getDeliveryOrders({status: selected?.value}))
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
            value={options.filter((option) => option.value === status)}
        />
    )
}

export default NotificationTableFIlter
