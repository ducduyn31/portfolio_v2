import React, {FC} from 'react';

type DynamicParagraphProps = {
    content: React.ElementType;
};

const DynamicParagraph: FC<DynamicParagraphProps> = (props) => {
    return (
        <React.Fragment>
            {props.children}
            <props.content/>
        </React.Fragment>
    )
}

export default DynamicParagraph;
