import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import {
    getFaktura,
    getFakturaByContagent,
    setFakturaArchive,
    setTableData,
} from '../store/dataSlice'
import { setSelectedRows, addRowItem, removeRowItem } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { Notification, toast } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { generateExcel } from './FakturaExelPattern'
import { isEmpty } from 'lodash'

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            {row.client_name}
        </span>
    )
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    const { pageIndex, pageSize } = useSelector(
        (state) => state.fakturaByContragentStore.data.tableData
    )
    const status = useSelector(
        (state) => state.fakturaByContragentStore.data.status
    )

    const onEditActivity = async () => {
        const success = await getFaktura({
            order_ids: [row.id],
        })

        if (!isEmpty(success)) {
            generateExcel(success)

            popNotification('Получено фактура')

            dispatch(
                getFakturaByContagent({
                    is_archived: status,
                    from_date: dayjs(startDate).format('YYYY-MM-DD'),
                    to_date: dayjs(endDate).format('YYYY-MM-DD'),
                    limit: pageSize,
                    offset:
                        (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
                })
            )
            dispatch(
                setFakturaArchive({
                    order_id: row.id,
                })
            )
            navigate('/contragent-faktura')
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
        navigate(`/contragent-faktura`)
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEditActivity}
            >
                <HiOutlineDocumentDownload size="28" />
            </span>
        </div>
    )
}

const FakturaTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, query, total } = useSelector(
        (state) => state.fakturaByContragentStore.data.tableData
    )
    const loading = useSelector(
        (state) => state.fakturaByContragentStore.data.loading
    )

    const data = useSelector(
        (state) => state.fakturaByContragentStore.data.fakturaByContragentList
    )

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    const status = useSelector(
        (state) => state.fakturaByContragentStore.data.status
    )
    // console.log(data, 'data')

    const fetchData = useCallback(() => {
        dispatch(
            getFakturaByContagent({
                is_archived: status,
                from_date: dayjs(startDate).format('YYYY-MM-DD'),
                to_date: dayjs(endDate).format('YYYY-MM-DD'),
                limit: pageSize,
                offset: (pageIndex - 1) * pageSize + (pageIndex === 1 ? 0 : 1),
            })
        )
    }, [dispatch, startDate, endDate, pageIndex, pageSize, status])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
        [pageIndex, pageSize, query, total]
    )

    const columns = useMemo(
        () => [
            {
                header: 'Заказ номера',
                accessorKey: 'order_number',
            },
            {
                header: 'Контрагент',
                accessorKey: 'client_name',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Тип оплаты',
                accessorKey: 'payment_type_name.name_ru',
            },
            {
                // new Intl.NumberFormat().format(price)
                header: 'Общая сумма заказа',
                accessorKey: 'total_sum',
                cell: (props) => (
                    <span>
                        {Intl.NumberFormat().format(
                            props.row.original.total_sum
                        )}
                    </span>
                ),
            },
            {
                header: 'Дата создания',
                accessorKey: 'created_at',
                cell: (props) => (
                    <span>
                        {dayjs(props.row.original.created_at).format(
                            'YYYY-MM-DD'
                        )}
                    </span>
                ),
            },
            {
                header: 'Aрхивирован',
                accessorKey: 'reported',
                cell: (props) => {
                    return (
                        <span>
                            {props.row.original.reported ? 'Да' : ' Нет'}
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

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                selectable
            />
            {!loading && isEmpty(data) && (
                <div className=" flex flex-col items-center justify-center">
                    {/* <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                        // width="100vh"
                    /> */}
                    <h3 className="mt-8">Фактура по контрагентам не найден!</h3>
                </div>
            )}
        </>
    )
}

export default FakturaTable
