import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import {connect} from "react-redux";
import ACTIONS from "../redux/action";

const GnomeProfilePicDiv = styled.div`
    width: 100%;
    background-image: url(${props => props.img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 160px;
`;

const GnomeNameWrapperDiv = styled.div`
    border-bottom: 1px solid ${props => props.theme.gray};
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const GnomeNameH3 = styled.h3`
    margin: 0;
    text-align: center;
`;

const GnomeInfoBoxDiv = styled.div`
    width: 100%;
    padding: 10px;
    overflow-y: auto;
`;

const GnomeInfoTitleP = styled.p`
    font-weight: bold;
`;

const GnomeInfoP = styled.p`
    margin-bottom: 2px;
`;


const BlackScreenDiv = styled.div`
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
    
    
`;

const GnomeCardModalDiv = styled.div`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    opacity: ${props => props.visible ? 1 : 0};
    transform: ${props => props.visible ? 'translateX(-75.3%)' : 'translateX(-200%)'};
    background-color: white;
    z-index: 11;
    position: fixed;
    top: 0;
    height: 100%;
    width: 40%;
    transition: transform 1s, visibility 1s, opacity 1s;
    box-shadow: 2px 0 5px #00000061;
    
    @media(max-width: 768px){
        width: 100%;
        transform: ${props => props.visible ? 'translateX(0%)' : 'translateX(-200%)'};
    }
`;

const FlexBoxDiv = styled.div`
    display: flex;
`;

const GnomeInfoHalfDiv = styled.div`
    width 50%;
    display: inline-block;
`;

const GnomeFriendsHeadWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const GnomeCardModal = (props) => {
    const [showModal, handleShowModal] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => {
            return handleShowModal(true);
        }, 100)
    }, []);

    const handleAddFriend = () => {
        props.addFriend(props.data);
    }

    const handleunfriend = () => {
        props.unfriend(props.data.id);
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const handleClose = (e) => {
        e.stopPropagation();

    }

    let isFriend = props.friends.filter(friend => friend.friend.id === props.data.id).length > 0;
    console.log(props.data.id);

    return(
        <React.Fragment>
            <BlackScreenDiv visible={showModal && !props.isClosing} onClick={() => {props.handleClose()}}/>
            <GnomeCardModalDiv visible={showModal  && !props.isClosing}
                               onClick={window.innerWidth > 768 ? stopPropagation : () => {props.handleClose()}}
            >
                <GnomeProfilePicDiv img={props.data.thumbnail}/>
                <GnomeInfoBoxDiv>
                    <GnomeNameWrapperDiv>
                        <GnomeNameH3>{props.data.name}</GnomeNameH3>
                    </GnomeNameWrapperDiv>
                    <FlexBoxDiv>
                        <GnomeInfoHalfDiv>
                            <GnomeInfoTitleP>Profession:</GnomeInfoTitleP>
                            <ul>
                                {props.data.professions.length > 0 ?
                                    props.data.professions.map((profession, index) => (
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
                                    <GnomeInfoP>Age: {props.data.age} y/o</GnomeInfoP>
                                </li>
                                <li>
                                    <GnomeInfoP>Height: {(props.data.height/100).toFixed(2)} m</GnomeInfoP>
                                </li>
                                <li>
                                    <GnomeInfoP>Weight: {props.data.weight.toFixed(2)} kg</GnomeInfoP>
                                </li>
                                <li>
                                    <GnomeInfoP>Hair color: {props.data.hair_color}</GnomeInfoP>
                                </li>
                            </ul>
                        </GnomeInfoHalfDiv>
                    </FlexBoxDiv>
                    <hr/>
                    <GnomeFriendsHeadWrapper>
                        <GnomeInfoTitleP>Friends:</GnomeInfoTitleP>
                        <Button onClick={isFriend ? handleunfriend : handleAddFriend}>
                            {isFriend ? 'Unfriend' : 'Become friends'}
                        </Button>
                    </GnomeFriendsHeadWrapper>
                    {props.data.friends.length > 0 || isFriend ? (
                        <ul>
                            {props.data.friends.map((friend, index) => (
                                <li key={index}>
                                    <GnomeInfoP>{friend}</GnomeInfoP>
                                </li>
                            ))}
                            {isFriend ?
                                <li>
                                    <GnomeInfoP>You</GnomeInfoP>
                                </li>
                            : null}
                        </ul>
                    ) : (
                        <p>This gnome is too busy to have friends :(</p>
                    )}
                </GnomeInfoBoxDiv>
            </GnomeCardModalDiv>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    friends: state.friends
});

const mapDispatchToProps = dispatch => ({
    addFriend: friend => dispatch(ACTIONS.addFriend(friend)),
    unfriend: id => dispatch(ACTIONS.unfriend(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GnomeCardModal);