import React, { useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, getCompany } from './store/dataSlice'

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
        dispatch(getCategory({}))
        dispatch(getCompany({}))
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
                        label="Категория товара"
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
                        label="Количество шт. (на блоке)"
                        invalid={errors.count_in_block && touched.count_in_block}
                        errorMessage={errors.count_in_block}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="count_in_block"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
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
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
