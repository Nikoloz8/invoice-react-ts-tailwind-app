import { useContext, useState } from "react"
import tailwind from "../../shared/tailwind"
import type { THeader } from "../../types"
import { MainContext } from "../../layouts/Layout"

export default function Header({ filters, setFilters, }: THeader) {

    const { H1, P2, H4, filterButtonStyle } = tailwind()

    const [show, setShow] = useState(false)

    const { showForm, setShowForm, invoices, toggle } = useContext(MainContext)

    return (
        <header className="flex justify-between items-center mt-[24px] max-lg:mt-[100px]">
            <div>
                <h1 className={`${H1} max-sm:text-[2.4rem] ${toggle ? "text-[#FFFFFF]" : undefined}`}>Invoices</h1>
                <h5 className={`${P2} text-[#888EB0] ${toggle ? "text-[#DFE3FA]" : undefined}`}>
                    {invoices.length > 0 ? (
                        <>
                            <span className="max-sm:hidden">There are </span>
                            <span>{invoices.length}</span>
                            <span className="max-sm:hidden"> total</span>
                            <span> invoices</span>
                        </>
                    ) : (
                        <span>No invoices</span>
                    )}


                </h5>
            </div>
            <div className="flex items-center gap-[32px] max-sm:gap-[12px]!">
                <div className="relative">
                    <button onClick={() => !showForm ? setShow(!show) : undefined} className={`${!showForm ? "cursor-pointer" : undefined} flex items-center gap-[10px]`}>
                        <h4 className={`${H4} max-sm:text-[15px]!`}>Filter <span className="max-sm:hidden">by status</span></h4>
                        <svg className={`${show ? "rotate-[180deg]" : undefined} transition-[1s]`} width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                    </button>
                    <div className={`${show ? "flex" : "hidden"} absolute w-[192px] left-[-40%] top-[36px] p-[24px] rounded-[8px] flex-col gap-[16px] bg-[#FFFFFF] ${toggle ? "bg-[#252945]!" : undefined}`}>
                        <label htmlFor="draft" className={`flex items-center gap-[13px] ${H4}`}>
                            <input type="checkbox" onChange={() => setFilters({ ...filters, draft: !filters.draft })} id="draft" className="peer hidden" />
                            <div className={`peer-checked:bg-[url('/images/icon-check.svg')] ${filterButtonStyle}`}></div>
                            Draft
                        </label>
                        <label htmlFor="pending" className={`flex items-center gap-[13px] ${H4}`}>
                            <input type="checkbox" onChange={() => setFilters({ ...filters, pending: !filters.pending })} id="pending" className="peer hidden" />
                            <div className={`${filterButtonStyle} peer-checked:bg-[url('/images/icon-check.svg')]`}></div>
                            Pending
                        </label>

                        <label htmlFor="paid" className={`flex items-center gap-[13px] ${H4}`}>
                            <input onChange={() => setFilters({ ...filters, paid: !filters.paid })} type="checkbox" id="paid" className="peer hidden" />
                            <div className={`peer-checked:bg-[url('/images/icon-check.svg')] ${filterButtonStyle}`}></div>
                            Paid
                        </label>
                    </div>
                </div>
                <button onClick={() => {
                    setShowForm(true)
                    setShow(false)
                }} className={`w-[150px] max-sm:w-[90px] flex items-center gap-[12px] text-[#FFFFFF]! p-[8px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} max-sm:gap-[6px] cursor-pointer`}>
                    <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF] flex items-center justify-center">
                        <img src="/images/icon-plus.svg" alt="" />
                    </div>
                    New <span className="max-sm:hidden">Invoice</span>
                </button>
            </div>
        </header>)
}
