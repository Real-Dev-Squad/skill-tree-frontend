import { create } from "zustand"

export type TGlobalStoreUser = {
    id: string
    name: string
    profilePicture: string
}

type TStore = {
    user: TGlobalStoreUser | null
}

type TActions = {
    setGlobalStore: (store: Partial<TStore>) => void
}

type TGlobalStore = TStore & TActions

const INITIAL_STATE: TStore = {
    user: null,
}

export const useGlobalStore = create<TGlobalStore>()((set) => ({
    ...INITIAL_STATE,
    setGlobalStore: (store) => set((state) => ({ ...state, ...store })),
}))
