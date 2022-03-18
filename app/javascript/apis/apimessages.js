import axios from 'axios';

//origin is the logged in user, target is the other user that is being messaged
//retrieves the messages in order of created time
//returns single array that contains all messages
const getMessages = payload => axios.get(`api/v1/messages/${payload.origin_id}/${payload.target_id}`);

//in the payload, send in logged in user id as origin_id, who is receiving the message as target_id, and the message as body
const sendMessage = payload => axios.put(`api/v1/sendmessage/`, payload);

const messagesApi = {
    getMessages,
    sendMessage,

};

export default messagesApi;