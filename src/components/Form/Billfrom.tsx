import tailwind from "../../shared/tailwind"
import type { TInput } from "../../types"

export default function Billfrom({ errors, register }:TInput) {

    const { labelInput, errorMessageStyle, H4, P2, inputStyle } = tailwind()

    return (
        <div className="flex flex-col gap-[24px] mt-[50px]">
            <h4 className={`${H4} text-[#7C5DFA]!`}>Bill From</h4>
            <div className={labelInput}>
                <label className={`${P2} flex justify-between ${errors.senderAddress?.street ? "text-[#EC5757]" : undefined}`} htmlFor="FAddress">Street Address{errors.senderAddress?.street && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                <input type="text" id="FAddress" {...register("senderAddress.street", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.street ? "border-[#EC5757]!" : undefined}`} />
            </div>

            <div className="flex justify-between flex-wrap">
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.city ? "text-[#EC5757]" : undefined}`} htmlFor="FCity">City{errors.senderAddress?.city && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="FCity" {...register("senderAddress.city", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.city ? "border-[#EC5757]!" : undefined}`} />
                </div>
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.postCode ? "text-[#EC5757]" : undefined}`} htmlFor="FPostCode">Post Code{errors.senderAddress?.postCode && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="FPostCode" {...register("senderAddress.postCode", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.postCode ? "border-[#EC5757]!" : undefined}`} />
                </div>
                <div className={`${labelInput} w-[30%]`}>
                    <label className={`${P2} text-[#7E88C3] flex justify-between ${errors.senderAddress?.country ? "text-[#EC5757]" : undefined}`} htmlFor="FCountry">Country{errors.senderAddress?.country && (<p className={`${errorMessageStyle}`}>can’t be empty</p>)}</label>
                    <input type="text" id="FCountry" {...register("senderAddress.country", { required: "can’t be empty" })} className={`${inputStyle} ${errors.senderAddress?.country ? "border-[#EC5757]!" : undefined}`} />
                </div>
            </div>
        </div>)
}
