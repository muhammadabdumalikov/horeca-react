import React from 'react'
import { Button, Notification, Upload, toast } from 'components/ui'
import {
    HiDownload,
    HiOutlineUpload,
    HiPlusCircle,
} from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFaktura, getProducts, setExelName } from '../store/dataSlice'
import { isEmpty } from 'lodash'
import { generateExcel } from './ProductsExelPattern'
import { setExel } from './ProductUploadExelPatter'

const ProductTableTools = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ObjectID = require('bson-objectid')

    const { pageIndex, pageSize, search } = useSelector(
        (state) => state.salesProductList.data.tableData
    )
    const fileName = useSelector(
        (state) => state.salesProductList.data.exelName
    )

    console.log(fileName, 'fileName')

    const generateFileName = `Mahsulotlar qoldig'i-${ObjectID()}.xlsx`

    const onEditActivity = async () => {
        const success = await getFaktura({})

        if (!isEmpty(success)) {
            generateExcel(success, generateFileName)

            popNotification(' Успешно получено', 'success')
            dispatch(
                getProducts({
                    search,
                    limit: pageSize,
                    offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
                })
            )
        } else {
            popNotification('Список пуст', 'danger')
        }
    }

    const onUpload = async (buffer) => {
        const success = await getFaktura({})

        if (!isEmpty(success)) {
            setExel(buffer)

            popNotification(' Успешно изменено', 'success')
            dispatch(
                getProducts({
                    search,
                    limit: pageSize,
                    offset: (pageIndex - 1) * pageSize + (pageIndex === 1 && 0),
                })
            )
        } else {
            popNotification('Список пуст', 'danger')
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
        navigate(`/products`)
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            <ProductFilter />

            <Button
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                size="sm"
                icon={<HiDownload />}
                onClick={onEditActivity}
            >
                Скачать
            </Button>

            {/* <Button
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                size="sm"
                icon={<HiUpload />}
                onClick={onUpload}
            ></Button> */}
            <Upload
                accept=".xlsx"
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                // beforeUpload={beforeUpload}
                onChange={(event) => {
                    const file = event[0]
                    const reader = new FileReader()

                    reader.onload = function (event) {
                        const buffer = event.target.result
                        // Now you have the file content in buffer, you can do further processing here
                        console.log('File buffer:', buffer)
                        dispatch(setExelName(buffer))
                        onUpload(buffer)
                    }

                    // Read the file as an ArrayBuffer
                    reader.readAsArrayBuffer(file)

                    // dispatch(setExelName(e))
                }}
                showList={false}
            >
                <Button icon={<HiOutlineUpload />}>Загрузить файл</Button>
            </Upload>

            {/* <input/> */}

            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/products/add"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Добавить продукт
                </Button>
            </Link>
        </div>
    )
}

export default ProductTableTools
