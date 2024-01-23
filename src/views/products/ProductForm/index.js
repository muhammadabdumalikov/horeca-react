import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import reducer from './store'
import { injectReducer } from 'store'

const { useUniqueId } = hooks
injectReducer('productForm', reducer)

const validationSchema = Yup.object().shape({
    enName: Yup.string().required('Введите название товара'),
    ruName: Yup.string().required('Введите название товара'),
    uzName: Yup.string().required('Введите название товара'),
    barcode: Yup.string().required('Введите код товара'),
    description: Yup.string().required('Введите описание товара'),
    discountPrice: Yup.string().required('Введите цену за скидку товара'),
    blockPrice: Yup.string().required('Введите цену за блок товара'),
    countPrice: Yup.string().required('Введите цену за единицу товара'),
    categoryId: Yup.string().required('Выберите категорию'),
    companyId: Yup.string().required('Выберите производитель'),
    countInBlock: Yup.string().required('Введите количество товара в блоке'),
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
        companyId: '',
        categoryId: '',
        barcode: '',
        image: '',
        countInBlock: '',
        blockCount: 0,
        description: '',
        countPrice: '',
        blockPrice: '',
        discountPrice: '',
        uzName: '',
        ruName: '',
        enName: '',
    },
}

export default ProductForm
