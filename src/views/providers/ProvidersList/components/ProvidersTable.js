import React, { useEffect, useMemo, useRef } from 'react'
import { Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getEmployes,
    patchActivityEmployes,
    setTableData,
} from '../store/dataSlice'
import { useNavigate } from 'react-router-dom'
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

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            dispatch(getEmployes({ role: 5 }))
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
        navigate(`/providers`)
    }

    return (
        <div className="flex justify-end text-lg">
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
        (state) => state.providersStore.data.tableData
    )

    const filterData = useSelector(
        (state) => state.providersStore.data.filterData
    )

    const loading = useSelector((state) => state.providersStore.data.loading)

    const data = useSelector((state) => state.providersStore.data.employesList)

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
            getEmployes({
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
                limit: pageSize,
                search,
                role: 5,
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
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.legal_name}</span>
                },
            },
            {
                header: 'Контакт',
                accessorKey: 'phone',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span>+{row.phone}</span>
                },
            },
          
            {
                header: 'Aдрес',
                accessorKey: 'adress',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.address}</span>
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
                header: 'Добавочное имя',
                accessorKey: 'additional_name',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.additional_name}</span>
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
