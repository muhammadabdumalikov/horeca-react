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
                        invalid={errors.name_ru && touched.name_ru}
                        errorMessage={errors.name_ru}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name_ru"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Наименование товара (узб)"
                        invalid={errors.name_uz && touched.name_uz}
                        errorMessage={errors.name_uz}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name_uz"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                {/* <div className="col-span-1">
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
                </div> */}
            </div>
            <FormItem
                label="Код продукта"
                // invalid={errors.barcode && touched.barcode}
                // errorMessage={errors.barcode}
            >
                <Field
                    disabled={true}
                    type="text"
                    autoComplete="off"
                    // name="barcode"
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
