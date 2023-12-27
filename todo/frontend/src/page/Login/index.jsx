import { useState } from 'react'
import './index.less'
import { Input, message } from 'antd'
import { login } from '../../service';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../../assets/icon/arrow-left.svg'

export default function Login() {

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const submit = () => {

    if (!account || !password) {
      message.warning('信息填写不完整！');
      return;
    }

    let data = {
      account: account,
      password: password
    }

    login(data).then(
      res => {
        if (res.code === 200) {
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('username', res.data.username);
          message.success('登录成功！');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          message.error(res.msg);
        }
      }
    )
  }

  return (
    <div className='app-login-wrap'>
      <div className='login-box'>
        <div className='login-left-box'>
          <div className='arrow-box' onClick={() => { navigate('/register') }}>
            <img src={leftArrowIcon} alt="" />
          </div>
        </div>
        <div className='login-form-box'>
          <div className='login-form-title'>TODO&IT</div>
          <div className='login-form'>
            <div className='input-box'>
              <Input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                style={{
                  padding: '8px',
                  fontSize: '18px'
                }}
                placeholder='账号'
              />
            </div>
            <div className='input-box'>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '8px',
                  fontSize: '18px'
                }}
                placeholder='密码'
              />
            </div>
          </div>
          <div className='btn-box'>
            <div className='signIn' onClick={submit}>登录</div>
            {/* <div className='signUp'>注册</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
