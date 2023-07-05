import axios from "axios";

export const GetPowerSourcesData = () => {
  const api="https://api.thunder.softoo.co/vis/api/dashboard/ssu/fixed";
  return axios.get(api).then(res => res.data);
}