import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

const rolesOptions = [
    { value: 1, label: 'Физическое лицо' },
    { value: 2, label: 'Юридическое лицо' },
]

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    const [role, setRole] = useState(1)

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">
                Раздел для настройки основной информации о поставщике
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Роль"
                        invalid={errors.person_type && touched.person_type}
                        errorMessage={errors.person_type}
                    >
                        <Field name="person_type">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={rolesOptions}
                                    value={rolesOptions?.filter(
                                        (roles) =>
                                            roles.value == values.person_type
                                    )}
                                    onChange={(option) => {
                                        setRole(option.value)

                                        return form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Фамилия"
                        invalid={errors.first_name && touched.first_name}
                        errorMessage={errors.first_name}
                    >
                        <Field
                            disabled={role === 2}
                            type="text"
                            autoComplete="off"
                            name="first_name"
                            placeholder="ФИО"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Имя"
                        invalid={errors.last_name && touched.last_name}
                        errorMessage={errors.last_name}
                    >
                        <Field
                            disabled={role === 2}
                            type="text"
                            autoComplete="off"
                            name="last_name"
                            placeholder="ФИО"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Юридическое имя"
                        invalid={errors.legal_name && touched.legal_name}
                        errorMessage={errors.legal_name}
                    >
                        <Field
                            disabled={role === 1}
                            type="text"
                            autoComplete="off"
                            name="legal_name"
                            placeholder="Юридическое имя"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Контактный номер (телефон)"
                        invalid={errors.phone && touched.phone}
                        errorMessage={errors.phone}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="phone"
                            placeholder="Контактный номер (телефон)"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
