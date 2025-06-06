import { useNavigate } from "react-router-dom"
import tailwind from "../../shared/tailwind"
import Functions from "../../utils/Functions"
import type { TRenderInvoices } from "../../types"
import { useContext } from "react"
import { MainContext } from "../../layouts/Layout"

export default function RenderInvoices({ filters }: TRenderInvoices) {

    const { H4, P2, H3, H2 } = tailwind()

    const { filterInvoices, formatDate } = Functions()

    const { invoices, toggle } = useContext(MainContext)

    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-[16px] m-[50px_0_50px_0]">
            {filterInvoices(invoices, filters).length > 0 ? filterInvoices(invoices, filters).map((e, index) => {
                return <div key={index} onClick={() => navigate(`/details/${e.id}`)} className={`w-[100%] p-[0_24px_0_32px] items-center max-sm:h-[134px] h-[72px] bg-[#FFFFFF] flex justify-between cursor-pointer rounded-[8px] max-sm:justify-between ${toggle ? "bg-[#1E2139]!" : undefined}`}>
                    <div className="flex gap-[32px] max-sm:flex-col max-sm:gap-[12px]">
                        <h4 className={`${H4}`}><span className={`${H4} text-[#7E88C3]!`}>#</span>{e.id}</h4>
                        <h5 className={`${P2} text-[#7E88C3]! ${toggle ? "text-[#DFE3FA]!" : undefined}`}>{formatDate(e.paymentDue)}</h5>
                        <h5 className={`${P2} text-[#7E88C3]! ${toggle ? "text-[#FFFFFF]!" : undefined}`}>{e.clientName}</h5>
                    </div>
                    <div className="flex gap-[32px] max-sm:gap-[16px]! max-sm:flex-col items-center">
                        <h3 className={`${H3}`}>£{e.total.toFixed(2)}</h3>
                        <div className="flex items-center gap-[16px]">
                            <div className={`${H4} ${e.status.toLowerCase() === "paid" ? "text-[#33D69F]! bg-[rgba(51,214,159,0.1)]" : e.status.toLowerCase() === "pending" ? "text-[#FF8F00]! bg-[rgba(255,143,0,0.1)]" : "text-[#373B53]! bg-[rgba(55,59,83,0.1)]"}  rounded-[6px] w-[104px] h-[40px] flex items-center justify-center gap-[8px]  ${e.status.toLowerCase() === 'draft' && toggle ? "bg-[rgba(223,227,250,0.1)]! text-[#DFE3FA]!" : undefined}`}> <span className={`w-[8px] h-[8px] mb-[3px]! ${e.status.toLowerCase() === "paid" ? "bg-[#33D69F]" : e.status.toLowerCase() === "pending" ? "bg-[#FF8F00]" : e.status.toLowerCase() === 'draft' && toggle ? "bg-[rgba(223,227,250)]!" : "bg-[#373B53]"} rounded-full`}></span>{e.status[0].toUpperCase()}{e.status.slice(1)}</div>
                            <img src="/images/icon-arrow-right.svg" alt="" />
                        </div>
                    </div>
                </div>
            }) : <div className="w-[100%] gap-[50px] mt-[40px] h-[100%] flex items-center flex-col  justify-center">
                <img src="/images/illustration-empty.svg" alt="" />
                <div className="w-[207px]  flex flex-col gap-[20px]">
                    <h2 className={`${H2} text-center ${toggle ? "text-[#FFFFFF]" : undefined}`}>There is nothing here</h2>
                    <p className={`${P2} text-[#888EB0] text-center ${toggle ? "text-[#DFE3FA]" : undefined}`}>
                        Create an invoice by clicking the
                        <b> New Invoice </b> button and get started
                    </p>
                </div>
            </div>}
        </div >)
}
