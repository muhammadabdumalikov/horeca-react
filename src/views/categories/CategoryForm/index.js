import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    // enName: Yup.string().test(
    //     'len',
    //     'Введите название категории',
    //     (val) => val?.length >= 3
    // ),
    name_uz: Yup.string().test(
        'len',
        'Введите название категории',
        (val) => val?.length >= 3
    ),
    name_ru: Yup.string().test(
        'len',
        'Введите название категории',
        (val) => val?.length >= 3
    ),
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

                                    {/* <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    /> */}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <StickyFooter
                                        className="flex items-center justify-between py-4"
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
                                </div>
                            </div>
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
        name_ru: '',
        name_uz: '',
        // enName: '',
    },
}

export default ProductForm
