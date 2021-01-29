import { api } from "infraestructure/helpers";

function findById(id) {
    return api.get(`user/${id}`);
}
function findTaskById(id) {
    return api.get(`user/${id}/tasks`);
}

function findAll() {
    return api.get("user");
}
function save(body) {
    return api.post("user", body);
}

export const userService = {
    findById,
    findAll,
    save,
    findTaskById,
};
