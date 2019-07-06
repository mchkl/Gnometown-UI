import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
    friends: []
};

const friendsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.Types.ADD_FRIEND: {
            let newState = _.cloneDeep(state);
            let friend = action.payload;
            let newFriend = { friend };
            newState.friends.push(newFriend);
            return newState;
        }

        case ACTIONS.Types.UNFRIEND: {
            let newState = _.cloneDeep(state);
            let index = _.findIndex(newState.friends, { id: action.payload });
            newState.friends.splice(index, 1);
            return newState;
        }

        default:
            return state;
    }
};

export default friendsReducer;