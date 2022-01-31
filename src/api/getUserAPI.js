import axios from "axios";
export const getUserAPI = async () => {
  try {
    const url = "https://randomuser.me/api/?results=20";
    const res = await axios.get(url);
    return res;
  } catch (e) {
    console.log(e);
  }
};
