import React, { useState } from "react";
import styled from "@emotion/styled";
//Redux
import ACTIONS from "../redux/action";
import { connect } from "react-redux";

const FriendsPopoverWrapper = styled.div`
    position: fixed;
    bottom: 0;
    right: 0px;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 0 1px 5px #00000029;
    z-index: 1;
    
    :hover{
        cursor: pointer;
    }
`;

const FriendsModalAndBgWrapper = styled.div`
    display: ${props => props.visible ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.visible ? 1 : 0};
    justify-content: center;
    align-items: center;
    z-index: 10;
    transition: opacity 0.3s;
`;

const FriendsModalWrapper = styled.div`
    width: 70%;
    display: ${props => props.visible ? 'block' : 'none' };
    border-radius: 10px;
    padding: 30px 20px;
    background-color: white;
    opacity: ${props => props.visible ? 1 : 0 };
    transform: translateY(${props => props.visible ? 0 : '-100px'});
    z-index: 11;
    
    transition: opacity 0.3s, transform 0.3s;
    
    h3{
        margin-bottom: 20px;
    }
    
    @media(max-width: 500px){
        width: 95%;
    }
`;

const FriendsModalHead = styled.div`
    display: flex;
    justify-content: space-between;
    
    p{
        :hover{
            cursor: pointer;
        }
    }
`;

const FriendsListUl = styled.ul`
    max-height: 400px;
    overflow: auto;
`;

const FriendLi = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const FriendInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UnfriendP = styled.p`
    margin-right: 5px;
    :hover{
        cursor: pointer;
    }
`;

const FriendPic = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    margin-right: 10px;
`;

const DarkBg = styled.div`
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

const FriendsPopover = (props) => {
    return(
        <FriendsPopoverWrapper onClick={props.onClick}>
            <p>
                Friends list ({props.friends.length})
            </p>
        </FriendsPopoverWrapper>
    )
}

const FriendsModal = (props) => {
    return(
        <FriendsModalAndBgWrapper visible={props.showModal}>
            <FriendsModalWrapper visible={props.showModal}>
                <FriendsModalHead>
                    <h3>
                        Your friends:
                    </h3>

                    <p onClick={props.closeModal}>
                        Close
                    </p>
                </FriendsModalHead>
                <FriendsListUl>
                    {props.friends.length > 0 ? props.friends.map((friend, i) => {
                            return <FriendLi key={i}>
                                <FriendInfoWrapper>
                                    <FriendPic src={friend.friend.thumbnail}/>
                                    <p>{friend.friend.name}</p>
                                </FriendInfoWrapper>
                                <UnfriendP onClick={() => { props.unfriend(friend.friend.id) }}>Unfriend</UnfriendP>
                            </FriendLi>
                        })
                        : <p>It seems like you still haven't made any friends in this town. :(</p>
                    }
                </FriendsListUl>
            </FriendsModalWrapper>
            <DarkBg visible={props.showModal} onClick={props.closeModal}/>
        </FriendsModalAndBgWrapper>
    )
}

const FriendsSection = (props) => {
    const [showModal, handleShowModal] = useState(false);

    const handleShowModalFunc = () =>{
        return handleShowModal(true);
    }

    const handleCloseModalFunc = () =>{
        return handleShowModal(false);
    }

    return (
        <React.Fragment>
            <FriendsModal {...props} closeModal={handleCloseModalFunc} showModal={showModal}/>
            <FriendsPopover {...props} onClick={handleShowModalFunc}/>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    friends: state.friends
});

const mapDispatchToProps = dispatch => ({
    unfriend: id => dispatch(ACTIONS.unfriend(id))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendsSection);