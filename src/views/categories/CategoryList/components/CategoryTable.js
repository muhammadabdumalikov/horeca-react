import React, { useEffect, useMemo, useRef } from 'react'
// import { Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategories,
    inActiveCategory,
    setTableData,
} from '../store/dataSlice'
// import { setSelectedCompany } from '../store/stateSlice'
// import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './CategoryDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { isActive } from 'utils/checkActive'
import { Badge, Notification, toast } from 'components/ui'

const inventoryStatusColor = {
    0: {
        label: 'Активный',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
    1: {
        label: 'Неактивный',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }) => {
    // const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { pageSize, pageIndex, search } = useSelector(
        (state) => state.categoryList.data.tableData
    )

    const onEdit = () => {
        navigate(`/categories/edit/${row.id}`)
    }
    const onEditActivity = () => {
        dispatch(
            inActiveCategory({
                category_id: row.id,
                is_deleted: `${!row?.is_deleted}`,
            })
        )

        if( row.id ){
            popNotification('изменено активность')
            dispatch(getCategories({limit: pageSize, offset: (pageIndex-1) * pageSize + (pageIndex == 1?0:1), search})) 
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
        navigate(`/categories`)
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
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEditActivity}
            >
                {row.is_deleted ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
        </div>
    )
}

const CompanyColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            {/* {avatar} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name_ru}</span>
        </div>
    )
}

const CategoryTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageSize, pageIndex, search, total } = useSelector(
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
    }, [pageSize, pageIndex])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageSize, pageIndex, search, total }),
        [pageSize, pageIndex, search, total]
    )

    const fetchData = () => {
        dispatch(getCategories({ limit: pageSize, offset: (pageIndex-1) * pageSize + (pageIndex == 1?0:1), search }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Категория товара',
                accessorKey: 'name_ru',
                width: '300px',
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
                },
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

export default CategoryTable
