import React, { useEffect, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {  getOrders, setOrderItem, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import {  useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'


const statusOfOrder = {
    1: "Принял",
    2: "Доставка",
    3: "Доставленный",
    4: "Отменено",
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
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
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

    const filterData = useSelector(
        (state) => state.ordersStore.data.filterData
    )

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
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
                limit: pageSize,
                search,
            })
        )
    }

    const columns = useMemo(
        () => [
            {
                header: 'Номер заказа',
                accessorKey: 'order_number',
                width: '250px'
            },
            {
                header: 'Тип оплаты',
                accessorKey: 'payment_type_name.name_ru',
                width: '200px'
            },
            {
                header: 'Статус оплаты',
                accessorKey: 'paid_status',
                width: '200px'
            },
            {
                header: 'Оплаченная сумма',
                accessorKey: 'paid',
                width: '200px'
            },
            {
                header: 'Сумма заказа',
                accessorKey: 'total_sum',
                width: '200px'
            },
            {
                header: 'Комментарий',
                accessorKey: 'comment',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.comment?.slice(0, 20)}{row.comment?.length > 20 && '...'}</span>
                },
            },
            {
                header: 'Статус заказа',
                accessorKey: 'orderStatus',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{statusOfOrder[row?.status]}</span>
                },
            },
            {
                header: 'Локация',
                accessorKey: 'location',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <a target='_blank' rel="noreferrer" href={`https://yandex.com/maps/?ll=${row?.location.long},${row?.location.lat}&z=14`} ><span className="capitalize text-blue-500">Локация</span></a>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
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
