import { api } from "infraestructure/helpers";

function save(body) {
    return api.post("userTasks", body);
}

function deleteById(id) {
    return api.remove(`userTasks/${id}`);
}
export const taskService = {
    save,
    deleteById,
};
