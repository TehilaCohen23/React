import axios from "axios";
import User from "../interfaces/Users";

const api: string = process.env.REACT_APP_API + "/users" || "";

//check in login
export function signInUser(user: User) {
  const data = axios.get(
    `${api}?email=${user.email}&password=${user.password}`
  );
  return data;
}

//add user in sign up
export function addUser(newUser: User) {
  const data = axios.post(api, newUser);
  return data;
}
