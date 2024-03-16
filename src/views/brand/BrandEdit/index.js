import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompanyById, updateCompany } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../CompanyForm'

injectReducer('salesCompanyEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const companyItem = useSelector(
        (state) => state.salesCompanyEdit.data.companyItem
    )

    const loading = useSelector((state) => state.salesCompanyEdit.data.loading)

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateCompany(values)
        setSubmitting(false)
        if (success) {
            popNotification('изменено')
            navigate('/brand')
        }
    }

    const handleDiscard = () => {
        navigate('/brand')
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
        navigate('/brand')
    }

    useEffect(() => {
        dispatch(getCompanyById({ id }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(companyItem) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={companyItem}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(companyItem) && (
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
