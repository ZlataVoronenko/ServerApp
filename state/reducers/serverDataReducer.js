const initialState = {
    serverData: null,
};

const serverDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVE_SERVER_DATA':
            return {
                ...state,
                serverData: action.payload,
            };
        default:
            return state;
    }
};

export default serverDataReducer;
