import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useNavigate, useParams } from 'react-router-dom'
import {
    updateProduct,
    getProductById,
} from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../ProductForm'

injectReducer('salesProductEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const {id} = useParams()
    const navigate = useNavigate()

    const productItem = useSelector(
        (state) => state.salesProductEdit.data.productItem
    )


    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateProduct(values)
        setSubmitting(false)
        if (success) {
            popNotification('обновлено')
        }
    }

    const handleDiscard = () => {
        navigate('/products')
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={` Успешно  ${keyword}`}
                type="success"
                duration={2500}
            >
                Успешно {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/products')
    }

    useEffect(() => {
        dispatch(getProductById({id}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(productItem) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={productItem}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
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
