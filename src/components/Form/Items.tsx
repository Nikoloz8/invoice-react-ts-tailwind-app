import { useContext } from "react"
import tailwind from "../../shared/tailwind"
import Functions from "../../utils/Functions"
import { MainContext } from "../../layouts/Layout"
import type { TItems } from "../../types"

export default function Items({ fields, watch, append, errors, getValues, setValue }: TItems) {

    const { P2, inputStyle, errorMessageStyle } = tailwind()

    const { handleNameChange, handlePriceChange, handleQuantityChange, deleteItem } = Functions({ getValues, setValue, watch })

    const { editForm, toggle } = useContext(MainContext)

    return (
        <>
            <h3 className="text-[1.8rem] leading-[32px] tracking-[-0.38px] font-[700] text-[#777F98]">Item List</h3>

            <div className="w-[100%] flex flex-col">
                <div className="w-[100%] gap-[20px]! flex justify-between">
                    <div className="flex flex-col w-[40%]! gap-[20px]!">
                        <h5 className={`${P2}`}>Item Name</h5>
                        {fields.map((e, index) => {
                            return <div key={e.id} className="flex items-center justify-between">
                                <div className="flex gap-[12px] w-[100%]">
                                    <input
                                        onChange={handleNameChange(index)}
                                        defaultValue={editForm ? e.name : ""}
                                        className={`${inputStyle} w-[100%]!`} type="text" name="" id={e.id} />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="flex flex-col w-[20%]! gap-[20px]!">
                        <h5 className={`${P2}`}>Qty.</h5>
                        {fields.map((e, index) => {
                            return <div key={e.id} className="flex items-center justify-between">
                                <div className="flex gap-[12px] w-[90%]">
                                    <input type="text" onChange={handleQuantityChange(index)}
                                        defaultValue={editForm ? e.quantity : ""}
                                        className={`${inputStyle} w-[100%]!`} name="" id={e.id} />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="flex flex-col w-[25%] gap-[20px]!">
                        <h5 className={`${P2}`}>Price</h5>
                        {fields.map((e, index) => {
                            return <div key={e.id} className="flex items-center justify-between">
                                <div className="flex gap-[12px] w-[100%]">
                                    <input type="text"
                                        onChange={handlePriceChange(index)}
                                        defaultValue={editForm ? e.total : ""}
                                        className={`${inputStyle} w-[100%]!`} name="" id={e.id} />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="flex flex-col w-[15%] gap-[20px]!">
                        <h5 className={`${P2} text-[#7E88C3]`}>Total</h5>
                        {fields.map((e, index) => {
                            return <div key={e.id} className="flex h-[50px] items-center justify-between">
                                <div className=" w-[100%]! flex items-center gap-[20px]">
                                    <h5 className={`${P2} text-[#888EB0] font-[700]`}>
                                        {watch(`items.${index}.total`).toFixed(2)}
                                    </h5>
                                    <div className="w-[25%]! flex items-center gap-[20px]">
                                        <svg onClick={() => deleteItem(index)} width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" className="hover:fill-[#E65957]" fill="#888EB0" fillRule="nonzero" /></svg>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <button className={`w-[100%] h-[48px] outline-none rounded-[24px] bg-[#F9FAFE] ${P2} text-[#7E88C3] font-[700] cursor-pointer mt-[50px] ${toggle ? "bg-[#252945]! text-[#DFE3FA]!" : undefined}`} onClick={() => append({
                    name: "",
                    quantity: 0,
                    price: 0,
                    total: 0
                })}>+ Add New Item</button>
            </div>
            <div>
                {errors.items && <p className={`${errorMessageStyle}`}>{errors.items.message}</p>}
            </div>
        </>
    )
}
