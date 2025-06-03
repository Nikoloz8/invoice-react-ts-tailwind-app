import AsideBar from "../components/AsideBar";
import data from "../../data.json"
import tailwind from "../shared/tailwind";
import { useState } from "react";

export default function Home() {

    const { H1, P2, H4, H3 } = tailwind()

    const [show, setShow] = useState(false)

    const formatDate = (dateString: string) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        const date = new Date(dateString)
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        return `Due ${day} ${month} ${year}`
    }

    return (
        <div className="flex">
            <AsideBar />
            <div className="w-[100%]! flex justify-center ml-[103px]">
                <div className="w-[730px]!">
                    <header className="flex justify-between items-center mt-[24px]">
                        <div>
                            <h1 className={`${H1}`}>Invoices</h1>
                            <h5 className={`${P2} text-[#888EB0]`}>There are {data.length} total invoices</h5>
                        </div>
                        <div className="flex items-center gap-[32px]">
                            <div className="relative">
                                <button onClick={() => setShow(!show)} className="cursor-pointer flex items-center gap-[10px]">
                                    <h4 className={`${H4}`}>Filter by status</h4>
                                    <svg className={`${show ? "rotate-[180deg]" : undefined} transition-[1s]`} width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd" /></svg>
                                </button>
                                <div className={`${show ? "flex" : "hidden"} absolute w-[192px] left-[-40%] top-[36px] p-[24px] rounded-[8px] flex-col gap-[16px] bg-[#FFFFFF]`}>
                                    <label htmlFor="draft" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="draft" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Draft
                                    </label>
                                    <label htmlFor="pending" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="pending" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Pending
                                    </label>
                                    <label htmlFor="paid" className={`flex items-center gap-[13px] ${H4}`}>
                                        <input type="checkbox" id="paid" className="peer hidden" />
                                        <div className="w-[16px] h-[16px] rounded-[2px] bg-[#DFE3FA] peer-checked:bg-[#7C5DFA] hover:border-[1px] border-solid border-[#7C5DFA] peer-checked:bg-[url('/images/icon-check.svg')] bg-no-repeat bg-center"></div>
                                        Paid
                                    </label>
                                </div>
                            </div>
                            <button className={`w-[150px] flex items-center gap-[12px] text-[#FFFFFF]! p-[8px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4}`}>
                                <div className="w-[32px] h-[32px] rounded-full bg-[#FFFFFF] flex items-center justify-center">
                                    <img src="/images/icon-plus.svg" alt="" />
                                </div>
                                New Invoice
                            </button>
                        </div>
                    </header>
                    <div className="flex flex-col gap-[16px] mt-[50px]">
                        {data.map((e, index) => {
                            return <div key={index} className="w-[100%] p-[0_24px_0_32px] items-center h-[72px] bg-[#FFFFFF] flex justify-between rounded-[8px]">
                                <div className="flex gap-[32px]">
                                    <h4 className={`${H4}`}><span className={`${H4} text-[#7E88C3]!`}>#</span>{e.id}</h4>
                                    <h5 className={`${P2} text-[#7E88C3]!`}>{formatDate(e.paymentDue)}</h5>
                                    <h5 className={`${P2} text-[#7E88C3]!`}>{e.clientName}</h5>
                                </div>
                                <div className="flex gap-[32px] items-center">
                                    <h3 className={`${H3}`}>£{e.total}</h3>
                                    <div className="flex items-center gap-[16px]">
                                        <div className={`${H4} ${e.status.toLowerCase() === "paid" ? "text-[#33D69F]! bg-[rgba(51,214,159,0.2)]" : e.status.toLowerCase() === "pending" ? "text-[#FF8F00]! bg-[rgba(255,143,0,0.2)]" : "text-[#373B53]! bg-[rgba(55,59,83,0.2)]"}  rounded-[6px] w-[104px] h-[40px] flex items-center justify-center gap-[8px]`}> <span className={`w-[8px] h-[8px] mb-[3px]! ${e.status.toLowerCase() === "paid" ? "bg-[#33D69F]" : e.status.toLowerCase() === "pending" ? "bg-[#FF8F00]" : "bg-[#373B53]"} rounded-full`}></span>{e.status[0].toUpperCase()}{e.status.slice(1)}</div>
                                        <img src="/images/icon-arrow-right.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
