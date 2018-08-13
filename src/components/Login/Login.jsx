/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Header } from '../public';
import { getUrlParameter } from '../../utils/tool';
import { actionType as loginSaga } from '../../models/sagas/login.saga';
import styles from './login.css';

let HREF;

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      HEIGHT: 0,
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    HREF = getUrlParameter('callBackHref', window.location.href);
  }

  componentDidMount() {
    setTimeout(() => {
      const topDivHeight = this.topDiv.clientHeight;
      this.setState({
        HEIGHT: window.innerHeight - topDivHeight,
      });
    }, 10);
  }

  changeInput = (e, type) => {
    e.preventDefault();
    const val = e.target.value;
    this.setState({ [type]: val });
  }

  jumpPage = (link) => {
    window.location.href = link;
  }

  loginFunc = () => {
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch({
        type: loginSaga.loginFUNC,
        payload: {
          query: {
            username,
            password,
          },
          successFunc: (token) => {
            window.location.href = `${HREF}?token=${token}`;
          },
        },
      });
    }
  }

  render() {
    const { HEIGHT, username, password } = this.state;
    return (
      <div>
        <div
          ref={(div) => { this.topDiv = div; }}
        >
          <Header
            title="登录"
            noBackBtn
            clickFunc={() => this.goBackFunc()}
          />
        </div>

        <section
          className={styles.loginBox}
          style={{ height: HEIGHT }}
        >
          <input
            type="tel"
            placeholder="请输入手机号"
            value={username}
            className={styles.loginInput}
            onInput={e => this.changeInput(e, 'username')}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            className={styles.loginInput}
            onInput={e => this.changeInput(e, 'password')}
          />

          <div className={styles.loginLinks}>
            <div
              className={styles.loginForget}
              onClick={() => this.jumpPage('http://s.jiniutech.com/forget.html')}
            >
              忘记密码
            </div>
            <div
              className={styles.loginRegister}
              onClick={() => this.jumpPage('http://s.jiniutech.com/register.html')}
            >
              注册
            </div>
          </div>

          <button
            type="button"
            className={(username && password) ? styles.loginBtnActive : styles.loginBtn}
            onClick={this.loginFunc}
          >
            登录
          </button>
        </section>
      </div>
    );
  }
}

export default connect()(Login);
