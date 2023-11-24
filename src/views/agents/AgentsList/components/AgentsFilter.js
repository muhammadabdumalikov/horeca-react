import React, { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    setFilterData,
    initialTableData,
    getCompanies,
} from '../store/dataSlice'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'

const FilterForm = forwardRef(({ onSubmitComplete }, ref) => {
    const dispatch = useDispatch()

    const filterData = useSelector(
        (state) => state.agentsList.data.filterData
    )

    const handleSubmit = (values) => {
        onSubmitComplete?.()
        dispatch(setFilterData(values))
        dispatch(getCompanies(initialTableData))
    }

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
                        {/* <FormItem
                            invalid={errors.name && touched.name}
                            errorMessage={errors.name}
                        >
                            <h6 className="mb-4">Included text</h6>
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="Keyword"
                                component={Input}
                                prefix={<HiOutlineSearch className="text-lg" />}
                            />
                        </FormItem> */}
                        <FormItem
                            invalid={errors.category && touched.category}
                            errorMessage={errors.category}
                        >
                            <h6 className="mb-4">Категория продукта</h6>
                            <Field name="category">
                                {({ field, form }) => (
                                    <>
                                        <Checkbox.Group
                                            vertical
                                            onChange={(options) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    options
                                                )
                                            }
                                            value={values.category}
                                        >
                                            <Checkbox
                                                className="mb-3"
                                                name={field.name}
                                                value="bags"
                                            >
                                                Напитки{' '}
                                            </Checkbox>
                                        </Checkbox.Group>
                                    </>
                                )}
                            </Field>
                        </FormItem>
                        <FormItem
                            invalid={errors.status && touched.status}
                            errorMessage={errors.status}
                        >
                            <h6 className="mb-4">Категория продукта</h6>
                            <Field name="status">
                                {({ field, form }) => (
                                    <>
                                        <Checkbox.Group
                                            vertical
                                            onChange={(options) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    options
                                                )
                                            }
                                            value={values.status}
                                        >
                                            <Checkbox
                                                className="mb-3"
                                                name={field.name}
                                                value={0}
                                            >
                                                В наличии{' '}
                                            </Checkbox>
                                            <Checkbox
                                                className="mb-3"
                                                name={field.name}
                                                value={1}
                                            >
                                                Ограниченное{' '}
                                            </Checkbox>
                                            <Checkbox
                                                className="mb-3"
                                                name={field.name}
                                                value={2}
                                            >
                                                Распродано{' '}
                                            </Checkbox>
                                        </Checkbox.Group>
                                    </>
                                )}
                            </Field>
                        </FormItem>
                        <FormItem
                            invalid={
                                errors.productStatus && touched.productStatus
                            }
                            errorMessage={errors.productStatus}
                        >
                            <h6 className="mb-4">Статус продукта</h6>
                            <Field name="productStatus">
                                {({ field, form }) => (
                                    <Radio.Group
                                        vertical
                                        value={values.productStatus}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    >
                                        <Radio value={0}>Опубликовано</Radio>
                                        <Radio value={1}>Неполноценный</Radio>
                                        <Radio value={2}>Архив</Radio>
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
