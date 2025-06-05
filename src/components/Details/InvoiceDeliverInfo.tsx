import { useContext } from "react";
import tailwind from "../../shared/tailwind";
import type { TInvoiceDeliverInfo } from "../../types";
import Functions from "../../utils/Functions";
import { MainContext } from "../../layouts/Layout";

export default function InvoiceDeliverInfo({ allInvoices, setAllInvoices }: TInvoiceDeliverInfo) {

    const { H3, P1, H4, P2 } = tailwind()
    const { invoice } = useContext(MainContext)
    const { formatDate } = Functions({ allInvoices, setAllInvoices })

    return (
        <>
            <div className="w-[100%] flex justify-between">
                <div>
                    <h3 className={`${H3} text-[#0C0E16]`}><span className="text-[#888EB0]">#</span>{invoice?.id}</h3>
                    <h4 className={`${H4} text-[#7E88C3] font-[500]!`}>{invoice?.description}</h4>
                </div>
                <div>
                    <h5 className={`${P1} text-[#7E88C3] text-right`}>{invoice?.senderAddress.street}</h5>
                    <h5 className={`${P1} text-[#7E88C3] text-right`}>{invoice?.senderAddress.city}</h5>
                    <h5 className={`${P1} text-[#7E88C3] text-right`}>{invoice?.senderAddress.postCode}</h5>
                    <h5 className={`${P1} text-[#7E88C3] text-right`}>{invoice?.senderAddress.country}</h5>
                </div>
            </div>
            <div className="w-[85%] mt-[24px] flex justify-between">
                <div>
                    <div className="mb-[16px]">
                        <h5 className={`${P2} text-[#7E88C3] mb-[8px]`}>Invoice Date</h5>
                        <h3 className={`${H3}`}>{invoice?.createdAt ? formatDate(invoice.createdAt).slice(3) : ''}</h3>
                    </div>

                    <div>
                        <h5 className={`${P2} text-[#7E88C3]  mb-[8px]`}>Payment Due</h5>
                        <h3 className={`${H3}`}>{invoice?.clientName || ''}</h3>
                    </div>
                </div>
                <div>
                    <h5 className={`${P2} text-[#7E88C3] mb-[8px]`}>Bill To</h5>
                    <h3 className={`${H3} mb-[8px]`}>{invoice?.clientName}</h3>
                    <div className="flex flex-col gap-[4px]!">
                        <h5 className={`${P2} text-[#7E88C3]`}>{invoice?.clientAddress.street}</h5>
                        <h5 className={`${P2} text-[#7E88C3]`}>{invoice?.clientAddress.city}</h5>
                        <h5 className={`${P2} text-[#7E88C3]`}>{invoice?.clientAddress.postCode}</h5>
                        <h5 className={`${P2} text-[#7E88C3]`}>{invoice?.clientAddress.country}</h5>
                    </div>
                </div>
                <div>
                    <h5 className={`${P2} text-[#7E88C3] mb-[8px]`}>Sent to</h5>
                    <h3 className={`${H3}`}>{invoice?.clientEmail}</h3>
                </div>
            </div>
        </>
    )
}
