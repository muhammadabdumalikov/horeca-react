import React, { useEffect, useMemo, useRef } from 'react'
import { Avatar } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByOrderId, setTableData } from '../store/dataSlice'
import { setSelectedProduct, toggleEditConfirmation } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useParams } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import ProductEditConfirmation from './ProductEditConfirmation'
import ProductStepConfirmation from './ProductStepConfirmation'
import ProductEditPaymentConfirmation from './ProductEditPaymentConfirmation'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onEdit = () => {
        dispatch(toggleEditConfirmation(true))
        dispatch(setSelectedProduct(row))
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row))
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

const ProductColumn = ({ row }) => {
    const avatar = row.image ? (
        <Avatar src={row.image} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row?.name_ru}
            </span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { id } = useParams()

    const { pageIndex, pageSize } = useSelector(
        (state) => state.xordersStore.data.tableData
    )

    const filterData = useSelector(
        (state) => state.xordersStore.data.filterData
    )

    const loading = useSelector((state) => state.xordersStore.data.loading)

    const data = useSelector((state) => state.xordersStore.data.productList)

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
        () => ({
            offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
            limit: pageSize,
        }),
        [pageIndex, pageSize]
    )

    const fetchData = () => {
        dispatch(getProductsByOrderId({ id: id }))
    }

    const columns = useMemo(
        () => [
            {
                header: 'Название продукта',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            // {
            //     header: 'Тип оплаты',
            //     accessorKey: 'payment_type_name',
            //     width: '200px',
            //     cell: (props) => {
            //         const { payment_type_name } = props.row.original
            //         console.log
            //         return <span>{payment_type_name?.name_ru}</span>
            //     },
            // },
            {
                header: 'Количество',
                accessorKey: 'quantity',
            },
            {
                header: 'Цена за шт.',
                accessorKey: 'price_for_item',
                cell: (props) => {
                    const { price_for_item } = props.row.original
                    return (
                        <span>
                            {new Intl.NumberFormat().format(price_for_item)}
                        </span>
                    )
                },
            },
            {
                header: 'Общая сумма',
                cell: (props) => {
                    const { price_for_item, quantity } = props.row.original
                    return (
                        <span>
                            {new Intl.NumberFormat().format(
                                price_for_item * quantity
                            )}
                        </span>
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
                data={data?.order_items}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
            <ProductEditConfirmation />
            <ProductStepConfirmation />
            <ProductEditPaymentConfirmation />
        </>
    )
}

export default ProductTable
