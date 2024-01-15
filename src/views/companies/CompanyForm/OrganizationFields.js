import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

const OrganizationFields = (props) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            {/* <h5>Регион</h5> */}
            {/* <p className="mb-6">Раздел для настройки регион</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Регион (рус)"
                        invalid={errors.ruCountry && touched.ruCountry}
                        errorMessage={errors.ruCountry}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="ruCountry"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Регион (узб)"
                        invalid={errors.uzCountry && touched.uzCountry}
                        errorMessage={errors.uzCountry}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="uzCountry"
                            placeholder="Количество"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
