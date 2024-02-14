import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, updateCategory } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../CategoryForm'

injectReducer('salesProductEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { id } = useParams()

    const categoryItem = useSelector(
        (state) => state.salesProductEdit.data.categoryItem
    )

    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    useEffect(() => {
        dispatch(getCategoryById({id})) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateCategory(values)
        setSubmitting(false)
        if (success === 200) {
            popNotification('обновлено')
            navigate('/categories')
        }
    }

    const handleDiscard = () => {
        navigate('/categories')
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
        navigate(`/categories/edit/${id}`)
    }

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(categoryItem) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={categoryItem}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(categoryItem) && (
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
