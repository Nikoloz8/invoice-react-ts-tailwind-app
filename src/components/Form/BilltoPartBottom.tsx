import { useState } from "react"
import tailwind from "../../shared/tailwind"
import Functions from "../../utils/Functions"
import type { TBillPartTop } from "../../types"

export default function BilltoPartBottom({ register, errors, setSelected, setValue, watch, selected }: TBillPartTop) {

    const { errorMessageStyle, P2, inputStyle, H4, labelInput } = tailwind()

    const [showPaymentTerms, setShowPaymentTerms] = useState(false)
    const { addDays } = Functions()


    return (
        <>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-[32px]">
                <div className="w-[48%] max-sm:w-[100%]">
                    <label className={`${P2} flex justify-between ${errors.createdAt ? "text-[#EC5757]" : undefined}`} htmlFor="TInvoiceDate">Invoice Date{errors.createdAt && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="date" id="TInvoiceDate" {...register("createdAt", { required: "can’t be empty" })} className={`${inputStyle} ${errors.createdAt ? "border-[#EC5757]!" : undefined}`} />
                </div>
                <div className="w-[48%] max-sm:w-[100%]">
                    <label className={`${P2}`} htmlFor="TPaymentTerms">Payment Terms</label>
                    <div className="relative">
                        <button onClick={() => setShowPaymentTerms(!showPaymentTerms)} className={`${inputStyle} flex outline-none justify-between items-center`}>
                            <h4 className={`${H4}`}>Net {selected} Days</h4>
                            <svg className={`${showPaymentTerms ? "rotate-[180deg]" : undefined} transition-[1s]`} width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                        </button>
                        <div className={`${showPaymentTerms ? "flex" : "hidden"} absolute w-[242px] left-[0] top-[60px] rounded-[8px] shadow-[0_10px_20px_0_rgba(72,84,159,0.25)]  flex-col bg-[#FFFFFF]`}>
                            <button onClick={() => {
                                setSelected(1)
                                setValue("paymentTerms", 1)
                                setShowPaymentTerms(false)
                                setValue("paymentDue", addDays(watch("createdAt"), 1))
                            }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                Net 1 Day
                            </button>
                            <button onClick={() => {
                                setSelected(7)
                                setValue("paymentTerms", 7)
                                setShowPaymentTerms(false)
                                setValue("paymentDue", addDays(watch("createdAt"), 7))
                            }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] w-[100%] flex items-start outline-none border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                Net 7 Days
                            </button>
                            <button onClick={() => {
                                setSelected(14)
                                setValue("paymentTerms", 14)
                                setShowPaymentTerms(false)
                                setValue("paymentDue", addDays(watch("createdAt"), 14))
                            }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] border-b-[1px] border-solid border-[#DFE3FA] ${H4}`}>
                                Net 14 Days
                            </button>
                            <button onClick={() => {
                                setSelected(30)
                                setValue("paymentTerms", 30)
                                setShowPaymentTerms(false)
                                setValue("paymentDue", addDays(watch("createdAt"), 30))
                            }} className={`p-[16px_24px_16px_24px] hover:text-[#7C5DFA] flex items-start outline-none w-[100%] ${H4}`}>
                                Net 30 Days
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${labelInput} `}>
                <label className={`${P2} flex justify-between ${errors.description ? "text-[#EC5757]" : undefined}`} htmlFor="TProjectDescription">Project Description{errors.description && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                <input type="text" id="TProjectDescription" {...register("description", { required: "can’t be empty" })} className={`${inputStyle} ${errors.description ? "border-[#EC5757]!" : undefined}`} />
            </div>
        </>)
}
