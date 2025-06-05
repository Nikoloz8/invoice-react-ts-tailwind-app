import { useContext } from "react"
import tailwind from "../../shared/tailwind"
import { MainContext } from "../../layouts/Layout"

export default function CalculationResults() {

    const { H3, P2, P1, H2, H4 } = tailwind()

    const { invoice } = useContext(MainContext)

    return (
        <div className="mt-[40px]">
            <div className="w-[100%] rounded-[8px_8px_0_0] bg-[#F9FAFE] p-[24px]">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[20px]!">
                        <h5 className={`${P2} text-[#7E88C3]`}>Item Name</h5>
                        {invoice?.items.map((e, index) => {
                            return <h3 key={index} className={`${H3} font-[700]`}>{e.name}</h3>
                        })}
                    </div>
                    <div className="w-[25%] flex justify-between">
                        <div className="flex flex-col gap-[25px]!">
                            <h5 className={`${P2} text-[#7E88C3]`}>QTY.</h5>
                            {invoice?.items.map((e, index) => {
                                return <h3 key={index} className={`${H4} text-center text-[#7E88C3] font-[700]`}>{e.quantity}</h3>
                            })}
                        </div>
                        <div className="gap-[25px]! flex flex-col">
                            <h5 className={`${P2} text-[#7E88C3] text-right`}>Price</h5>
                            {invoice?.items.map((e, index) => {
                                return <h3 key={index} className={`${H4} text-center text-[#7E88C3] font-[700]`}>£ {e.total.toFixed(2)}</h3>
                            })}
                        </div>
                    </div>
                    <div className="gap-[20px]! flex flex-col">
                        <h5 className={`${P2} text-[#7E88C3] text-right`}>Total</h5>
                        {invoice?.items.map((e, index) => {
                            return <h3 key={index} className={`${H3} text-center font-[700]`}>£ {e.total.toFixed(2)}</h3>
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-[100%] rounded-[0_0_8px_8px] bg-[#373B53] p-[24px]">
                <h5 className={`${P1} text-[#FFFFFF]`}>Amount Due</h5>
                <h2 className={`${H2} text-[#FFFFFF]`}>£{invoice?.total.toFixed(2)}</h2>
            </div>
        </div>)
}
