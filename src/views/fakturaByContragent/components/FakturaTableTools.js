import React from 'react'
// import { Button } from 'components/ui'
// import { HiOutlineDownload } from 'react-icons/hi'
import FakturaTableSearch from './FakturaTableSearch'
import { useSelector, useDispatch } from 'react-redux'
// import { setDeleteMode } from '../store/stateSlice'
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
import { setStartDate, setEndDate } from '../store/stateSlice'
import FakturaTableFilter from './FakturaTableFilter'

// const BatchDeleteButton = () => {
//     const dispatch = useDispatch()

//     const onBatchDelete = () => {
//         dispatch(setDeleteMode('batch'))
//     }

//     return (
//         <Button
//             variant="solid"
//             color="blue-600"
//             size="sm"
//             icon={<HiOutlineDownload />}
//             onClick={onBatchDelete}
//         >
//             Фактуры по контрагентам
//         </Button>
//     )
// }

const FakturaTableTools = () => {
    const dateFormat = 'MMM DD, YYYY'

    const dispatch = useDispatch()

    // const selectedRows = useSelector(
    //     (state) => state.fakturaByContragentStore.state.selectedRows
    // )

    const startDate = useSelector((state) => state.fakturaByContragentStore.state.startDate)
    const endDate = useSelector((state) => state.fakturaByContragentStore.state.endDate)

    const handleDateChange = (value) => {
        dispatch(setStartDate(value[0]))
        dispatch(setEndDate(value[1]))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <FakturaTableFilter/>
            {/* {selectedRows.length > 0 && startDate && endDate && (
                <BatchDeleteButton />
            )} */}
            {/* <Link to="/data/order-list.csv" target="_blank" download>
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
         
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
