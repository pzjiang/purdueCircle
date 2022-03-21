import axios from 'axios';

const pullPosts = (payload) => axios.get(`api/v1/topicspull/${payload.number}/${payload.topic}`);


const pullTopics = (payload) => axios.get(`api/v1/topics/post/${payload.post_id}`);



const topicsApi = {
    pullPosts,
    pullTopics,
};

export default topicsApi;