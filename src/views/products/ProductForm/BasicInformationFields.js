import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'


const BasicInformationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">
                Раздел для настройки основной информации о продукте
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Наименование товара (рус)"
                        invalid={errors.ruName && touched.ruName}
                        errorMessage={errors.ruName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="ruName"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Наименование товара (узб)"
                        invalid={errors.uzName && touched.uzName}
                        errorMessage={errors.uzName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="uzName"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Наименование товара (анг)"
                        invalid={errors.enName && touched.enName}
                        errorMessage={errors.enName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="enName"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <FormItem
                label="Код продукта"
                invalid={errors.barcode && touched.barcode}
                errorMessage={errors.barcode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="barcode"
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
