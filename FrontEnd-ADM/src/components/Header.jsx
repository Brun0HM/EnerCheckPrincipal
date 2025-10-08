import React from 'react'

export const Header = () => {
  return (
    <header className="container-fluid my-0 headerBlur text-center ">
    <div className="w-100 align-items-center justify-content-center m-auto">
      <div className="my-2">
        <div className="row align-items-center">
          {/* Logo e título - adaptado ao tema */}
          <div className="col-6 col-lg-auto">
            <a
              className="d-flex align-items-center ms-3 ms-lg-5 text-decoration-none"
            >
              <div
                className="btn text-light fw-bold bg-dark"
    
              >
                <i className="bi bi-lightning-charge"></i>
              </div>
              <h4
                className="fw-bolder fs-3 ms-2 mb-0 text-dark"
               
              >
                Enercheck
              </h4>
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr
      className="mb-0 fw-bolder text-secondary"
    />
  </header>
  )
}
