import axios from 'axios';

//get the existing convos for the user
const getConvos = payload => axios.get(`api/v1/convos/${payload.user_id}`);


const notificationsApi = {
    getMessages,
    sendMessage,
    getConvos,
    createConvo,
    deleteConvo,

};

export default notificationsApi;