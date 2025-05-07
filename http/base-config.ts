let baseURL: string;
if (process.env.NODE_ENV === "development") {
  // BASE_URL = "	http://127.0.0.1:4523/m1/1770943-0-default";
  baseURL = "http://localhost:8080";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "http://localhost:8080";
} else {
  baseURL = "https://sunjianxiang.cn:3000";
}
export default baseURL;
