import React, { useState, useRef, forwardRef, useEffect } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getProducts,
    setFilterData,
    getCategory,
    getCompany,
} from '../store/dataSlice'
import {
    Button,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
    Select,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'

const FilterForm = forwardRef(({ onSubmitComplete }, ref) => {
    const dispatch = useDispatch()

    const filterData = useSelector(
        (state) => state.salesProductList.data.filterData
    )

    console.log(filterData, 'filterData')

    const handleSubmit = (values) => {
        console.log(values, 'values')
        onSubmitComplete?.()
        dispatch(setFilterData(values))
        dispatch(getProducts(values))
    }

    const categoryList = useSelector(
        (state) => state.salesProductList.data.categoryList
    )
    const companyList = useSelector(
        (state) => state.salesProductList.data.companyList
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
        <Formik
            innerRef={ref}
            enableReinitialize
            initialValues={filterData}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {({ values, touched, errors }) => (
                <Form>
                    <FormContainer>
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
                                                category.value ===
                                                values.categoryId
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
                        <FormItem
                        label="Производитель"
                        invalid={errors.companyId && touched.companyId}
                        errorMessage={errors.companyId}
                    >
                        <Field name="companyId">
                            {({ field, form }) => {
                                return (
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
                                )
                            }}
                        </Field>
                    </FormItem>
                        <FormItem
                            invalid={errors.active && touched.active}
                            errorMessage={errors.active}
                        >
                            <h6 className="mb-4">Статус продукта</h6>
                            <Field name="active">
                                {({ field, form }) => (
                                    <Radio.Group
                                        vertical
                                        value={values.active}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    >
                                        <Radio value={true}>Активно</Radio>
                                        <Radio value={false}>Неактивно</Radio>
                                    </Radio.Group>
                                )}
                            </Field>
                        </FormItem>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Отмена
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Запрос
            </Button>
        </div>
    )
}

const ProductFilter = () => {
    const formikRef = useRef()

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Фильтр
            </Button>
            <Drawer
                title="Фильтр"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

export default ProductFilter
