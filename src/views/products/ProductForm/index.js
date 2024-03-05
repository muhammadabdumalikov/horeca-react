import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import reducer from './store'
import { injectReducer } from 'store'

injectReducer('productForm', reducer)

const validationSchema = Yup.object().shape({
    name_ru: Yup.string().required('Введите название товара'),
    name_uz: Yup.string().required('Введите название товара'),
    // barcode: Yup.string().required('Введите код товара'),
    description: Yup.string().required('Введите описание товара'),
    discount_price: Yup.string('Введите цену за скидку товара'),
    block_price: Yup.string().required('Введите цену за блок товара'),
    product_count: Yup.string().required('Введите количество товара'),
    count_price: Yup.string().required('Введите цену за единицу товара'),
    category_id: Yup.string().required('Выберите категорию'),
    company_id: Yup.string().required('Выберите производитель'),
    count_in_block: Yup.string().required('Введите количество товара в блоке'),
    image: Yup.string().required(' Загрузите изображение товара'),
})

const ProductForm = forwardRef((props, ref) => {
    const { initialData, onFormSubmit, onDiscard } = props
    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <PricingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <ProductImages
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div></div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                        Отменить
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Сохранить
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
    initialData: {
        company_id: '',
        category_id: '',
        name_uz: '',
        name_ru: '',
        measure: 1,
        // barcode: '',
        image: '',
        count_in_block: 0,
        product_count: 0,
        description: '',
        count_price: null,
        discount_price: 0,
        block_price: 0,
    },
}

export default ProductForm
