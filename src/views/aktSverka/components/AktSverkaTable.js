import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getFaktura, setTableData } from '../store/dataSlice'
import { setSelectedRows, addRowItem, removeRowItem } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { isEmpty } from 'lodash'
import { generateExcel } from './AktSverkaExelPattern'
import { Notification, toast } from 'components/ui'
import dayjs from 'dayjs'

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            {row.first_name || row.legal_name} {row.last_name}
        </span>
    )
}

const ActionColumn = ({ row }) => {
    console.log(row, 'row')
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const startDate = useSelector((state) => state.aktSverka.state.startDate)
    const endDate = useSelector((state) => state.aktSverka.state.endDate)

    const onEditActivity = async () => {
        const success = await getFaktura({
            user_id: row.id,
            from_date: dayjs(startDate).format('YYYY-MM-DD'),
            to_date: dayjs(endDate).format('YYYY-MM-DD'),
        })

        if (!isEmpty(success)) {
            generateExcel(success)

            popNotification(' Успешно получено акт сверка', 'success')
            dispatch(getCustomers({ role: 3 }))
        } else {
            popNotification('Акт сверка пусто', 'danger')
        }
    }

    const popNotification = (keyword, type) => {
        toast.push(
            <Notification title={`${keyword}`} type={type} duration={2500}>
                {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate(`/akt-sverka`)
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

    const { pageIndex, pageSize, total } = useSelector(
        (state) => state.aktSverka.data.tableData
    )
    const loading = useSelector((state) => state.aktSverka.data.loading)

    const data = useSelector((state) => state.aktSverka.data.orderList)

    // console.log(data, 'data')

    const fetchData = useCallback(() => {
        dispatch(getCustomers({ limit: pageSize, offset: (pageIndex-1) * pageSize + (pageIndex === 1 && 0), role: 3 }))
    }, [dispatch, pageIndex, pageSize])

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
        () => ({ pageIndex, pageSize, total }),
        [pageIndex, pageSize, total]
    )

    const columns = useMemo(
        () => [
            {
                header: 'Контрагент',
                accessorKey: 'first_name',
                width: '200px',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Юр. имя',
                width: '200px',
                accessorKey: 'legal_name',
            },
            {
                header: 'Добавочное имя',
                width: '200px',
                accessorKey: 'additional_name',
            },
            {
                header: 'Контакт',
                accessorKey: 'phone',
                cell: (props) => {
                    const row = props.row.original
                    return <span>+{row.phone}</span>
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
            // selectable
        />
    )
}

export default FakturaTable
