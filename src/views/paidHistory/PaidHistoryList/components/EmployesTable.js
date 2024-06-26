import React, { useEffect, useMemo, useRef } from 'react'
import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
// import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentHistory, setTableData } from '../store/dataSlice'
// import useThemeClass from 'utils/hooks/useThemeClass'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { isActive } from 'utils/checkActive'
import dayjs from 'dayjs'

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

// const ActionColumn = ({ row }) => {
//     const dispatch = useDispatch()
//     const { textTheme } = useThemeClass()
//     const navigate = useNavigate()

//     const onEdit = () => {
//         navigate(`/employes/edit/${row.id}`)
//     }

//     // const onEditActivity = () => {
//     //     dispatch(
//     //         patchActivityEmployes({
//     //             user_id: row.id,
//     //             is_deleted: `${!row.is_deleted}`,
//     //             is_block: 'false',
//     //         })
//     //     )
//     //     if (row.id) {
//     //         popNotification('изменено активность')
//     //         dispatch(getDebtUsers({}))
//     //     }
//     // }

//     const popNotification = (keyword) => {
//         toast.push(
//             <Notification
//                 title={`Успешно ${keyword}`}
//                 type="success"
//                 duration={2500}
//             >
//                 Успешно {keyword}
//             </Notification>,
//             {
//                 placement: 'top-center',
//             }
//         )
//         navigate(`/employes`)
//     }

//     return (
//         <div className="flex justify-end text-lg">
//             <span
//                 className={`cursor-pointer p-2 hover:${textTheme}`}
//                 onClick={onEdit}
//             >
//                 <HiOutlinePencil />
//             </span>
//             <span
//                 className="cursor-pointer p-2 hover:text-red-500"
//                 onClick={onEditActivity}
//             >
//                 {row.is_deleted ? <HiOutlineEyeOff /> : <HiOutlineEye />}
//             </span>
//         </div>
//     )
// }

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
                {row.user_json?.first_name} {row.user_json?.last_name}
            </span>
        </div>
    )
}

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search, total } = useSelector(
        (state) => state.paidStore.data.tableData
    )

    const filterData = useSelector((state) => state.paidStore.data.filterData)

    const loading = useSelector((state) => state.paidStore.data.loading)

    const data = useSelector((state) => state.paidStore.data.debtUsersList)

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
            getPaymentHistory({
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
                limit: pageSize,
                search,
            })
        )
    }

    const columns = useMemo(
        () => [
            {
                header: 'И.Ф.О.',
                accessorKey: 'first_name',
                width: '250px',
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
                },
            },
            {
                header: 'Юр. имя',
                accessorKey: 'legal_name',
                width: '250px',
            },
            {
                header: 'Оплачено',
                accessorKey: 'phone',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.created_at).format('DD-MM-YYYY')}
                        </span>
                    )
                },
            },
            {
                header: 'Контакт',
                // accessorKey: '998916084443',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.user_json?.phone ? '+' : '-'}
                            {row.user_json?.phone}
                        </span>
                    )
                },
            },
            {
                header: 'Оплачено',
                accessorKey: 'paid',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">
                            {Intl.NumberFormat().format(row.value)}
                        </span>
                    )
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
