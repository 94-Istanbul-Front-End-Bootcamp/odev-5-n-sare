import React, {useState, useEffect} from "react";
import {Redirect, useHistory} from "react-router-dom";
import { Icon } from '../component/icon';


const Login = (props) => {
    
    //const {warning} =props;
    const history = useHistory();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    //const [warning, setWarning]=useState("");

    //const ref=React.useRef();
 
    const handleLogin = () => {
        let userData;
        fetch("userData.json")
        .then(res => res.json())
        .then(
          result => {
            for(let i in result){
                if(result[i].username===username && result[i].password === password){
                    //this.setState({currentUser: result[i]});
                    userData= result[i];
                    //console.log(result[i]);
                    const user={"username": userData.username, "password": userData.password, "name":userData.name, "isLoggedIn": true}
                    JSON.parse(localStorage.setItem("user", JSON.stringify(user)));
                }}
            // if(result.find(x => x.username === username && x.password===password )){
            //     console.log(result.name);
            //     const user={"username": username, "password": password, "isLoggedIn": true}
            //     //const user={"name": x.name, "isLoggedIn": true}
            //     JSON.parse(localStorage.setItem("user", JSON.stringify(user)));
            //     history.push("/home");
            //     }
                
                    const user={"isLoggedIn": false}
                    JSON.parse(localStorage.setItem("user", JSON.stringify(user)));

            
            
          },
          error => {
            console.log(error);
          }
        );
    }
    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleLogin}>
                <div className="login-icon-wrapper">
                    <Icon size={50} iconName="twitter" color="#1DA1F2" />
                </div>
                <div>
                    <p>{props.warning}</p>
                </div>
                <div>
                    <input className="user-name-input"
                        type="text" placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input className="password-input"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-submit-button">Login</button>
            </form>
        </div>
    );
}

export default Login;