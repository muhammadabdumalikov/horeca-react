import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCompany, updateCompany } from './store/dataSlice'
import isEmpty from 'lodash/isEmpty'
import ProductForm from '../CompanyForm'

injectReducer('salesCompanyEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const companyData = useSelector(
        (state) => state.salesCompanyEdit.data.companyData
    )

    const getCategoryById = (id) => {
        const data = companyData.data?.list?.find((item) => item.id == id)

        if (data?.id) {
            return {
                uzName: data?.uz_name,
                ruName: data?.ru_name,
                enName: data?.en_name,
                uzCountry: data?.uz_country,
                ruCountry: data?.ru_country,
                enCountry: data?.en_country,
                id: data?.id,
            }
        }
    }

    const data = getCategoryById(id)

    console.log(companyData, 'companyData')
    console.log(data, 'data')

    const loading = useSelector((state) => state.salesCompanyEdit.data.loading)

    const fetchData = () => {
        dispatch(getCompany({}))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await updateCompany(values)
        setSubmitting(false)
        if (success) {
            popNotification('изменено')
        }
    }

    const handleDiscard = () => {
        navigate('/companies')
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Успешно ${keyword}`}
                type="success"
                duration={2500}
            >
                Успешно добавлен {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/companies')
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
            {!loading && isEmpty(companyData) && (
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
