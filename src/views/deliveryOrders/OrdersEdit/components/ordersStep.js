import { AdaptableCard } from 'components/shared'
import { Button, Spinner, Steps } from 'components/ui'
import { useEffect, useState } from 'react'
import {
    HiOutlineLogin,
    HiOutlineDocumentSearch,
    HiOutlineClipboardCheck,
} from 'react-icons/hi'
import {HiOutlineArrowLeft } from 'react-icons/hi2'
import { useSelector } from 'react-redux'

const OrdersStep = ({ onDiscard }) => {

    const orderItem = useSelector((state) => state.ordersStore.data.orderItem)

    const [step, setStep] = useState(orderItem?.status)
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

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Заказы</h3>
                <div className="flex flex-col lg:flex-row lg:items-center">
                    <Button
                        onClick={onDiscard}
                        block
                        // size="xl"
                        icon={<HiOutlineArrowLeft />}
                    >
                        Назад
                    </Button>
                </div>
            </div>
            {/* vertical */}
            <Steps vertical={windowWidth < 600} current={step} status="error">
                <Steps.Item title="Принял" customIcon={<HiOutlineLogin />} />
                <Steps.Item title="Доставка" customIcon={  <HiOutlineLogin />} />
                {/* <Spinner /> */}
                {/* <Steps.Item
                    title="Отменено"
                    customIcon={<HiOutlineDocumentSearch />}
                /> */}
                <Steps.Item
                    title={step == 4 ? "Отменено" : "Доставленный"}
                    customIcon={ step == 4 ? <HiOutlineDocumentSearch /> : <HiOutlineClipboardCheck />}
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
        </AdaptableCard>
    )
}

export default OrdersStep
