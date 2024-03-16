import React from 'react'
import { Card, Avatar } from 'components/ui'
import { GrowShrinkTag, MediaSkeleton, Loading } from 'components/shared'
import {
    HiOutlineUserGroup,
} from 'react-icons/hi'
import {  useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading } = props

    const avatarSize = 55


    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumberFormat
                                    displayType="text"
                                    value={value}
                                    thousandSeparator
                                />
                            </h3>
                        </div>
                    </div>
                    <GrowShrinkTag value={growthRate} suffix="%" />
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    // const dispatch = useDispatch()

    const data = useSelector((state) => state.crmCustomers.data.customerList)


    // const statisticData = useSelector(
    //     (state) => state.crmCustomers.data.statisticData
    // )
    // const loading = useSelector(
    //     (state) => state.crmCustomers.data.statisticLoading
    // )

    // useEffect(() => {
    //     dispatch(getCustomerStatistic())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="Всего клиентов"
                value={data.length}
                growthRate={data.length}
                // loading={loading}
            />
            {/* <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Активные пользователи"
                value={data.data_users?.all_count}
                growthRate={10}
                // loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="Новые пользователи"
                value={data.data_users?.this_month}
                growthRate={10}
                // loading={loading}
            /> */}
        </div>
    )
}

export default CustomerStatistic
