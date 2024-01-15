import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export const region_id = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]
export const in_active = [
    { label: 'Online', value: '1' },
    { label: 'Offline', value: '0' },
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
                        label="ФИО"
                        invalid={errors.fullname && touched.fullname}
                        errorMessage={errors.fullname}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="fullname"
                            placeholder="ФИО"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Контактный номер (телефон)"
                        invalid={errors.contact && touched.contact}
                        errorMessage={errors.contact}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="contact"
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
                        invalid={errors.username && touched.username}
                        errorMessage={errors.username}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="username"
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
                        label="Регион"
                        invalid={errors.region_id && touched.region_id}
                        errorMessage={errors.region_id}
                    >
                        <Field name="category_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={region_id}
                                    value={region_id.filter(
                                        (category) =>
                                            category.value ===
                                            values.category_id
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
