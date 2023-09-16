import React from 'react'
import { useUserContext } from '../context/Usercontext'

const SingleReport = () => {
    // const {webSocket} = useUserContext()
    // console.log(webSocket)

  return (
    <table className='border table-fixed'>
        <thead>
            <tr>
                <th>insert header1</th>
                <th>insert header2</th>
                <th>insert header3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>insert data1</td>
                <td>insert data2</td>
                <td>insert data3</td>
            </tr>
        </tbody>
    </table>
  )
}

export default SingleReport