import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCategories, updateCategory } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../CategoryForm'

injectReducer('salesProductEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const categoriesData = useSelector(
        (state) => state.salesProductEdit.data.categoryList
    )

    const getCategoryById = (id) => {
        const category = categoriesData.list?.find((item) => item.id == id)

        if (category?.id) {
            return {
                id: category?.id,
                enName: category?.en_name,
                ruName: category?.ru_name,
                uzName: category?.uz_name,
                active: category?.in_active,
            }
        }
    }

    const data = getCategoryById(id)

    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    const fetchData = () => {
        dispatch(getCategories({}))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateCategory(values)
        setSubmitting(false)
        if (success === 201) {
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

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={false}>
                {!isEmpty(data) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
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
