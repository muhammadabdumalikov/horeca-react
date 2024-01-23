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
        navigate(`/products/edit/${row.id}`)
    }

    const onEditActivity = () => {
        dispatch(inActiveProdct({ id: row.id }))

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
                {row.in_active ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </span>
        </div>
    )
}

const ProductColumn = ({ row }) => {
    const avatar = row.image ? (
        <Avatar src={`https://horecaapi.uz/${row.image}`} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.ru_name}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, search, total } = useSelector(
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
        () => ({ pageIndex, pageSize, search, total }),
        [pageIndex, pageSize, search, total]
    )

    const fetchData = () => {
        dispatch(getProducts({search}))
    }

    // console.log(search, 'search')

    const columns = useMemo(
        () => [
            {
                header: 'Название товара',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            // {
            //     header: 'Категория',
            //     accessorKey: 'category',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span className="capitalize">{row.category}</span>
            //     },
            // },
            // {
            //     header: 'Остаток',
            //     accessorKey: 'stock',
            //     sortable: true,
            // },
            {
                header: 'Статус',
                accessorKey: 'status',
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
                header: 'Цена за шт.',
                accessorKey: 'dona_price',
                cell: (props) => {
                    const { discount_price } = props.row.original
                    return <span>{discount_price}</span>
                },
            },
            {
                header: 'Цена за блок',
                accessorKey: 'blok_price',
                cell: (props) => {
                    const { block_price } = props.row.original
                    return <span>{block_price}</span>
                },
            },
            {
                header: 'Цена в акции',
                accessorKey: 'disc_price',
                cell: (props) => {
                    const { discount_price } = props.row.original
                    return <span>{discount_price}</span>
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
            {/* <ProductDeleteConfirmation /> */}
        </>
    )
}

export default ProductTable
