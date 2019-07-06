import React from 'react';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
    padding: 7px 20px;
    border-radius: 5px;
    background-color: #e8e8e8;
    margin-bottom: 20px;
    
    :hover{
        cursor: pointer;
    }
`;

const Button = (props) => {
    return(
        <ButtonWrapper onClick={props.onClick}>
            <p>
                {props.children}
            </p>
        </ButtonWrapper>
    )
}

export default Button;