import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import { setSelectedRows, addRowItem, removeRowItem } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    // const navigate = useNavigate()

    // const onView = useCallback(() => {
    //     navigate(`/app/sales/order-details/${row.id}`)
    // }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            {row.first_name} {row.last_name}
        </span>
    )
}

// const ActionColumn = ({ row }) => {
//     const dispatch = useDispatch()
//     const { textTheme } = useThemeClass()
//     const navigate = useNavigate()

//     const onDelete = () => {
//         dispatch(setDeleteMode('single'))
//         dispatch(setSelectedRow([row.id]))
//     }

//     const onView = useCallback(() => {
//         navigate(`/app/sales/order-details/${row.id}`)
//     }, [navigate, row])

//     return (
//         <div className="flex justify-end text-lg">
//             <Tooltip title="View">
//                 <span
//                     className={`cursor-pointer p-2 hover:${textTheme}`}
//                     onClick={onView}
//                 >
//                     <HiOutlineEye />
//                 </span>
//             </Tooltip>
//             <Tooltip title="Delete">
//                 <span
//                     className="cursor-pointer p-2 hover:text-red-500"
//                     onClick={onDelete}
//                 >
//                     <HiOutlineTrash />
//                 </span>
//             </Tooltip>
//         </div>
//     )
// }

const OrdersTable = () => {
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
                accessorKey: 'id',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            // {
            //     header: 'Date',
            //     accessorKey: 'date',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
            //         )
            //     },
            // },
            // {
            //     header: 'Customer',
            //     accessorKey: 'customer',
            // },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge
            //                     className={orderStatusColor[status].dotClass}
            //                 />
            //                 <span
            //                     className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
            //                 >
            //                     {orderStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Payment Method',
            //     accessorKey: 'paymentMehod',
            //     cell: (props) => {
            //         const { paymentMehod, paymentIdendifier } =
            //             props.row.original
            //         return (
            //             <span className="flex items-center">
            //                 <PaymentMethodImage
            //                     className="max-h-[20px]"
            //                     paymentMehod={paymentMehod}
            //                 />
            //                 <span className="ltr:ml-2 rtl:mr-2">
            //                     {paymentIdendifier}
            //                 </span>
            //             </span>
            //         )
            //     },
            // },
            // {
            //     header: 'Total',
            //     accessorKey: 'totalAmount',
            //     cell: (props) => {
            //         const { totalAmount } = props.row.original
            //         return (
            //             <NumberFormat
            //                 displayType="text"
            //                 value={(
            //                     Math.round(totalAmount * 100) / 100
            //                 ).toFixed(2)}
            //                 prefix={'$'}
            //                 thousandSeparator={true}
            //             />
            //         )
            //     },
            // },
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
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

export default OrdersTable
