import React from 'react';

const FullIssue = ({ issue }) =>{
   const {title, state, body} = issue ? issue : "";
    return(
        
        <div className="full-issue">
            <h1>Title: {title}</h1>
            <h3>State: {state}</h3>
            <p>{body}</p>
        </div>
    );
};

export default FullIssue;