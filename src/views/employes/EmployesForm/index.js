import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import 'yup-phone'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer('agentsForm', reducer)

const phoneSchema = Yup.string().phone('UZ').required('Введите номер телефона')

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Введите  пароль'),
    first_name: Yup.string().required('Введите Фамилию'),
    last_name: Yup.string().required('Введите Имя'),
    phone: phoneSchema,
    login: Yup.string().required('Введите логин агента'),
    role: Yup.string().required('Выберите роль'),
})

const AgentsForm = forwardRef((props, ref) => {
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
                    const validPhone = formData.phone.length < 12 && {phone: '998' + formData.phone}
                    onFormSubmit?.({...formData, ...validPhone}, setSubmitting)
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
                                                // loading={isSubmitting}
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
        phone: '',
        first_name: '',
        last_name: '',
        password: '',
        role: '',
        login: '',
    },
}

export default AgentsForm
