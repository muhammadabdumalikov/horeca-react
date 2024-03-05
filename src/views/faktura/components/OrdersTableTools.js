import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiOutlineDownload } from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { useSelector, useDispatch } from 'react-redux'
import { setDeleteMode } from '../store/stateSlice'
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
// import { Link } from 'react-router-dom'
import { setStartDate, setEndDate } from '../store/stateSlice'
import { Link } from 'react-router-dom'


const BatchDeleteButton = () => {
    const dispatch = useDispatch()

    const onBatchDelete = () => {
        dispatch(setDeleteMode('batch'))
    }

   

    return (
        <Button
            variant="solid"
            color="blue-600"
            size="sm"
            icon={<HiOutlineDownload />}
            onClick={onBatchDelete}
        >
            Фактуры по контрагентам
        </Button>
    )
}

const OrdersTableTools = () => {

    const dateFormat = 'MMM DD, YYYY'

    const dispatch = useDispatch()

    const selectedRows = useSelector(
        (state) => state.fakturaStore.state.selectedRows
    )

    const startDate = useSelector(
        (state) => state.fakturaStore.state.startDate
    )
    const endDate = useSelector((state) => state.fakturaStore.state.endDate)

    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }

    console.log(startDate, endDate)

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {selectedRows.length > 0 && startDate && endDate && <BatchDeleteButton />}
            {/* <Link to="/data/order-list.csv" target="_blank" download>
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
           {selectedRows.length > 0 && <DatePickerRange
                value={[startDate, endDate]}
                onChange={handleDateChange}
                inputFormat={dateFormat}
                size="sm"
            />}
            <OrderTableSearch />
        </div>
    )
}

export default OrdersTableTools
