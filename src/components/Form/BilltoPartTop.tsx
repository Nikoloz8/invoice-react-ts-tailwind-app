import tailwind from "../../shared/tailwind"
import type { TInput } from "../../types"

export default function BilltoPartTop({register, errors}:TInput) {

    const {labelInput, errorMessageStyle, inputStyle, H4, P2} = tailwind()

    return (
        <>
            <h4 className={`${H4} text-[#7C5DFA]!`}>Bill To</h4>
            <div className={labelInput}>
                <label className={`${P2} flex justify-between ${errors.clientName ? "text-[#EC5757]" : undefined}`} htmlFor="name">Client’s Name{errors.clientName && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                <input type="text" id="name" {...register("clientName", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientName ? "border-[#EC5757]!" : undefined}`} />
            </div>

            <div className={labelInput}>
                <label className={`${P2} flex justify-between ${errors.clientEmail ? "text-[#EC5757]" : undefined}`} htmlFor="email">Client’s Email {errors.clientEmail && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                <input type="text" id="email" {...register("clientEmail", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientEmail ? "border-[#EC5757]!" : undefined}`} />
            </div>

            <div className={labelInput}>
                <label className={`${P2} flex justify-between ${errors.clientAddress?.street ? "text-[#EC5757]" : undefined}`} htmlFor="TAddress">Street Address{errors.clientAddress?.street && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                <input type="text" id="TAddress" {...register("clientAddress.street", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.street ? "border-[#EC5757]!" : undefined}`} />
            </div>

            <div className="flex justify-between">
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} flex justify-between ${errors.clientAddress?.city ? "text-[#EC5757]" : undefined}`} htmlFor="TCity">City{errors.clientAddress?.city && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="TCity" {...register("clientAddress.city", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.city ? "border-[#EC5757]!" : undefined}`} />
                </div>
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} flex justify-between ${errors.clientAddress?.postCode ? "text-[#EC5757]" : undefined}`} htmlFor="TPostCode">Post Code{errors.clientAddress?.postCode && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="TPostCode" {...register("clientAddress.postCode", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.postCode ? "border-[#EC5757]!" : undefined}`} />
                </div>
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} flex justify-between ${errors.clientAddress?.country ? "text-[#EC5757]" : undefined}`} htmlFor="TCountry">Country{errors.clientAddress?.country && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="TCountry" {...register("clientAddress.country", { required: "can’t be empty" })} className={`${inputStyle} ${errors.clientAddress?.country ? "border-[#EC5757]!" : undefined}`} />
                </div>
            </div></>
    )
}
