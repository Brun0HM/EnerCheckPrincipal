import React from 'react'

export const InfoGeralContainer = (props) => {
  return (
    <div className='container border border-1 border-dark-subtle bg-secondary bg-opacity-10 rounded-3 w-50 py-3 px-3'>

        <div className='d-flex flex-column '>

            
            <div className='d-flex flex-row justify-content-between'>
             <p className='fw-medium'>{props.topico}</p>   

             <i className={`'bi ${props.iconeTopico} text-secondary'`}></i>
            </div>

            <div className='loading-container d-flex flex-column'>
                <p className={` text-${props.corNumero} fs-3 fw-bold mb-2 mb-md-1`}>{props.pontuacaoGeral}%</p>
                <div className='progress' role='progressbar' style={{height: "9px"}}>
                    <div className='progress-bar bg-black' style={{width: `${props.pontuacaoGeral}%` }}></div>
                </div>
                <p className='small fw-regular mt-2 mt-md-1'>{props.comentario}</p>
            </div>
        </div>
        
    </div>
  )
}
