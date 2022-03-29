import axios from 'axios';

//get posts by topic
const pullPosts = (payload) => axios.get(`api/v1/topicspull/${payload.number}/${payload.topic}`);

//get the topics that belong to a post
const pullTopics = (payload) => axios.get(`api/v1/topics/post/${payload.post_id}`);

//discover topics throug hsearching name

const discoverTopics = (payload) => axios.get(`api/v1/topicsdiscover/${payload.name}/${payload.number}`);



const topicsApi = {
    pullPosts,
    pullTopics,
    discoverTopics,
};

export default topicsApi;