import React from 'react'

const ContainerCircuito = (props) => {
  return (
    <div className='border border-1 rounded-3 pt-3 pb-2 px-3 d-flex flex-column my-3'>
      <div className='d-flex flex-row gap-2 align-items-center'>
    <i className={`bi ${props.icone} ${props.estado} fs-5`}></i>
    <p className='fw-medium m-0 '>{props.topico}</p>
      </div>
      <p className='small ms-4'>{props.result}</p>
    
    </div>
  )
}

export default ContainerCircuito