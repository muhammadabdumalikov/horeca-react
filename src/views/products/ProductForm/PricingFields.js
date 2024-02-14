import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'


const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
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

const PricingFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Цена</h5>
            <p className="mb-6">
                Раздел для настройки информации о продажах продукта
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Цена за шт."
                        invalid={errors.count_price && touched.count_price}
                        errorMessage={errors.count_price}
                    >
                        <Field name="count_price">
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
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Цена за блок"
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
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Цена в акции"
                        invalid={errors.discount_price && touched.discount_price}
                        errorMessage={errors.discount_price}
                    >
                        <Field name="discount_price">
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
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div>
                {/* <FormItem
                        label="Eд. измерения"
                        invalid={errors.measure && touched.measure}
                        errorMessage={errors.measure}
                    >
                        <Field name="measure">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={measureList}
                                    value={measureList?.filter(
                                        (tag) => tag.value === measureList.measure
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
                    </FormItem> */}
                {/* <div className="col-span-1">
                    <FormItem
                        label="Ставка налога(%)"
                        invalid={errors.taxRate && touched.taxRate}
                        errorMessage={errors.taxRate}
                    >
                        <Field name="taxRate">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Ставка налога"
                                        customInput={TaxRateInput}
                                        isAllowed={({ floatValue }) =>
                                            floatValue <= 100
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItem>
                </div> */}
            </div>
        </AdaptableCard>
    )
}

export default PricingFields
