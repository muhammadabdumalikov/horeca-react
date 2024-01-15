import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import OrganizationFields from './OrganizationFields'

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    uzName: Yup.string().test(
        'len',
        'Введите название товара',
        (val) => val?.length >= 3
    ),
    ruName: Yup.string().test(
        'len',
        'Введите название товара',
        (val) => val?.length >= 3
    ),
    enName: Yup.string().test(
        'len',
        'Введите название товара',
        (val) => val?.length >= 3
    ),
    uzCountry: Yup.string().test(
        'len',
        'Введите название регирна',
        (val) => val?.length >= 3
    ),
    ruCountry: Yup.string().test(
        'len',
        'Введите название регирна',
        (val) => val?.length >= 3
    ),
    enCountry: Yup.string().test(
        'len',
        'Введите название регирна',
        (val) => val?.length >= 3
    ),
})

const DeleteProductButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Удалить
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Удалить компанию"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Вы уверены, что хотите удалить эту компанию? Все записи
                    связанные с этим компанием, также будут удалены. Это
                    действие нельзя отменить.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props

    const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    // tags: initialData?.tags
                    //     ? initialData.tags.map((value) => ({
                    //           label: value,
                    //           value,
                    //       }))
                    //     : [],
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

                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
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
        uzName: '',
        ruName: '',
        enName: '',
        uzCountry: '',
        ruCountry: '',
        enCountry: '',
    },
}

export default ProductForm
