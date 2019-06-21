import React, { useState } from "react";
import styled from "@emotion/styled";
//Lazyload images
import LazyLoad from "react-lazyload";
import RollingSVG from "../img/rollingSVG.svg";
//Local components
import GnomeCardModal from "./GnomeCardModal";

const GnomeCardDiv = styled.div`
    width: 25%;
    display: inline-block;
    background: white;
    margin: 10px;
    height: fit-content;
    box-shadow: 0 1px 5px #00000029;
    transition: width 0.5s;
    
    h3{
        font-size: 17px;
    }
    
    :hover{
        cursor: pointer;
    }
    
    @media(max-width: 768px){
        width: 40%;
    }
`;

const GnomeProfilePicImg = styled.img`
    width: 100%;
    object-fit: cover;
    height: 160px;
    display: ${props => props.loaded ? 'block' : 'none'};
    
    animation: ${props => props.loaded ? 'fadeInImg cubic-bezier(0.23, 1, 0.32, 1) 1' : 'none'};
    opacity: 0;
    animation-fill-mode: forwards;
    animation-duration: 0.7s;
    animation-delay: 0.1s;
    
    @keyframes fadeInImg{
        from{
            opacity: 0
        }
        to{
            opacity: 1
        }
    }
    
`;

const GnomeNameH3 = styled.h3`
    margin: 0;
    text-align: center;
`;

const GnomeInfoBoxDiv = styled.div`
    width: 100%;
    padding: 10px;
    
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceholderWrapper = styled.div`
    width: 100%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlaceholderImg = styled.img`
    width: 50%;
    height: auto;
    
    animation: rotate 0.5s infinite ease-in-out;
    
    @keyframes fadeInImg{
        from{ transform: rotate(0deg); }
        to{ transform: rotate(360deg); }
    }
`;


const Placeholder = () => {
    return(
        <PlaceholderWrapper>
            <PlaceholderImg src={RollingSVG}></PlaceholderImg>
        </PlaceholderWrapper>
    )
}

const GnomeCard = (props) => {
    const [showMore, handleShowMore] = useState(false);
    const [imgLoaded, handleLoadImg] = useState(false);

    const handleClick = () => {
        return handleShowMore(true);
    }

    const handleClose = () => {
        return handleShowMore(false);
    }

    const onLoad = () => {
        return handleLoadImg(true);
    }

    return (
        <React.Fragment>
            <GnomeCardModal {...props}
                            showMore={showMore}
                            handleClose={handleClose}
            />
            <GnomeCardDiv onClick={handleClick} id='gnome-card'>
                <LazyLoad offsetTop={400} debounce={false} once={true}>
                    <GnomeProfilePicImg onLoad={onLoad} loaded={imgLoaded} src={props.data.thumbnail}/>
                </LazyLoad>
                {imgLoaded ? null : <Placeholder />}
                <GnomeInfoBoxDiv>
                    <GnomeNameH3>{props.data.name}</GnomeNameH3>
                </GnomeInfoBoxDiv>
            </GnomeCardDiv>
        </React.Fragment>
    )
}

export default GnomeCard