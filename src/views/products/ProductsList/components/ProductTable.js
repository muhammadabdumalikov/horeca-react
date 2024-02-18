import React, { useEffect, useMemo, useRef } from 'react'
import { Avatar, Badge, Notification, toast } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, inActiveProdct, setTableData } from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
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
        navigate(`/products/edit/${row.id}`)
    }

    const onEditActivity = () => {
        dispatch(inActiveProdct({ product_id: row.id, is_deleted: `${!row.is_deleted}`}))
        if (row.id) {
            popNotification('изменено активность')
            dispatch(getProducts({}))
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
        navigate(`/products`)
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
                {row.is_deleted ? <HiOutlineEyeOff /> : <HiOutlineEye /> }
            </span>
        </div>
    )
}

const ProductColumn = ({ row }) => {
    const avatar = row.image ? (
        // <Avatar src={`https://horecaapi.uz/${row.image}`} />
        <Avatar src={`${row.image}`} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name_ru}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useSelector((state) => state.salesProductList.data.loading)

    const data = useSelector((state) => state.salesProductList.data.productList)

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
        () => ({ pageIndex, pageSize, search }),
        [pageIndex, pageSize, search]
    )

    const fetchData = () => {
        dispatch(getProducts({search, limit: pageSize, offset: (pageIndex-1) * pageSize + (pageIndex === 1?0:1)}))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Название товара',
                accessorKey: 'name_ru',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Статус',
                accessorKey: 'status',
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
                header: 'Цена за шт.',
                accessorKey: 'count_price',
            },
            {
                header: 'Цена за блок',
                accessorKey: 'block_price'
            },
            {
                header: 'Цена в акции',
                accessorKey: 'discount_price'
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
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            {/* <ProductDeleteConfirmation /> */}
        </>
    )
}

export default ProductTable
