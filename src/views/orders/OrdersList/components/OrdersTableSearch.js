import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { getOrders } from '../store/dataSlice'

const OrdersTableSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector((state) => state.ordersStore.data.tableData)

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)
        newTableData.order_number = val
        // newTableData.limit = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        const { order_number } = data

        // dispatch(
        //     setTableData({
        //         order_number: data?.order_number,
        //         offset:
        //             (data?.pageIndex - 1) * data?.pageSize +
        //             (data?.pageIndex === 1 && 0),
        //         limit: data?.pageSize,
        //     })
        // )
        // dispatch(
        //     setTableData(data)
        // )
        dispatch(getOrders({ order_number }))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Номер заказа"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default OrdersTableSearch
