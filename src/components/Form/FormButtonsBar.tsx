import { useContext } from "react"
import tailwind from "../../shared/tailwind"
import { MainContext } from "../../layouts/Layout"
import Functions from "../../utils/Functions"
import type { IItems, TFormButtonsBar } from "../../types"

export default function FormButtonsBar({ reset, watch, setValue, clearErrors, getValues, handleSubmit, setError
}: TFormButtonsBar) {

    const { showForm, setShowForm, editForm, setEditForm, toggle } = useContext(MainContext)
    const { H4, P2 } = tailwind()
    const { handleSaveChanges, save } = Functions({ reset, setValue, watch, getValues })

    return (
        <div className={`fixed bottom-0 ${showForm ? "left-0" : "left-[-620px]"} w-[620px] max-sm:w-[100vw] h-[100px] max-sm:p-[20px] transition-all duration-1000 ease-in-out bg-[#FFFFFF] shadow-[-15px_0_50px_rgba(0,0,0,0.1)] flex items-center p-[0_50px_0_150px] ${toggle ? "bg-[#141625]!" : undefined}`}>
            {editForm ? <div className="flex justify-end gap-[10px] w-[100%]">
                <button className={`w-[96px] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3]! font-[700] cursor-pointer`} onClick={() => {
                    setShowForm(false)
                    setTimeout(() => {
                        setEditForm(false)
                        reset()
                    }, 400)
                }}>Cancel</button>
                <button className={`w-[138px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} text-[#FFFFFF]! outline-none cursor-pointer`} onClick={() => {
                    if (watch()?.items.length === 0) {
                        setError("items", {
                            type: "manual",
                            message: "- An item must be added",
                        })
                        return
                    }

                    if (!watch().items.every((e: IItems) => e.name && e.quantity && e.price)) {
                        setError("items", {
                            type: "manual",
                            message: "- All items must be filled",
                        })
                        return
                    }
                    setValue("status", "pending")
                    clearErrors("items")
                    handleSubmit(handleSaveChanges)()
                }}>Save Changes</button>
            </div> : <div className="flex justify-between max-sm:gap-[8px] max-sm:justify-center! w-[100%]">
                <button className={`w-[96px] max-sm:w-[84px]! h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3]! font-[700] cursor-pointer`} onClick={() => {
                    reset()
                    setShowForm(false)
                }}>Discard</button>
                <div className="w-[100%] max-sm:w-auto gap-[8px] flex justify-end max-sm:justify-center">
                    <button onClick={() => {
                        setValue("status", "draft")
                        save(getValues())
                    }} className={`w-[133px] outline-none max-sm:w-[117px]! h-[48px] rounded-[24px] bg-[#373B53] ${H4} text-[#888EB0]! cursor-pointer`}>Save as Draft</button>
                    <button className={`w-[128px] h-[48px] rounded-[24px] bg-[#7C5DFA] ${H4} text-[#FFFFFF]! outline-none cursor-pointer max-sm:w-[112px]!`} onClick={() => {
                        if (watch()?.items.length === 0) {
                            setError("items", {
                                type: "manual",
                                message: "- An item must be added",
                            })
                            return
                        }

                        if (!watch().items.every((e: IItems) => e.name && e.quantity && e.price)) {
                            setError("items", {
                                type: "manual",
                                message: "- All items must be filled",
                            })
                            return
                        }
                        clearErrors("items")
                        setValue("status", "pending")
                        handleSubmit(save)()
                    }}>Save & Send</button>
                </div>
            </div>}

        </div>)
}
