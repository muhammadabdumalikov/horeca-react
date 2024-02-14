import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

const OrganizationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            {/* <h5>Регион</h5> */}
            {/* <p className="mb-6">Раздел для настройки регион</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Регион (рус)"
                        invalid={errors.country_ru && touched.country_ru}
                        errorMessage={errors.country_ru}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="country_ru"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Регион (узб)"
                        invalid={errors.country_uz && touched.country_uz}
                        errorMessage={errors.country_uz}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="country_uz"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Регион (енг)"
                        invalid={errors.enCountry && touched.enCountry}
                        errorMessage={errors.enCountry}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="enCountry"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div> */}
        </AdaptableCard>
    )
}

export default OrganizationFields
