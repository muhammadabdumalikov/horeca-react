import React, { useEffect, useMemo, useRef } from 'react'
import { Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import {
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlinePencil,
    HiOutlineTrash,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAgents,
    getCompanies,
    inActiveAgent,
    setTableData,
} from '../store/dataSlice'
import { setSelectedCompany } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './AgentsDeleteConfirmation'
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
        label: 'Неактивныйы',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/agents/edit/${row.id}`)
    }

    const onEditActivity = () => {
        dispatch(inActiveAgent({ id: row.id }))

        if (row.id) {
            popNotification('изменено активность')
            dispatch(getAgents({}))
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
        navigate(`/agents`)
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
                {row.in_active ? <HiOutlineEye /> : <HiOutlineEyeOff />}
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
                {row.fullname}
            </span>
        </div>
    )
}

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search, total } = useSelector(
        (state) => state.agentsList.data.tableData
    )

    const filterData = useSelector((state) => state.agentsList.data.filterData)

    const loading = useSelector((state) => state.agentsList.data.loading)

    const data = useSelector((state) => state.agentsList.data.agentsList.list)

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
        dispatch(getAgents({ pageIndex, pageSize, search }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'И.Ф.О.',
                accessorKey: 'fullname',
                width: '250px',
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
                },
            },
            {
                header: 'Контакт',
                accessorKey: 'contact',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.contact}</span>
                },
            },
            {
                header: 'Логин',
                accessorKey: 'username',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.username}</span>
                },
            },
            // {
            //     header: 'Пароль',
            //     accessorKey: 'password',
            //     width: '200px',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span className="capitalize">{row.password}</span>
            //     },
            // },
            {
                header: 'Регион',
                accessorKey: 'region_id',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.ru_district}</span>
                },
            },
            {
                header: 'Статус',
                accessorKey: 'in_active',
                width: '200px',
                cell: (props) => {
                    const { in_active } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[isActive(in_active)]
                                        .dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${
                                    inventoryStatusColor[isActive(in_active)]
                                        .textClass
                                }`}
                            >
                                {
                                    inventoryStatusColor[isActive(in_active)]
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
            <CompanyDeleteConfirmation />
        </>
    )
}

export default CompanyTable
