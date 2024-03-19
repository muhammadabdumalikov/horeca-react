import React from 'react'
import { Button, Notification, toast } from 'components/ui'
import { HiOutlineDownload } from 'react-icons/hi'
import FakturaTableSearch from './FakturaTableSearch'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedRow } from '../store/stateSlice'
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
import { setStartDate, setEndDate } from '../store/stateSlice'
import FakturaTableFilter from './FakturaTableFilter'
import { getFaktura } from '../store/dataSlice'
import dayjs from 'dayjs'
import { generateExcel } from './FakturaExelPattern'

const BatchDeleteButton = () => {
    const dispatch = useDispatch()

    const selectedRow = useSelector(
        (state) => state.fakturaByContragentStore.state.selectedRows
    )

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    console.log(selectedRow, 'selectedRow')

    const onBatchDelete = async () => {
        const success = await getFaktura({
            order_ids: selectedRow,
            from_date: dayjs(startDate).format('YYYY-MM-DD'),
            to_date: dayjs(endDate).format('YYYY-MM-DD'),
        })
        notification(success)
        dispatch(setSelectedRow([]))
    }

    const notification = (success) => {
        if (success) {
            generateExcel(success)

            toast.push(
                <Notification title={'Успешно'} type="success" duration={2500}>
                    Успешно скачано
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <Button
            variant="solid"
            color="blue-600"
            size="sm"
            icon={<HiOutlineDownload />}
            onClick={onBatchDelete}
        >
            Фактура по контрагентам
        </Button>
    )
}

const FakturaTableTools = () => {
    const dateFormat = 'MMM DD, YYYY'

    const dispatch = useDispatch()

    const selectedRows = useSelector(
        (state) => state.fakturaByContragentStore.state.selectedRows
    )

    const startDate = useSelector(
        (state) => state.fakturaByContragentStore.state.startDate
    )
    const endDate = useSelector(
        (state) => state.fakturaByContragentStore.state.endDate
    )

    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {selectedRows.length > 0 && startDate && endDate && (
                <BatchDeleteButton />
            )}
            <FakturaTableFilter />

            <FakturaTableSearch size="200" />
            {/* {selectedRows.length > 0 && ( */}
            <DatePickerRange
                value={[startDate, endDate]}
                onChange={handleDateChange}
                inputFormat={dateFormat}
                size="sm"
            />
            {/* )} */}
        </div>
    )
}

export default FakturaTableTools
