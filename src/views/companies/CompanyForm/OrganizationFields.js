import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import CreatableSelect from 'react-select/creatable'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

export const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

const OrganizationFields = (props) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            <h5>Организации</h5>
            <p className="mb-6">Раздел для настройки атрибута продукта</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Категория товара"
                        invalid={errors.category_id && touched.category_id}
                        errorMessage={errors.category_id}
                    >
                        <Field name="category_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories.filter(
                                        (category) =>
                                            category.value === values.category_id
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
                <div className="col-span-1">
                    <FormItem
                        label="Производитель"
                        invalid={errors.company_id && touched.company_id}
                        errorMessage={errors.company_id}
                    >
                        <Field name="company_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={tags.filter(
                                        (tag) => tag.value === values.company_id
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Тип товара"
                        invalid={errors.type && touched.type}
                        errorMessage={errors.type}
                    >
                        <Field name="type">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={tags.filter(
                                        (tag) => tag.value === values.type
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
                <div className="col-span-1">
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
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
