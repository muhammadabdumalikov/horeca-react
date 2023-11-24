import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">Раздел для настройки основной информации о продукте</p>
            <FormItem
                label="Наименование товара"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Наименование товара"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Код продукта"
                invalid={errors.productCode && touched.productCode}
                errorMessage={errors.productCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="productCode"
                    placeholder="Код"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Описание"
                labelClass="!justify-start"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
