import React, { useEffect, useMemo, useRef } from 'react'
import { Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanies, inActiveCompany, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './CompanyDeleteConfirmation'
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
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/companies/edit/${row.id}`)
    }

    const onEditActivity = () => {
        dispatch(inActiveCompany({ company_id: row.id, is_deleted: `${!row.is_deleted}`}))

        if (row.id) {
            popNotification('изменено активность')
            dispatch(getCompanies({}))
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
        navigate(`/companies`)
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

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.salesCompanyList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesCompanyList.data.filterData
    )

    const loading = useSelector((state) => state.salesCompanyList.data.loading)

    const data = useSelector((state) => state.salesCompanyList.data.companyList)

    // console.log(data, 'data')
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
        () => ({ pageIndex,  pageSize, search }),
        [pageIndex, pageSize, search]
    )

    const fetchData = () => {
        dispatch(getCompanies({ offset: pageIndex,  search, limit: pageSize }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Название компании',
                accessorKey: 'name_ru',
                width: '250px',
            },
            {
                header: 'Регион',
                accessorKey: 'country_ru',
                width: '200px',
            },

            {
                header: 'Статус',
                accessorKey: 'is_deleted',
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
            <CompanyDeleteConfirmation />
        </>
    )
}

export default CompanyTable
