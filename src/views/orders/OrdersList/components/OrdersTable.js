import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDelivers,
    getOrders,
    setOrderItem,
    setTableData,
} from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { addRowItem, removeRowItem, setSelectedRows } from '../store/stateSlice'
import dayjs from 'dayjs'

const statusOfOrder = {
    1: 'Получен',
    7: 'На складе',
    2: 'Отгружен',
    3: 'Доставлен',
    4: 'Отменен',
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        dispatch(setOrderItem(row))
        navigate(`/orders/edit/${row.id}`)
    }

    return (
        <div className="flex justify-center text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                {row?.status !== 3 && <HiOutlinePencil />}
            </span>
        </div>
    )
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
            getOrders({
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
                limit: pageSize,
                search,
            })
        )
        dispatch(getDelivers({ role: 4 }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Изменить',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Статус заказа',
                // accessorKey: 'orderStatus',
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
                header: 'Номер заказа',
                accessorKey: 'order_number',
                width: '250px',
            },
            {
                header: 'Время заказа',
                // accessorKey: 'first_name',
                // width: '250px',
                cell: (props) => {
                    const { created_at } = props.row.original
                    return (
                        <span>
                            {dayjs(created_at).format('DD-MM-YYYY HH:mm')}
                        </span>
                    )
                },
            },
            {
                header: 'Имя клиента',
                // accessorKey: 'first_name',
                // width: '1px',
                cell: (props) => {
                    const { user_json } = props.row.original
                    return (
                        <span>
                            {user_json.first_name} {user_json.last_name}
                        </span>
                    )
                },
            },
            {
                header: 'Сумма заказа',
                // accessorKey: 'total_sum',
                width: '200px',
                cell: (props) => {
                    return (
                        <span>
                            {new Intl.NumberFormat().format(
                                props.row.original.total_sum
                            )}
                        </span>
                    )
                },
            },
            {
                header: 'Оплаченная сумма',
                // accessorKey: 'paid',
                cell: (props) => {
                    return (
                        <span>
                            {new Intl.NumberFormat().format(
                                props.row.original.paid
                            )}
                        </span>
                    )
                },
                width: '200px',
            },
            {
                header: 'Тип оплаты',
                accessorKey: 'payment_type_name.name_ru',
                // width: '200px',
            },
            {
                header: 'Имя доставщика',
                // accessorKey: 'deliver_user_json.last_name',
                // width: '500px',
                cell: (props) => {
                    const { deliver_user_json } = props.row.original
                    return (
                        <span>
                            {deliver_user_json?.first_name} {deliver_user_json?.last_name}
                        </span>
                    )
                },
            },

            {
                header: 'Комментарий',
                // accessorKey: 'comment',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.comment?.slice(0, 20)}
                            {row.comment?.length > 20 && '...'}
                        </span>
                    )
                },
            },

            {
                header: 'Локация',
                // accessorKey: 'location',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://www.google.com/maps?q=${row?.location.lat},${row?.location.long}`}
                        >
                            <span className="capitalize text-blue-500">
                                Локация
                            </span>
                        </a>
                    )
                },
            },
            {
                header: 'Статус оплаты',
                accessorKey: 'paid_status',
                width: '200px',
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
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                selectable
            />
        </>
    )
}

export default CompanyTable
