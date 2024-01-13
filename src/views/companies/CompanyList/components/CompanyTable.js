import React, { useEffect, useMemo, useRef } from 'react'
import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanies, setTableData } from '../store/dataSlice'
import { setSelectedCompany } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './CompanyDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
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
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/companies/edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedCompany(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            {/* <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span> */}
        </div>
    )
}

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.salesCompanyList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesCompanyList.data.filterData
    )

    const loading = useSelector((state) => state.salesCompanyList.data.loading)

    const data = useSelector((state) => state.salesCompanyList.data.companyList)

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
        () => ({ pageIndex, pageSize, query, total }),
        [pageIndex, pageSize, query, total]
    )

    const fetchData = () => {
        dispatch(getCompanies({pageIndex, query}))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Название компании',
                accessorKey: 'ru_name',
                width: '250px',
                cell: (props) => {
                    const row = props.row.original.ru_name
                    return (
                        <div className="flex items-center">
                            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                                {row}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Регион',
                accessorKey: 'region',
                width: '200px',
                cell: (props) => {
                    const row = props.row.original.ru_country
                    return (
                        <div className="flex items-center">
                            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                                {row}
                            </span>
                        </div>
                    )
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

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data.list}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CompanyDeleteConfirmation />
        </>
    )
}

export default CompanyTable
