import axios from 'axios';

const discoverUsers = (payload) => axios.get(`api/v1/usersearch/${payload.name}/${payload.number}`);

const findUser = (payload) => axios.get(`api/v1/userfind/${payload.name}`);

const changePrivacy = (payload) => axios.put(`api/v1/userprivacy/${payload.id}`);

const userApi = {

    discoverUsers,
    findUser,
    changePrivacy,

}

export default userApi;