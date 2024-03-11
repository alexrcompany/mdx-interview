import http from "../http-common.ts";
import IUserData from "../types/User.ts";
import IUserUpdateData from "../types/UserUpdate.ts";

const getAll = () => {
  return http.get<Array<IUserData>>("/users");
};

const get = (id: any) => {
  return http.get<IUserData>(`/users/${id}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/users", data);
};

const update = (id: any, data: IUserUpdateData) => {
  return http.put<any>(`/users/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/users/${id}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default UserService;