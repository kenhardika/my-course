import React, { Component } from 'react';

async function loginAPI(data){
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch("https://staging.komunitasmea.com/api/login", {
        method:'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        mode: 'cors', 
        credentials: 'include',
        body: formBody,
      }).then((response) =>
       response.json()
      ).catch((reject)=>
      console.log(reject)
      );
}
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: 'default',
            password: 'default',
            errorLogin: false,
            name: '',
            user_id:'', 
        }
    }
    onChangeEvent(e){
      e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log(this.state);
    }
    changeState(key, value){
      this.setState({
        [key]:value
      })
      console.log(this.state);
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      const {history} = this.props
      const responseAPI = await loginAPI(this.state);        
      if (responseAPI.message === 'Success.'){
          console.log('login success');
          localStorage.setItem("data_user_login", JSON.stringify(this.state));
          history.push(`/mycourse/${responseAPI.data.user_id}`)
      } 
      else if(responseAPI.message !== 'Success.'){
        this.setState({
            errorLogin: true
        });
        console.log('Error: login failed, API fetch failed');
      }
       
}
    render() {

        return (
          <div className="loginPage">
            <div className="left-section">
              <div className="layerText">
                <p> KOMUNITAS MEA </p>
                <p> Komunitas Jago Jualan Online </p>
              </div>
            </div>
            <div className="right-section">
              <div className="right-layer">
                <div className="loginTitleLayer">
                  <p>MASUK</p>
                </div>
                <div className="loginBannerLayer">
                  <p>Silakan Masuk ke akun Komunitas MEA kamu!</p>
                </div>
                <form
                  className="formLayer"
                  method="post"
                  action="/"
                  onSubmit={this.handleSubmit}
                >
                  <div className="inputForm">
                    <label htmlFor="inputName">Nama Lengkap: </label>
                    <input
                      type="text"
                      id="inputName"
                      placeholder="Masukan Nama Lengkap"
                      name='name'
                    
                      onChange={(e)=> this.onChangeEvent(e)}
                      required
                    />
                  </div>

                  <div className="inputForm">
                    <label htmlFor="inputText">Email: </label>
                    {/* onchange nya coba dibikin method done */} 
                    <input
                      type="text"
                      id="inputText"
                      placeholder="Masukan Email"
                      // ini kasih nama email done
                      name="email"
                  
                      onChange={(e)=> this.onChangeEvent(e)}
                      required
                    />
                  </div>
                  <div className="inputForm">
                    <label htmlFor="inputPass">Kata Sandi: </label>
                    {/* onchange nya coba dibikin method done*/}
                    <input
                      type="password"
                      id="inputPass"
                      placeholder="Masukan Kata Sandi"
                      name='password'
                   
                      onChange={(e)=> this.onChangeEvent(e)}
                      required
                    />
                  </div>

                  <a href="/"> lupa kata sandi? </a>

                  <div className="layerButton">
                    <button id="submitBtn" type="submit">
                      Masuk
                    </button>
                  </div>
                  <div className="errorLayer"></div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
export default Login;       