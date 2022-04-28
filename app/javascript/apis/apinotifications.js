import axios from 'axios';

//get the existing convos for the user
const getNotifications = payload => axios.get(`api/v1/notifications/${payload.user_id}/${payload.number}`);
const readNotification = payload => axios.put(`api/v1/notifications/${payload.id}`);
const deleteNotification = payload => axios.delete(`api/v1/notification/${payload.id}`);
const deleteAllNotifications = payload => axios.delete(`api/v1/notificationsall/${payload.id}`);



const notificationsApi = {
    getNotifications,
    readNotification,
    deleteNotification,
    deleteAllNotifications,
};

export default notificationsApi;