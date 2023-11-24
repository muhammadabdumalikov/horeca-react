import React, { forwardRef, useState } from 'react'
import { FormContainer, Button, hooks } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    region_id: Yup.string().required('Введите регион агента'),
    fullname: Yup.string().required('Введите Ф.И.О агента'),
    contact: Yup.string().required('Введите контакт агента'),
    username: Yup.string().required('Введите логин агента'),
    password: Yup.string().required('Введите  пароль агента'),
})

const DelateAgentButton = ({ onDelete }) => {
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
                title="Удалить агент"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Вы уверены, что хотите удалить этот агент? Все записи
                    связанные с этим агентом, также будут удалены. Это
                    действие нельзя отменить.
                </p>
            </ConfirmDialog>
        </>
    )
}

const AgentsForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

    const newId = useUniqueId('product-')

    // console.log(type, "type")
    // console.log(ref, "ref")

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
                    formData.tags = formData.tags.map((tag) => tag.value)
                    if (type === 'new') {
                        formData.id = newId
                        if (formData.imgList.length > 0) {
                            formData.img = formData.imgList[0].img
                        }
                    }
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
                                        <div>
                                            {type === 'edit' && (
                                                <DelateAgentButton
                                                    onDelete={onDelete}
                                                />
                                            )}
                                        </div>
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

AgentsForm.defaultProps = {
    type: 'edit',
    initialData: {
        region_id: '',
        fullname: '',
        contact: '',
        username: '',
        password: '',
        in_active: true,
    },
}

export default AgentsForm
