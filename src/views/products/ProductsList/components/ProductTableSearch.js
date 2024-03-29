import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'

const ProductTableSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        const newTableData = cloneDeep({pageIndex, pageSize, search})
        newTableData.search = val
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        const { pageIndex, pageSize, search } = data
        // dispatch(setTableData(data))

        dispatch(getProducts({search: search, limit: pageSize, offset: (pageIndex-1) * pageSize + (pageIndex === 1 && 0)}))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search product"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default ProductTableSearch
