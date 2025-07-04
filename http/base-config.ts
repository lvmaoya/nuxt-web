let baseURL: string;
if (process.env.NODE_ENV === "development") {
  // BASE_URL = "	http://127.0.0.1:4523/m1/1770943-0-default";
  baseURL = "https://api.lvmaoya.cn";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://api.lvmaoya.cn";
} else {
  baseURL = "https://sunjianxiang.cn:3000";
}
export default baseURL;
