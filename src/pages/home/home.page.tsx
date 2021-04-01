import React from "react";

import {Link} from 'react-router-dom';
import './home.page.scoped.css';
import DynamicParagraph from '../../components/dynamic_paragraph/DynamicParagraph';

const generateProjectShowcase: React.ElementType = () => {
    return (
        <div>OK</div>
    )
}

const HomePage: React.FC<any> = () => {
    return (
        <React.Fragment>
            <div className={'description'}>
                <p className={'hello'}>Hello, I am Duy Nguyen</p>
                <DynamicParagraph content={generateProjectShowcase}>
                    <p className={'make'}>I make ....</p>
                </DynamicParagraph>
                <Link className={'btn'} to={'projects'}>Check out all projects</Link>
            </div>
        </React.Fragment>
    )
}

export default HomePage;
