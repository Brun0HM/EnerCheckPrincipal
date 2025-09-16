import React from 'react'

export const CardStatusProjetoDashboard = (props) => {
  return (
    <div className='container border border-1 rounded-4 w-25 py-3 px-3 shadow'>

        <div className='d-flex flex-column '>

            
            <div className='d-flex flex-row justify-content-between'>
             <p className='fw-medium'>{props.status}</p>   

             <i className={`'bi ${props.iconeStatus} text-secondary'`}></i>
            </div>

            <div className='d-flex flex-row justify-content-between'>
             <h4 className='fw-bold'>{props.num}</h4>   
            </div>

            <div className='d-flex flex-row justify-content-between'>
             <small className='text-muted'>{props.desc}</small>
            </div>
        </div>
    </div>
        

    
  )
}
