import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct, deleteProduct, getProductById } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../ProductForm'

injectReducer('salesProductEdit', reducer)

const data = {
    id: 1,
    name: 'Cola 2.25L',
    category: 'Mobile',
    stock: 10,
    status: 0,
    dona_price: 1099,
    blok_price: 1000,
    disc_price: 900,
    // img: '/assets/images/products/iphone-12-pro-max.png',
}

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const productItem = useSelector(
        (state) => state.salesProductEdit.data.getProdyctById
    )

    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    const fetchData = (data) => {
        dispatch(getProductById(data))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateProduct(values)
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/products')
    }

    const handleDelete = async (setDialogOpen) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: productItem.id })
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/sales/product-list')
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    console.log(productItem, 'productItem')

    return (
        <>
            <Loading loading={false}>
                {!isEmpty(productItem) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={productItem}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(productItem) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">Товар не найден!</h3>
                </div>
            )}
        </>
    )
}

export default ProductEdit
