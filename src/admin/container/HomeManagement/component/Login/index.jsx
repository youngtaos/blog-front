import { Guard } from "@authing/react-ui-components";
// 引入 css 文件
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
    // 替换你的 AppId
    const appId = "63858a0caa6255ed2a69abe7";

    const onLogin = (userInfo) => {
        window.localStorage.token = userInfo.token;
        window.localStorage.tokenExpiredAt = userInfo.tokenExpiredAt;
        window.localStorage.photo = userInfo.photo;
        console.log(userInfo);
        window.location.reload();
    };

    return <Guard appId={appId} onLogin={onLogin} />;
};
export default Login;
