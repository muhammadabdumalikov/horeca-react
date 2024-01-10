import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">
                Раздел для настройки основной информации о компании
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (рус)"
                        invalid={errors.name && touched.name}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Наименование компании (рус)"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (узб)"
                        invalid={errors.productCode && touched.productCode}
                        errorMessage={errors.productCode}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="productCode"
                            placeholder="Наименование компании (узб)"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (анг)"
                        invalid={errors.name && touched.name}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Наименование компании (анг)"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Регион"
                        invalid={errors.categories && touched.categories}
                        errorMessage={errors.categories}
                    >
                        <Field name="category_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
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
                {/* <div className="col-span-1">
                    <FormItem
                        label="Количество шт. (на блоке)"
                        invalid={errors.blokda_soni && touched.blokda_soni}
                        errorMessage={errors.blokda_soni}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="blokda_soni"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div> */}
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
