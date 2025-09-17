import React from 'react'

export const ComponenteLista = () => {
  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-row justify-content-between rounded-4 px-3 py-4">

                <div className="d-flex flex-column gap-0">
                <p className="m-0 fw-medium fs-5">Thiago Mazzi</p>
                <p className="m-0 small">thiago.mazzi@gmail.com</p>
                </div>

                <div className="d-flex flex-column gap-0 align-items-center">
                <p className="m-0 fw-medium fs-5 text-primary">N° CREA</p>
                <p className="fw-semibold m-0">********</p>
                </div>
                <div className="d-flex flex-column gap-0 align-items-center">
                <p className="m-0 fw-medium fs-5 text-primary">Plano</p>
                <p className="fw-semibold m-0">Pobre Premium</p>
                </div>

                <div className="d-flex flex-column gap-0 align-items-center">
                <p className="m-0 fw-medium fs-5 text-primary">Data de criação</p>
                <p className="fw-semibold m-0">06/06/1845</p>
                </div>

                <div className="d-flex flex-row gap-3 align-items-center">
                    <i className=" bi bi-trash-fill text-danger"></i>
                    <i className="bi bi-pencil-fill text-warning"></i>
                    <i className="bi bi-eye-fill text-info"></i>
                </div>
                
            </div>
  )
}
