

import {create} from 'zustand'

const useViewQuiz = create((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useViewQuiz
