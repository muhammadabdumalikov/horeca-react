import React, { useEffect, useCallback, useMemo } from 'react'
import { Avatar, Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, setTableData } from '../store/dataSlice'
import { setSelectedCustomer, setDrawerOpen } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { isActive } from 'utils/checkActive'

const inventoryStatusColor = {
    1: {
        label: 'Активный',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    0: {
        label: 'Неактивный',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    const onEditActivity = () => {
        // dispatch(inActiveProdct({ id: row.id }))

        if (row.id) {
            popNotification('изменено активность')
            // dispatch(getProducts({}))
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
        // navigate(`/products`)
    }

    return (
        <div className="flex justify-end text-lg">
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/users/${row.id}`}
            >
                {/* <HiOutlinePencil /> */}
            </Link>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onEditActivity}
            >
                {row.in_active ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </span>
        </div>
    )
}

// return (
//     // <div className="flex justify-end text-lg">
//     //     <span
//     //         className={`cursor-pointer p-2 hover:${textTheme}`}
//     //         onClick={onEdit}
//     //     >
//     //         <HiOutlineEye />
//     //     </span>
//     // </div>
//     <Link
//         className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
//         to={`/users/${row.id}`}
//     >
//         {row.name}
//     </Link>
// )

// const NameColumn = ({ row }) => {
//     const { textTheme } = useThemeClass()

//     return (
//         <div className="flex items-center">
//             <Link
//                 className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
//                 to={`/user?id=${row.id}`}
//             >
//                 {row.name}
//             </Link>
//         </div>
//     )
// }

const columns = [
    {
        header: 'Имя',
        accessorKey: 'fullname',
        // cell: (props) => {
        //     const row = props.row.original
        //     return <NameColumn row={row} />
        // },
    },
    {
        header: 'Юр. имя',
        accessorKey: 'legal_name',
    },
    {
        header: 'Адресс',
        accessorKey: 'address',
    },
    {
        header: 'Контакт',
        accessorKey: 'contact',
    },
    {
        header: 'Статус',
        accessorKey: 'status',
        width: '250px',
        cell: (props) => {
            const { in_active } = props.row.original
            return (
                <div className="flex items-center gap-2">
                    <Badge
                        className={
                            inventoryStatusColor[isActive(in_active)].dotClass
                        }
                    />
                    <span
                        className={`capitalize font-semibold ${
                            inventoryStatusColor[isActive(in_active)].textClass
                        }`}
                    >
                        {inventoryStatusColor[isActive(in_active)].label}
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Организация',
        accessorKey: 'organization',
    },
    {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]

const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const loading = useSelector((state) => state.crmCustomers.data.loading)
    const { status } = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageIndex, pageSize, search, total } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )
    
    const fetchData = useCallback(() => {
        dispatch(getCustomers({ pageIndex, pageSize, search, active: status }))
    }, [pageIndex, pageSize, search, status, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, status])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, search, total }),
        [pageIndex, pageSize, search, total]
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
                columns={columns}
                data={data.list}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{ pageIndex, pageSize, search, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
            />
        </>
    )
}

export default Customers
