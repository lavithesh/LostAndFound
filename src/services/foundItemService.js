import api from "./api";

export const getFoundItems = () => {
    return api.get("/foundItem");
};

export const addFoundItem = (foundItem) => {
    return api.post("/foundItem", foundItem);
};

export const getMyFoundItems = () => {
    return api.get("/my-found-items");
};
export const deleteFoundItem = (id) => {
    return api.delete(`/foundItem/${id}`);
};
export const updateFoundItem = (id, foundItem) => {
    return api.put(`/foundItem/${id}`, foundItem);
};