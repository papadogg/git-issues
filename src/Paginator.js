import React from 'react';
import parse from 'parse-link-header';

const Paginator = ({page, clickHandler, links}) =>{
    const onClickHandler = (e)=>{
        e.preventDefault();
        //console.log(e.currentTarget.textContent);
        clickHandler(e.currentTarget.textContent);
       
    }
    
   const parsedLinks = parse(links);
  
    if(parsedLinks) {
    
    const { first, prev, next, last } =  parsedLinks;
    
    return(
        
        <div className="paginator">
           {first && <div onClick={onClickHandler}>{first.page}</div>}
           {prev && (prev.page !== first.page) && <span>..</span> }
           {prev && (prev.page !== first.page) && <div onClick={onClickHandler}>{prev.page}</div>}
           <div style={{color: "white", backgroundColor: "#43D1AF"}}>{page}</div>
           {next && (last.page !== next.page) && <div onClick={onClickHandler}>{next.page}</div>}
           {next && (last.page !== next.page) && <span>..</span> }
           {last && <div onClick={onClickHandler}>{last.page}</div>}
        </div>
    );
    } else {
        return null;
    }
};

export default Paginator;
