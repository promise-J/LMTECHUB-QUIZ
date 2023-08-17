

import {create} from 'zustand'

const useCreateQuestion = create((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useCreateQuestion
