// types of action
const Types = {
    ADD_FRIEND: "ADD_FRIEND",
    UNFRIEND: "UNFRIEND"
};
// actions
const addFriend = friend => ({
    type: Types.ADD_FRIEND,
    payload: friend
});

const unfriend = id => ({
    type: Types.UNFRIEND,
    payload: id
});

export default {
    addFriend,
    unfriend,
    Types
};