import React from "react";

import {Link} from 'react-router-dom';
import './home.page.scoped.css';
import './link.scoped.css';

const HomePage: React.FC<any> = () => {
    return (
        <React.Fragment>
            <div className="container vertical_center flex-row">
                <div className="mid_container__right">
                    <div className="vertical_center">
                        <p className={'strong-title'}>
                            generate
                        </p>
                        <p className={'strong-title'}>
                            exhilarate
                        </p>
                        <p className={'strong-title'}>
                            experience
                        </p>
                    </div>
                </div>
                <div className="mid_container__left">
                    <img className="mid_container__img" src={`${process.env.PUBLIC_URL}/media/images/laptop_dance.png`}
                         alt=""/>
                </div>
            </div>
            <div className="container footer">
                <div className="action-call">
                    <p>Not impressed yet? Try switching the <span className="action-call__action">mode</span> !</p>
                </div>
                <span className="horizontal">
                    <p>Already know who I am?</p>
                    <Link to={'hire'} className="r-link ai-element ai-element_type1 ai-element1">
                        <span className="ai-element__label">Hire me</span>
                    </Link>
                </span>
            </div>
        </React.Fragment>
    )
}

export default HomePage;
