import axios from "axios";

export class BaseAPI {
  url: string;
  private static configureFlag = false;

  constructor(basePath: string) {
    this.url = "https://restful-booker.herokuapp.com" + basePath;
    this.configureAxios();
  }

  private configureAxios(): void {
    if (BaseAPI.configureFlag == true) {
      return;
    }
    axios.defaults.timeout = 20000;
    axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return error.response;
      }
    );
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    BaseAPI.configureFlag = true;
  }
}
