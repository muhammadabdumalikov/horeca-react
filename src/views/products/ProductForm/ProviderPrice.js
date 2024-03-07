import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployes } from './store/dataSlice'

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
    const { touched, errors, values } = props

    const employesList = useSelector(
        (state) => state.productForm.data.employesList
    )
    const employesOption = employesList?.map((category) => ({
        label: `${category.first_name || category.legal_name} ${category.last_name}`,
        value: category.id,
    }))

    const dispatch = useDispatch()

    const fetchData = () => {
        dispatch(getEmployes({ role: 5 }))
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                        invalid={errors.provider_id && touched.provider_id}
                        errorMessage={errors.provider_id}
                    >
                        <Field name="provider_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={employesOption}
                                    value={employesOption?.filter(
                                        (tag) =>
                                            tag.value === values.provider_id
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
                        label="Цена продукта"
                        invalid={errors.provider_price && touched.provider_price}
                        errorMessage={errors.provider_price}
                    >
                        <Field name="provider_price">
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
