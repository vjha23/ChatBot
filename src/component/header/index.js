import React from 'react'
import '../../css/header.scss'
import { FiChevronDown, FiRefreshCcw } from "react-icons/fi";


function Header(props) {
    return (
        <div className='headerContainer'>
            <div className='iconContainer'>
                <div> <FiRefreshCcw className='iconelement' onClick={props.handleRefresh}/></div>
                <div> <FiChevronDown className='iconelement' onClick={props.handleBodyTransition}/></div>
            </div>
        </div>
    )
}

export default Header
