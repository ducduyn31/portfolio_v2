import React from "react";

import './Header.scoped.css';

import {Link, NavLink} from 'react-router-dom';

const Header: React.FC<any> = () => {
    return (
        <nav>
            <ul>
                <li><NavLink activeClassName={'activated'} to={'/home'}>Home</NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/projects'}>Projects</NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/interact'}>Playground</NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/hire'}>Hire me</NavLink></li>
            </ul>
            <Link to={''} className={'btn'}>Get My Resume</Link>
        </nav>
    )
}

export default Header;
