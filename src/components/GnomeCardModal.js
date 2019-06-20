import React from "react";
import styled from "@emotion/styled";

const GnomeProfilePicDiv = styled('div')`
    width: 100%;
    background-image: url(${props => props.img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 160px;
`;

const GnomeNameWrapperDiv = styled('div')`
    border-bottom: 1px solid ${props => props.theme.gray};
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const GnomeNameH3 = styled('h3')`
    margin: 0;
    text-align: center;
`;

const GnomeInfoBoxDiv = styled('div')`
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    heigth: 100%
`;

const GnomeInfoTitleP = styled('p')`
    font-weight: bold;
`;

const GnomeInfoP = styled('p')`
    margin-bottom: 2px;
`;


const BlackScreenDiv = styled('div')`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    opacity: ${props => props.visible ? '1' : '0'};
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5882352941176471);
    position: fixed;
    z-index: 10;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: ${props => props.visible ? 'auto' : 'none'};
    transition: opacity 1s, visibility 1s;
    
    :hover{
        cursor: pointer;
    }
`;

const GnomeCardModalDiv = styled('div')`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    opacity: ${props => props.visible ? 1 : 0};
    transform: ${props => props.visible ? 'translateX(-77.3%)' : 'translateX(-200%)'};
    background-color: white;
    z-index: 11;
    position: fixed;
    top: 0;
    // height: 200px;
    height: 100%;
    width: 40%;
    transition: transform 1s, visibility 1s, opacity 1s;
    box-shadow: 2px 0 5px #00000061;
    
    @media(max-width: 768px){
        width: 100%;
        transform: ${props => props.visible ? 'translateX(0%)' : 'translateX(-200%)'};
    }
`;

const FlexBoxDiv = styled('div')`
    display: flex;
`;

const GnomeInfoHalfDiv = styled('div')`
    width 50%;
    display: inline-block;
`;


export default class GnomeCardModalElement extends React.Component {
    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.props.handleClose();
    }

    render(){
        return(
            <React.Fragment>
                <BlackScreenDiv visible={this.props.showMore} onClick={this.handleClose}/>
                <GnomeCardModalDiv visible={this.props.showMore}
                                   onClick={this.props.windowWidth > 768 ? null : this.handleClose}
                >
                    <GnomeProfilePicDiv img={this.props.data.thumbnail}/>
                    <GnomeInfoBoxDiv>
                        <GnomeNameWrapperDiv>
                            <GnomeNameH3>{this.props.data.name}</GnomeNameH3>
                        </GnomeNameWrapperDiv>
                        <FlexBoxDiv>
                            <GnomeInfoHalfDiv>
                                <GnomeInfoTitleP>Profession:</GnomeInfoTitleP>
                                <ul>
                                    {this.props.data.professions.length > 0 ?
                                        this.props.data.professions.map((profession, index) => (
                                            <li key={index}>
                                                <GnomeInfoP>{profession}</GnomeInfoP>
                                            </li>
                                        ))
                                        :
                                        <p>This gnome has no job :(</p>
                                    }
                                </ul>
                            </GnomeInfoHalfDiv>
                            <GnomeInfoHalfDiv>
                                <GnomeInfoTitleP>Info:</GnomeInfoTitleP>
                                <ul>
                                    <li>
                                        <GnomeInfoP>Age: {this.props.data.age} y/o</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Height: {(this.props.data.height/100).toFixed(2)} m</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Weight: {this.props.data.weight.toFixed(2)} kg</GnomeInfoP>
                                    </li>
                                    <li>
                                        <GnomeInfoP>Hair color: {this.props.data.hair_color}</GnomeInfoP>
                                    </li>
                                </ul>
                            </GnomeInfoHalfDiv>
                        </FlexBoxDiv>
                        <hr/>
                        <GnomeInfoTitleP>Friends:</GnomeInfoTitleP>
                        {this.props.data.friends.length > 0 ? (
                            <ul>
                                {this.props.data.friends.map((friend, index) => (
                                    <li key={index}>
                                        <GnomeInfoP>{friend}</GnomeInfoP>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>This gnome is too busy to have friends :(</p>
                        )}
                    </GnomeInfoBoxDiv>
                </GnomeCardModalDiv>
            </React.Fragment>
        )
    }
}