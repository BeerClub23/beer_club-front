import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './accordion.scss';

const Accordion = ({title, content, isActive, setQuestion}) => {

    return (
      <section className={`bc-accordion ${isActive ? 'active' : ''}`} onClick={setQuestion}>
        <div className='bc-accordion-title'>{title}<KeyboardArrowDownIcon className='bc-accordion-arrow' sx={{ fontSize: "30px" }}/></div>
        <hr/>
        <div className='bc-accordion-content'>
            {
                content
            }
        </div>
      </section>   
    )
  }
  
  export default Accordion;