import React from 'react'
import { Select, Badge } from 'components/ui'
import { getFakturaByContagent, setStatus } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import dayjs from 'dayjs'

const { Control } = components

const options = [
    { value: 'false', label: 'Активные', color: 'bg-emerald-500' },
    { value: 'true', label: 'Неактивные', color: 'bg-red-500' },
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

const FakturaTableFilter = () => {
    const dispatch = useDispatch()

    const status = useSelector(
        (state) => state.fakturaByContragentStore.data.status
    )

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    // console.log(endDate, 'endDateß')

    const onStatusFilterChange = (selected) => {
        dispatch(setStatus(selected?.value))
        dispatch(
            getFakturaByContagent({
                is_archived: selected?.value,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
            })
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
            value={options.filter((option) => option.value === status)}
        />
    )
}

export default FakturaTableFilter
