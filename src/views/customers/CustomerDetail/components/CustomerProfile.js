import React from 'react'
import { Card, Avatar} from 'components/ui'

const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const CustomerProfile = ({ data = {} }) => {
    console.log(data, "data")
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <Avatar size={90} shape="circle" src={data.img} />
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <CustomerInfoField
                        title="Name"
                        value={`${data?.first_name} ${data?.last_name}`}
                    />
                    <CustomerInfoField
                        title="Phone"
                        value={data?.phone}
                    />
                    <CustomerInfoField
                        title="Location"
                        value={data?.address}
                    />
                  
                </div>
                {/* <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <CustomerProfileAction id={data.id} />
                </div> */}
            </div>
        </Card>
    )
}

export default CustomerProfile
