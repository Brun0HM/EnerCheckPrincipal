import React from 'react'

const VisualizarLista = (props) => {
  return (
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-row justify-content-between rounded-4 px-3 py-4">

    {props.topic1 && (
<div className="d-flex flex-column gap-0 align-items-center">
<p className="m-0 fw-medium fs-5 text-primary">{props.topic1}</p>
<p className="fw-semibold m-0">{props.t1info}</p>
</div>
)}

{props.topic2 && (
<div className="d-flex flex-column gap-0 align-items-center">
<p className="m-0 fw-medium fs-5 text-primary">{props.topic2}</p>
<p className="fw-semibold m-0">{props.t2info}</p>
</div>
)}

{props.topic3 && (
<div className="d-flex flex-column gap-0 align-items-center">
<p className="m-0 fw-medium fs-5 text-primary">{props.topic3}</p>
<p className="fw-semibold m-0">{props.t3info}</p>
</div>
)}

{props.topic4 && (
<div className="d-flex flex-column gap-0 align-items-center">
<p className="m-0 fw-medium fs-5 text-primary">{props.topic4}</p>
<p className="fw-semibold m-0">{props.t4info}</p>
</div>
)}

{props.topic5 && (
<div className="d-flex flex-column gap-0 align-items-center">
<p className="m-0 fw-medium fs-5 text-primary">{props.topic5}</p>
<p className="fw-semibold m-0">{props.t5info}</p>
</div>
)}
    
</div>
</div>
  )
}

export default VisualizarLista