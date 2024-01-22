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

    const categoryOptions = categoryList.list?.map((category) => ({
        label: category.ru_name,
        value: category.id,
    }))

    const companyOptions = companyList.list?.map((company) => ({
        label: company.ru_name,
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
                        errorMessage={errors.categoryId}
                    >
                        <Field name="categoryId">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categoryOptions}
                                    value={categoryOptions?.filter(
                                        (category) =>
                                            category.value === values.categoryId
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
                        invalid={errors.companyId && touched.companyId}
                        errorMessage={errors.companyId}
                    >
                        <Field name="companyId">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={companyOptions}
                                    value={companyOptions?.filter(
                                        (tag) => tag.value === values.companyId
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
                        invalid={errors.countInBlock && touched.countInBlock}
                        errorMessage={errors.countInBlock}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="countInBlock"
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
