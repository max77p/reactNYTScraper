import React from "react";
import "./Button.css";

const Button = props => {
  // console.log(props.setting);
  if(props.setting==="search"){
    return(
      <button type="button" className="btn btn-default saveBtn" onClick={props.click} data-id={props.id} data-title={props.title} data-pubdate={props.pubdate} data-author={props.author}>
      Save
    </button>
    )
  }
  else{
    return (
      <button type="button" className="btn btn-danger deleteBtn" onClick={(event)=>props.click(event,props.id)} data-id={props.id} data-title={props.title} data-pubdate={props.pubdate} data-author={props.author}>
        Delete
      </button>
    );
  }
  
  
};

export default Button;
