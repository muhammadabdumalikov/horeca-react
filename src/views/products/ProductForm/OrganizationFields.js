import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, getCompany } from './store/dataSlice'
import NumberFormat from 'react-number-format'

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

const OrganizationFields = (props) => {
    const { values, touched, errors } = props
    const dispatch = useDispatch()

    const categoryList = useSelector(
        (state) => state.productForm.data.categoryList
    )
    const companyList = useSelector(
        (state) => state.productForm.data.companyList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getCategory({ is_deleted: false }))
        dispatch(getCompany({ is_deleted: false }))
    }

    const categoryOptions = categoryList?.map((category) => ({
        label: category.name_ru,
        value: category.id,
    }))

    const companyOptions = companyList?.map((company) => ({
        label: company.name_ru,
        value: company.id,
    }))

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            <h5>Организации</h5>
            <p className="mb-6">Раздел для настройки атрибута продукта</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Категория товара *"
                        invalid={errors.categoryId && touched.categoryId}
                        errorMessage={errors.category_id}
                    >
                        <Field name="category_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categoryOptions}
                                    value={categoryOptions?.filter(
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
                <div className="col-span-1">
                    <FormItem
                        label="Производитель *"
                        invalid={errors.company_id && touched.company_id}
                        errorMessage={errors.company_id}
                    >
                        <Field name="company_id">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={companyOptions}
                                    value={companyOptions?.filter(
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
                        label="Количество шт. (на блоке) *"
                        invalid={
                            errors.count_in_block && touched.count_in_block
                        }
                        errorMessage={errors.count_in_block}
                    >
                        <Field name="count_in_block">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Количество"
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
                <div className="col-span-1">
                    <FormItem
                        label="Количество остатка *"
                        invalid={
                            errors.product_count && touched.product_count
                        }
                        errorMessage={errors.product_count}
                    >
                        <Field name="product_count">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Количество"
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
                {/* <div className="col-span-1"> */}
                    {/* <FormItem
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
                    </FormItem> */}
                {/* </div> */}
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
