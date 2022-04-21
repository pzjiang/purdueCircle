import axios from 'axios';

//get a number of posts, not filtering by anything
const getPost = payload => axios.get(`api/v1/posts/${payload.number}/index`);

//get the information of a specific post of id
const showPost = payload => axios.get(`api/v1/posts/${payload.id}/`);

//create a post
const createPost = payload => axios.post(`api/v1/posts/`, payload);

//edit a specific post
const editPost = payload => axios.put(`api/v1/posts/${payload.id}`, payload);

//delete a post of id
const deletePost = payload => axios.delete(`api/v1/posts/${payload.id}`);

//change the like status of a post (user likes a post)
const incrementLike = payload => axios.put(`api/v1/likes/`, payload);

//function used to see if user has already liked the post, used on page load to determine initial status
const likesPost = payload => axios.get(`api/v1/likespost/${payload.user_id}/${payload.post_id}/`);

//function to retrieve all of your liked posts
const getLiked = payload => axios.get(`api/v1/likedposts/${payload.number}/${payload.id}`);

//get own posts 
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

//get the saved posts
const getSave = payload => axios.get(`api/v1/savepost/${payload.id}/${payload.number}`);

//time line functions get the posts of followed topics, and the posts of followed users
//get "timetopics/:id/:number", to: "posts#get_followed_topics"
//get "timeusers/:id/:number", to: "posts#get_followed_users"
const timeTopics = payload => axios.get(`api/v1/timetopics/${payload.id}/${payload.number}`);
const timeUsers = payload => axios.get(`api/v1/timeusers/${payload.id}/${payload.number}`);




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
    timeTopics,
    timeUsers,
    getSave,
    getLiked,


};

export default postsApi;