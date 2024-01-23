import React, { forwardRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import { getCustomers, setTableData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

const CustomerTableSearch = forwardRef((props, ref) => {
    const { onInputChange } = props

    const dispatch = useDispatch()

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)
    const { status } = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const debounceFn = debounce(handleDebounceFn, 500)
    function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData({ ...data, active: status }))
        // dispatch(getCustomers({...data, ...filterData}))
    }

    // function handleDebounceFn(val) {
    //     onInputChange?.(val)
    // }

    const handleInputChange = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={ref}
            className="max-w-md md:w-52 mb-4"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={handleInputChange}
        />
    )
})

export default CustomerTableSearch
