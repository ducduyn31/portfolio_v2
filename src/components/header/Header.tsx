import React from "react";

import './Header.scoped.css';

import {Link, NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type IconTitleProps = {
    icon: IconProp,
}

const IconTitle: React.FC<IconTitleProps> = (props) => {
    return (
        <span> <FontAwesomeIcon icon={props.icon}/> {props.children} </span>
    );
}

const Header: React.FC<any> = () => {
    return (
        <nav>
            <ul>
                <li><NavLink activeClassName={'activated'} to={'/home'}><IconTitle icon={"home"}>Home</IconTitle></NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/projects'}><IconTitle icon={"coffee"}>Projects</IconTitle></NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/interact'}><IconTitle icon={"terminal"}>Playground</IconTitle></NavLink></li>
                <li><NavLink activeClassName={'activated'} to={'/hire'}><IconTitle icon={"user-plus"}>Hire me</IconTitle></NavLink></li>
            </ul>
            <Link to={''} className={'btn'}>Get My Resume</Link>
        </nav>
    )
}

export default Header;
