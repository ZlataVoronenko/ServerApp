export const receiveServerData = (data) => {
    return {
        type: 'RECEIVE_SERVER_DATA',
        payload: data,
    };
};
