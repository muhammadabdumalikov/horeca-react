import React, { useEffect, useMemo, useRef } from 'react'
import { Badge} from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDeliveryOrders,
    setTableData,
} from '../store/dataSlice'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { isActive } from 'utils/checkActive'

const inventoryStatusColor = {
    0: {
        label: 'Активный',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Неактивный',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const statusOfOrder = {
    1: 'Принял',
    2: 'Доставка',
    3: 'Доставленный',
    4: 'Отменено',
}

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search, total } = useSelector(
        (state) => state.ordersStore.data.tableData
    )

    const filterData = useSelector((state) => state.ordersStore.data.filterData)

    const loading = useSelector((state) => state.ordersStore.data.loading)

    const data = useSelector((state) => state.ordersStore.data.ordersList)

    // console.log('data', data)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, search, total }),
        [pageIndex, pageSize, search, total]
    )

    const fetchData = () => {
        dispatch(
            getDeliveryOrders({
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
                limit: pageSize,
            })
        )
    }

    const columns = useMemo(
        () => [
            {
                header: 'Номер заказа',
                accessorKey: 'order_number',
                width: '250px',
            },
            {
                header: 'Тип оплаты',
                accessorKey: 'payment_type',
                width: '200px',
            },
            {
                header: 'Сумма',
                accessorKey: 'total_sum',
                width: '200px',
            },
            {
                header: 'Комментарий',
                accessorKey: 'comment',
                width: '200px',
            },
            {
                header: 'Статус заказа',
                accessorKey: 'orderStatus',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {statusOfOrder[row?.status]}
                        </span>
                    )
                },
            },
            {
                header: 'Локация',
                accessorKey: 'location',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <a target='_blank' rel="noreferrer" href={`https://www.google.com/maps?q=${row?.location.lat},${row?.location.long}`} ><span className="capitalize text-blue-500">Локация</span></a>
                },
            },
            {
                header: 'Статус',
                accessorKey: 'in_active',
                width: '200px',
                cell: (props) => {
                    const { is_deleted } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[isActive(is_deleted)]
                                        .dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${
                                    inventoryStatusColor[isActive(is_deleted)]
                                        .textClass
                                }`}
                            >
                                {
                                    inventoryStatusColor[isActive(is_deleted)]
                                        .label
                                }
                            </span>
                        </div>
                    )
                },
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

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
        </>
    )
}

export default CompanyTable
