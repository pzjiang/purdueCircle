import axios from 'axios';

//origin is the logged in user, target is the other user that is being messaged
//retrieves the messages in order of created time (at least should be)
//returns single array that contains all messages
//should be used in convo page
const getMessages = payload => axios.get(`api/v1/messages/${payload.convo_id}`);

//in the payload, send in logged in user id as origin_id, who is receiving the message as target_id, and the message as body
const sendMessage = payload => axios.put(`api/v1/sendmessage/`, payload);

//get the existing convos for the user
const getConvos = payload => axios.get(`api/v1/convos/${payload.user_id}`);

//create a new convo
//put in user_id param for logged in user, target_id for recipient
//will fail if existing convo between them already
const createConvo = payload => axios.post(`api/v1/convos`, payload)

//delete the convo
const deleteConvo = payload => axios.delete(`api/v1/convos/${payload.id}`);


const messagesApi = {
    getMessages,
    sendMessage,
    getConvos,
    createConvo,
    deleteConvo,

};

export default messagesApi;