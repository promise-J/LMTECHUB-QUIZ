

import {create} from 'zustand'

const useSingleQuiz = create((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useSingleQuiz
