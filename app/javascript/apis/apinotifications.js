import axios from 'axios';

//get the existing convos for the user
const getNotifications = payload => axios.get(`api/v1/notifications/${payload.user_id}`);



const notificationsApi = {
    getNotifications,
};

export default notificationsApi;