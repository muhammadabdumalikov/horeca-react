import React from 'react'
import { Button } from 'components/ui'
import { HiOutlineDownload } from 'react-icons/hi'
import FakturaTableSearch from './AktSerkaTableSearch'
import {  useDispatch } from 'react-redux'
import { setDeleteMode } from '../store/stateSlice'
// import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
// import { setStartDate, setEndDate } from '../store/stateSlice'

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

const FakturaTableTools = () => {
    // const dateFormat = 'MMM DD, YYYY'

    // const dispatch = useDispatch()

    // const selectedRows = useSelector(
    //     (state) => state.aktSverka.state.selectedRows
    // )

    // const startDate = useSelector((state) => state.aktSverka.state.startDate)
    // const endDate = useSelector((state) => state.aktSverka.state.endDate)

    // const handleDateChange = (value) => {
    //     dispatch(setStartDate(value[0]))
    //     dispatch(setEndDate(value[1]))

    //     // dispatch(
    //     //     getCustomers({
    //     //         limit: pageSize,
    //     //         offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
    //     //         role: 3,
    //     //         from_date: dayjs(startDate).format('YYYY-MM-DD'),
    //     //         to_date: dayjs(endDate).format('YYYY-MM-DD'),
    //     //     })
    //     // )
    // }

    // console.log(startDate, endDate)

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* {selectedRows.length > 0 && startDate && endDate && ( */}
                <BatchDeleteButton />
            {/* )} */}
            {/* <Link to="/data/order-list.csv" target="_blank" download>
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            {/* {selectedRows.length > 0 && ( */}
            {/* <DatePickerRange
                value={[startDate, endDate]}
                onChange={handleDateChange}
                inputFormat={dateFormat}
                size="sm"
            /> */}
            {/* )} */}
            <FakturaTableSearch />
        </div>
    )
}

export default FakturaTableTools
