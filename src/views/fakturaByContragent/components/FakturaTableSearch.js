import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getFakturaByContagent, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

const FakturaSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.fakturaByContragentStore.data.tableData
    )
    const status = useSelector(
        (state) => state.fakturaByContragentStore.data.status
    )

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        // newTableData.is_deleted = val
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    console.log(tableData, '')

    const fetchData = (data) => {
        dispatch(setTableData({ ...data }))
        dispatch(
            getFakturaByContagent({
                is_archived: status,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
                search: data?.search
            })
        )
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            style={{ width: '150px' }}
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default FakturaSearch
