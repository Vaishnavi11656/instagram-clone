import { api } from "./client";

export function getPostsApi() {
    return api.get("/posts");
}

export function createPostApi({ imageUrl, caption }) {
    return api.post("/posts", { imageUrl, caption });
}

export function uploadFileApi(file) {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/posts/upload", formData);
}

export function updatePostApi(postId, { imageUrl, caption }) {
    return api.put(`/posts/${postId}`, { imageUrl, caption });
}

export function deletePostApi(postId) {
    return api.delete(`/posts/${postId}`);
}