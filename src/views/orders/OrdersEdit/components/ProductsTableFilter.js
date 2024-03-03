import React, { useEffect } from 'react'
import { Select } from 'components/ui'
// import { getNotifications, setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { HiCheck } from 'react-icons/hi'
import { getDelivers, setFilterData } from '../store/dataSlice'

const ProductsTableFilter = () => {
    const dispatch = useDispatch()

    const { status } = useSelector((state) => state.ordersStore.data.filterData)
    const deliversList = useSelector(
        (state) => state.ordersStore.data.deliversList
    )

    console.log(deliversList, 'deliversList')

    const sortOptions = (data) => {
        return data.map((item) => ({
            label: `${item.first_name} ${item.last_name}`,
            value: item.id,
        }))
    }

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

    const onStatusFilterChange = (selected) => {
        dispatch(setFilterData({ status: selected?.value }))
        // dispatch(getNotifications({is_deleted: selected?.value}))
    }

    useEffect(() => {
        dispatch(getDelivers({}))
    }, [])

    return (
        <Select
            options={sortOptions(deliversList)}
            size="sm"
            className="ml-4 min-w-[130px]"
            onChange={onStatusFilterChange}
            components={{
                Option: CustomSelectOption,
            }}
            value={sortOptions(deliversList).filter(
                (option) => option.value === status
            )}
        />
    )
}

export default ProductsTableFilter
