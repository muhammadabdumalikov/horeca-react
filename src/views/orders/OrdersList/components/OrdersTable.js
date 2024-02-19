import React, { useEffect, useMemo, useRef } from 'react'
import { Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {  getOrders, patchActivityEmployes, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { isActive } from 'utils/checkActive'

const inventoryStatusColor = {
    0: {
        label: 'Активный',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Неактивныйы',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

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
        navigate(`/employes/edit/${row.id}`)
    }

    const onEditActivity = () => {
        dispatch(
            patchActivityEmployes({
                user_id: row.id,
                is_deleted: `${!row.is_deleted}`,
                is_block: 'false',
            })
        )
        if (row.id) {
            popNotification('изменено активность')
            dispatch(getOrders({}))
        }
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Успешно ${keyword}`}
                type="success"
                duration={2500}
            >
                Успешно {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate(`/orders`)
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onEditActivity}
            >
                {row.is_deleted ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
        </div>
    )
}

const CompanyColumn = ({ row }) => {
    // const avatar = row.img ? (
    //     <Avatar src={row.img} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
    // )

    return (
        <div className="flex items-center">
            {/* {avatar} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.first_name} {row.last_name}
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
                width: '250px',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <CompanyColumn row={row} />
                // },
            },
            {
                header: 'Тип оплаты',
                accessorKey: 'payment_type',
                width: '200px',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <span className="capitalize">{row.phone}</span>
                // },
            },
            {
                header: 'Сумма',
                accessorKey: 'total_sum',
                width: '200px',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <span className="capitalize">{row.login}</span>
                // },
            },
            {
                header: 'Комментарий',
                accessorKey: 'comment',
                width: '200px',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <span className="capitalize">{row.login}</span>
                // },
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
                    return <Link to='x' ><span className="capitalize text-blue-500">Локация</span></Link>
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
