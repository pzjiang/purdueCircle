import axios from 'axios';

//get the existing convos for the user
const getNotifications = payload => axios.get(`api/v1/notifications/${payload.user_id}`);

//adds a notification for the user
//const addNotifications = payload = axios.put();

const notificationsApi = {
    getNotifications,
    //addNotifications,
};

export default notificationsApi;