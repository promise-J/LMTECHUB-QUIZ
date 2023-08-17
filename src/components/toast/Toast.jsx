import React from 'react'
import { toast } from 'react-toastify'

const Toast = (type, message) => {
  return (
    toast[type](message)
  )
}

export default Toast