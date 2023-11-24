import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'

// const PriceInput = (props) => {
//     return <Input {...props} value={props.field.value} prefix="$" />
// }

const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
}

// const TaxRateInput = (props) => {
//     return <Input {...props} value={props.field.value} />
// }

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
                        invalid={errors.dona_price && touched.dona_price}
                        errorMessage={errors.dona_price}
                    >
                        <Field name="dona_price">
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
                        invalid={errors.blok_price && touched.blok_price}
                        errorMessage={errors.blok_price}
                    >
                        <Field name="blok_price">
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
                        invalid={errors.disc_price && touched.disc_price}
                        errorMessage={errors.disc_price}
                    >
                        <Field name="disc_price">
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
