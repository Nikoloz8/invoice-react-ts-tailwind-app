import { useContext, useEffect} from "react"
import tailwind from "../../shared/tailwind"
import type { TButtonsBar } from "../../types"
import Functions from "../../utils/Functions"
import { MainContext } from "../../layouts/Layout"

export default function ButtonsBar({ setConfirmDeletion, allInvoices, setAllInvoices, setIsMobile, isMobile }: TButtonsBar) {

    const { P2, H4 } = tailwind()

    const { invoice, setShowForm, setEditForm, toggle } = useContext(MainContext)

    const { markAsPaid } = Functions({ allInvoices, setAllInvoices })


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])


    return (
        <div className={`mt-[20px] w-[100%] bg-[#FFFFFF] rounded-[8px] p-[24px_32px_24px_32px] flex items-center justify-between shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1)] ${toggle ? "bg-[#1E2139]!" : undefined}`}>
            <div className="flex gap-[20px] max-sm:w-[100%] items-center max-sm:justify-between">
                <h5 className={`${P2} text-[#858BB2]`}>Status</h5>
                <div className={`${H4} ${invoice?.status.toLowerCase() === "paid" ? "text-[#33D69F]! bg-[rgba(51,214,159,0.1)]" : invoice?.status.toLowerCase() === "pending" ? "text-[#FF8F00]! bg-[rgba(255,143,0,0.1)]" : "text-[#373B53]! bg-[rgba(55,59,83,0.1)]"}  rounded-[6px] w-[104px] h-[40px] flex items-center justify-center gap-[8px]`}> <span className={`w-[8px] h-[8px] mb-[3px]! ${invoice?.status.toLowerCase() === "paid" ? "bg-[#33D69F]" : invoice?.status.toLowerCase() === "pending" ? "bg-[#FF8F00]" : "bg-[#373B53]"} rounded-full`}></span>{invoice?.status[0].toUpperCase()}{invoice?.status.slice(1)}</div>
            </div>
            {(isMobile ? (
                <div className={`fixed bottom-0 w-[100vw] h-[100px] left-0 transition-all duration-1000 ease-in-out shadow-[-15px_0_50px_rgba(0,0,0,0.1)] justify-around flex items-center ${toggle ? "bg-[#1E2139]" : "bg-[#FFFFFF]"}`}>
                    <button
                        className={`w-[73px] h-[48px] rounded-[24px] bg-[#F9FAFE] flex items-center justify-center ${P2} text-[#7E88C3]! ${toggle ? "bg-[#252945]" : ""} font-[700] cursor-pointer`}
                        onClick={() => {
                            setShowForm(true)
                            setEditForm(true)
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={`w-[89px] h-[48px] rounded-[24px] bg-[#EC5757] flex items-center justify-center cursor-pointer ${P2} text-[#FFFFFF] font-[700]`}
                        onClick={() => setConfirmDeletion(true)}
                    >
                        Delete
                    </button>
                    {invoice?.status !== "paid" && (
                        <button
                            onClick={() => markAsPaid()}
                            className={`w-[131px] h-[48px] rounded-[24px] bg-[#7C5DFA] flex items-center cursor-pointer justify-center ${P2} text-[#FFFFFF] font-[700]`}
                        >
                            Mark as Paid
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex gap-[8px]">
                    <button
                        className={`w-[73px] h-[48px] rounded-[24px] bg-[#F9FAFE] flex items-center justify-center ${P2} text-[#7E88C3] ${toggle ? "bg-[#252945]" : ""} font-[700] cursor-pointer`}
                        onClick={() => {
                            setShowForm(true)
                            setEditForm(true)
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className={`w-[89px] h-[48px] rounded-[24px] bg-[#EC5757] flex items-center justify-center cursor-pointer ${P2} text-[#FFFFFF] font-[700]`}
                        onClick={() => setConfirmDeletion(true)}
                    >
                        Delete
                    </button>
                    {invoice?.status !== "paid" && (
                        <button
                            onClick={() => markAsPaid()}
                            className={`w-[131px] h-[48px] rounded-[24px] bg-[#7C5DFA] flex items-center cursor-pointer justify-center ${P2} text-[#FFFFFF] font-[700]`}
                        >
                            Mark as Paid
                        </button>
                    )}
                </div>
            )
            )
            }
        </div>)
}
