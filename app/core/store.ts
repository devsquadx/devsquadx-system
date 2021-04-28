import { atom } from "jotai"

export const showLogoutAtom = atom(false)
export const sliderAtom = atom({ isOpen: false, ref: null, type: "" } as any)
