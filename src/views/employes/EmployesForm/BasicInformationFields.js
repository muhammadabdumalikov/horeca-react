import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

const rolesOptions = [
    { value: '2', label: 'Администратор' },
    { value: '4', label: 'Доставщик' },
]

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }


    const passwordVisible = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">
                Раздел для настройки основной информации об агенте
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Фамилия"
                        invalid={errors.first_name && touched.first_name}
                        errorMessage={errors.first_name}
                    >
                        <Field
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Логин"
                        invalid={errors.login && touched.login}
                        errorMessage={errors.login}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="login"
                            placeholder="Логин"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Пароль"
                        invalid={errors.password && touched.password}
                        errorMessage={errors.password}
                    >
                        <Field
                            type={pwInputType}
                            suffix={passwordVisible}
                            autoComplete="off"
                            name="password"
                            placeholder="Password"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Роль"
                        invalid={errors.role && touched.role}
                        errorMessage={errors.role}
                    >
                        <Field name="role">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={rolesOptions}
                                    value={
                                        rolesOptions?.filter(
                                        (roles) =>
                                            roles.value == values.role
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
