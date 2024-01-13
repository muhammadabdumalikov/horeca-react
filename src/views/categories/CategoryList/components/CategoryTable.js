import React, { useEffect, useMemo, useRef } from 'react'
// import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, setTableData } from '../store/dataSlice'
// import { setSelectedCompany } from '../store/stateSlice'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './CategoryDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { isActive } from 'utils/checkActive'
import { Badge } from 'components/ui'

const inventoryStatusColor = {

    1: {
        label: 'Активный',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
    0: {
        label: 'Неактивный',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }) => {
    // const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/categories/edit/${row.id}`)
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

const CompanyColumn = ({ row }) => {

    return (
        <div className="flex items-center">
            {/* {avatar} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.ru_name}</span>
        </div>
    )
}

const CategoryTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { page, pageSize, sort, search, total } = useSelector(
        (state) => state.categoryList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.categoryList.data.filterData
    )

    const loading = useSelector((state) => state.categoryList.data.loading)

    const data = useSelector((state) => state.categoryList.data.categoryList)

    // console.log(data, 'data')

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ page, pageSize, search, total, }),
        [page, pageSize, search, total]
    )

    const fetchData = () => {
        dispatch(getCategories({ search, page, pageSize }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Категория товара',
                accessorKey: 'ru_name',
                width: "300px",
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
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
                                    inventoryStatusColor[isActive(in_active)].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[isActive(in_active)].textClass}`}
                            >
                                {inventoryStatusColor[isActive(in_active)].label}
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
        newTableData.page = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.page = 1
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
            />
            <CompanyDeleteConfirmation />
        </>
    )
}

export default CategoryTable
