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
                Раздел для настройки основной информации об уведомлении
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Наименование уведомления"
                        invalid={errors.topic && touched.topic}
                        errorMessage={errors.topic}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="topic"
                            placeholder="Введите наименование уведомления"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>

            <FormItem
                label="Описание"
                labelClass="!justify-start"
                invalid={errors.content && touched.content}
                errorMessage={errors.content}
            >
                <Field name="content">
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
