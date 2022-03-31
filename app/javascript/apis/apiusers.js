import axios from 'axios';

const discoverUsers = (payload) => axios.get(`api/v1/usersearch/${payload.name}/${payload.number}`);

const findUser = (payload) => axios.get(`api/v1/userfind/${payload.name}`);

const showUser = (payload) => axios.get(`api/v1/user/${payload.id}`);

const changePrivacy = (payload) => axios.put(`api/v1/userprivacy/${payload.id}`);

const followUser = (payload) => axios.post(`api/v1/followuser`, payload);

const isFollowing = (payload) => axios.get(`api/v1/followinguser/${payload.id}/${payload.target_id}`);

const unfollowUser = (payload) => axios.delete(`api/v1/followuser/${payload.id}/${payload.target_id}`);

const getFollowers = (payload) => axios.get(`api/v1/userfollowers/${payload.id}`);

const getFollowed = (payload) => axios.get(`api/v1/userfollowing/${payload.id}`);

const blockUser = (payload) => axios.post(`api/v1/blockuser/${payload.id}/${payload.target_id}`);

const unblockUser = (payload) => axios.delete(`api/v1/unblockuser/${payload.id}/${payload.target_id}`);

const userApi = {

    discoverUsers,
    findUser,
    changePrivacy,
    followUser,
    isFollowing,
    unfollowUser,
    getFollowers,
    getFollowed,
    blockUser,
    unblockUser,

}

export default userApi;