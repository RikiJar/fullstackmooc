import axios from "axios";
const baseurl = "/api/persons";

axios.defaults.withCredentials = true;

const getAll = () => {
    return axios.get(baseurl);
}

const create = (newObject) => {
    return axios.post(baseurl, newObject);
}

const update = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject);
}

const remove = (id) => {
    return axios.delete(`${baseurl}/${id}`);
}

export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
};
