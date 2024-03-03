import { AdaptableCard } from 'components/shared'
import { Button, Select, Spinner, Steps } from 'components/ui'
import { useEffect, useState } from 'react'
import {
    HiOutlineLogin,
    HiOutlineDocumentSearch,
    HiOutlineClipboardCheck,
} from 'react-icons/hi'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateOrderStatus } from 'views/orders/OrdersList/store/dataSlice'

const OrdersStep = ({ onDiscard }) => {
    const dispatch = useDispatch()
    const { id } = useParams()

    // const orderItem = useSelector((state) => state.ordersStore.data.orderItem)

    const [step, setStep] = useState(1)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    useEffect(() => {
        dispatch(updateOrderStatus({ order_id: id, status: `${step}` }))
    }, [step])

    return (
        <>
            <Steps vertical={windowWidth < 600} current={step} status="error">
                <Steps.Item title="Принял" customIcon={<HiOutlineLogin />} />
                <Steps.Item title="Доставка" customIcon={<HiOutlineLogin />} />
                {/* <Spinner /> */}
                {/* <Steps.Item
                    title="Отменено"
                    customIcon={<HiOutlineDocumentSearch />}
                /> */}
                <Steps.Item
                    title={step == 4 ? 'Отменено' : 'Доставленный'}
                    customIcon={
                        step == 4 ? (
                            <HiOutlineDocumentSearch />
                        ) : (
                            <HiOutlineClipboardCheck />
                        )
                    }
                />
            </Steps>

            <div className="mt-4 text-right">
                <Button
                    className="mx-2"
                    disabled={step === 1}
                    onClick={onPrevious}
                >
                    Previous
                </Button>
                <Button disabled={step === 3} variant="solid" onClick={onNext}>
                    {step === 3 ? 'Completed' : 'Next'}
                </Button>
            </div>
        </>
    )
}

export default OrdersStep
