import { api } from "./client";

export function getUserProfileApi(userId) {
    return api.get(`/users/profile/${userId}`);
}

export function updateProfileApi(userId, data) {
    return api.put(`/users/profile/${userId}`, data);
}

export function followUserApi(userId) {
    return api.post(`/users/follow/${userId}`);
}

export function unfollowUserApi(userId) {
    return api.post(`/users/unfollow/${userId}`);
}

export function searchUsersApi(query) {
    return api.get(`/users/search?q=${query}`);
}

export function getUserFollowersApi(userId) {
    return api.get(`/users/${userId}/followers`);
}

export function getUserFollowingApi(userId) {
    return api.get(`/users/${userId}/following`);
}

export function getUserPostsApi(userId) {
    return api.get(`/users/${userId}/posts`);
}
