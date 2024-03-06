import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'

const NumberInput = (props) => {
    return <Input {...props} value={Number(props.field.value)} />
}

const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumberFormat
            customInput={Input}
            type="text"
            onValueChange={onValueChange}
            autoComplete="off"
            {...rest}
        />
    )
}

const ProviderPrice = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Поставщик</h5>
            <p className="mb-6">
                Раздел для настройки информации о поставщика продукта
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Поставщик"
                        invalid={errors.company_id && touched.company_id}
                        errorMessage={errors.company_id}
                    >
                        <Field name="company_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    // options={companyOptions}
                                    // value={companyOptions?.filter(
                                    //     (tag) => tag.value === values.company_id
                                    // )}
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
                        label="Цена продукта"
                        invalid={errors.block_price && touched.block_price}
                        errorMessage={errors.block_price}
                    >
                        <Field name="block_price">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Цена"
                                        customInput={NumberInput}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                parseInt(e.value)
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default ProviderPrice
