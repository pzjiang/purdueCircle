import axios from 'axios';

const getPost = payload => axios.get(`api/v1/posts/${payload.number}/index`);

const showPost = payload => axios.get(`api/v1/posts/${payload.id}/`);

const createPost = payload => axios.post(`api/v1/posts/`, payload);

const editPost = payload => axios.put(`api/v1/posts/${payload.id}`, payload);

const deletePost = payload => axios.delete(`api/v1/posts/${payload.id}`);

const incrementLike = payload => axios.put(`api/v1/likes/`, payload);

const likesPost = payload => axios.get(`api/v1/likespost/${payload.user_id}/${payload.post_id}/`);

const ownPosts = payload => axios.get(`api/v1/ownposts/${payload.user_id}/${payload.number}/`);

//pass in number of posts you want to grab and the user id
const getSaves = payload => axios.get(`api/v1/getsaves/${payload.id}/${payload.number}/`);

//change the privacy setting of the post
const changePrivacy = payload => axios.put(`api/v1/changeprivacy/${payload.id}/`);

//search the title of posts for a "search" pattern
const discoverPosts = payload => axios.get(`api/v1/postsdiscover/${payload.name}/${payload.number}`);

//change the save status of a post
//id is the post id, user id is the id of the logged in user
const changeSave = payload => axios.post(`api/v1/savepost/${payload.id}/${payload.user_id}`);

//time line functions

const getTimeTopics = payload => axios.get(`timetopics/${payload.id}`);
const getTimeUsers = payload => axios.get(``);




const postsApi = {
    getPost,
    createPost,
    editPost,
    showPost,
    deletePost,
    incrementLike,
    likesPost,
    ownPosts,
    changePrivacy,
    discoverPosts,
    getSaves,
    changeSave,


};

export default postsApi;