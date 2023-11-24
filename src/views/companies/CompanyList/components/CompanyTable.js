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

const inventoryStatusColor = {
    0: {
        label: 'В наличии',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Ограниченное',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Распродано',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const data = [
    {
        id: 1,
        uz_name: 'Coca Cola',
        ru_name: 'Coca Cola',
        region: 'Tashkent',
        in_active: 0,
    },
    {
        id: 2,
        uz_name: 'Nestle',
        ru_name: 'Nestle',
        region: 'Tashkent',
        in_active: 1,
    },
]

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
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
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
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.ru_name}</span>
        </div>
    )
}

const CompanyTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesCompanyList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesCompanyList.data.filterData
    )

    // const loading = useSelector((state) => state.salesCompanyList.data.loading)

    // const data = useSelector((state) => state.salesProductList.data.productList)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getCompanies({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Название компании',
                accessorKey: 'ru_name',
                width: "250px",
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
                },
            },
            {
                header: 'Регион',
                accessorKey: 'region',
                width: "200px",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.region}</span>
                },
            },

            {
                header: 'Статус',
                accessorKey: 'in_active',
                width: "200px",
                cell: (props) => {
                    const { in_active } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[in_active].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[in_active].textClass}`}
                            >
                                {inventoryStatusColor[in_active].label}
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
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                // loading={loading}
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
