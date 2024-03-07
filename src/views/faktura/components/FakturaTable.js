import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import { setSelectedRows, addRowItem, removeRowItem } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            {row.first_name || row.legal_name} {row.last_name}
        </span>
    )
}

const FakturaTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.fakturaStore.data.tableData
    )
    const loading = useSelector((state) => state.fakturaStore.data.loading)

    const data = useSelector((state) => state.fakturaStore.data.orderList)

    console.log(data, 'data')

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, query }))
    }, [dispatch, pageIndex, pageSize, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
        [pageIndex, pageSize, query, total]
    )

    const columns = useMemo(
        () => [
            {
                header: 'Контрагент',
                accessorKey: 'first_name',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            columns={columns}
            data={data}
            loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
            selectable
        />
    )
}

export default FakturaTable
