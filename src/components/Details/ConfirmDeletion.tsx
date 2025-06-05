import { useContext } from "react"
import tailwind from "../../shared/tailwind"
import type { TConfirmDeletion } from "../../types"
import Functions from "../../utils/Functions"
import { MainContext } from "../../layouts/Layout"

export default function ConfirmDeletion({ confirmDeletion, setConfirmDeletion }: TConfirmDeletion) {

    const { H2, P1, P2 } = tailwind()

    const { invoice } = useContext(MainContext)

    const { deleteInvoice } = Functions()

    return (
        <div className={`${!confirmDeletion ? "bg-[rgba(0,0,0,0)] z-[-1]" : undefined} fixed top transition-bg duration-1000 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex items-center justify-center`}>
            <div className="ml-[104px] bg-[#FFFFFF] rounded-[8px] p-[48px] max-w-[490px] flex flex-col gap-[20px]">
                <h2 className={`${H2}`}>Confirm Deletion</h2>
                <p className={`${P1} text-[#888EB0]`}>Are you sure you want to delete invoice #{invoice?.id}? This action cannot be undone.</p>
                <div className="w-[100%] flex justify-end gap-[10px]">
                    <button className={`w-[91px] cursor-pointer h-[48px] rounded-[24px] bg-[#F9FAFE] flex items-center justify-center ${P2} text-[#7E88C3] font-[700]`} onClick={() => setConfirmDeletion(false)}>Cancel</button>
                    <button className={`w-[89px] h-[48px] rounded-[24px] bg-[#EC5757] flex items-center justify-center ${P2} text-[#FFFFFF] font-[700] cursor-pointer`}
                        onClick={() => deleteInvoice()}
                    >Delete</button>
                </div>
            </div>
        </div>)
}
