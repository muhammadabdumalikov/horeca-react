import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'


const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Базовая информация</h5>
            <p className="mb-6">
                Раздел для настройки основной информации о компании
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (рус)"
                        invalid={errors.ruName && touched.ruName}
                        errorMessage={errors.ruName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="ruName"
                            placeholder="Наименование компании (рус)"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (узб)"
                        invalid={errors.uzName && touched.uzName}
                        errorMessage={errors.uzName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="uzName"
                            placeholder="Наименование компании (узб)"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Наименование компании (анг)"
                        invalid={errors.enName && touched.enName}
                        errorMessage={errors.enName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="enName"
                            placeholder="Наименование компании (анг)"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
