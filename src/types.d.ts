import type { UseFormReturn } from "react-hook-form"

type TMainContext = {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  invoice: TInvoice | undefined
  setInvoice: React.Dispatch<React.SetStateAction<TInvoice | undefined>>
  setInvoices: React.Dispatch<React.SetStateAction<TInvoice[]>>
  invoices: TInvoice[]
  editForm: boolean
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>
}

type TInvoice = {
  id: string
  createdAt: string
  paymentDue: string
  description: string
  paymentTerms: number
  clientName: string
  clientEmail: string
  status: string
  senderAddress: {
    street: string
    city: string
    postCode: string
    country: string
  }
  clientAddress: {
    street: string
    city: string
    postCode: string
    country: string
  };
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[];
  total: number
}

type TFunctionsArgs = Partial<{
  watch: UseFormWatch<TInvoice>
  reset: UseFormReset<TInvoice>
  setValue: UseFormSetValue<TInvoice>
  getValues: UseFormGetValues<TInvoice>
  allInvoices: TInvoice[]
  setAllInvoices: React.Dispatch<React.SetStateAction<TInvoice[]>>
  setError: UseFormSetError<TInvoice>
}>

type TRenderInvoices = {
  filters: {
    draft: boolean
    paid: boolean
    pending: boolean
  }
}

type THeader = {
  filters: {
    draft: boolean
    paid: boolean
    pending: boolean
  }
  setFilters: React.Dispatch<React.SetStateAction<{
    draft: boolean;
    pending: boolean;
    paid: boolean;
  }>>
}

type TConfirmDeletion = {
  confirmDeletion: boolean,
  setConfirmDeletion: React.Dispatch<React.SetStateAction<boolean>>
}

type TButtonsBar = {
  setConfirmDeletion: Setter<boolean>
  allInvoices: TInvoice[]
  setAllInvoices: Setter<TInvoice[]>
  isMobile: boolean
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
}


type TInvoiceDeliverInfo = {
  allInvoices: TInvoice[]
  setAllInvoices: React.Dispatch<React.SetStateAction<TInvoice[]>>
}

type TInput = {
  register: UseFormRegister<TInvoice>
  errors: FieldErrors<TInvoice>
}

type TBillPartTop = {
  register: UseFormRegister<TInvoice>
  errors: FieldErrors<TInvoice>
  setSelected: React.Dispatch<React.SetStateAction<number>>
  setValue: UseFormSetValue<TInvoice>
  watch: UseFormWatch<TInvoice>
  selected: number
}

type TItems = {
  fields: FieldArrayWithId<TInvoice, "items", "id">[]
  watch: UseFormWatch<TInvoice>
  append: UseFieldArrayAppend<TInvoice, "items">
  errors: FieldErrors<TInvoice>
  setValue: UseFormSetValue<TInvoice>
  getValues: UseFormGetValues<TInvoice>

}

type TFormButtonsBar = {
  reset: UseFormReset<TInvoice>
  watch: UseFormWatch<TInvoice>
  setError: UseFormSetError<TInvoice>
  setValue: UseFormSetValue<TInvoice>
  clearErrors: UseFormClearErrors<TInvoice>
  getValues: UseFormGetValues<TInvoice>
  handleSubmit: UseFormHandleSubmit<TInvoice, TInvoice>
}

interface IItems {
  quantity: number
  name: string
  price: number

}