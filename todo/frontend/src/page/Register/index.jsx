import { useState } from 'react'
import './index.less'
import { Input, message } from 'antd'
// import { register } from '../../service';
import { useNavigate } from 'react-router-dom';
import { register } from '../../service';
import rightArrowIcon from '../../assets/icon/arrow-right.svg'

export default function Register() {

  const [username, setUsername] = useState('')
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const submit = () => {

    if (!username || !account || !password) {
      message.warning('信息填写不完整！');
      return;
    }

    let data = {
      username: username,
      account: account,
      password: password
    }

    register(data).then(
      res => {
        if (res.code === 200) {
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('username', res.data.username);
          message.success('注册成功！');
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else if (res.code === 400) {
          message.warning("账号已存在！")
        } else if (res.code === 500) {
          message.error("用户注册失败，请重试！");
        }
      }
    ).catch(
      err => {
        console.error(err);
        message.error("出错了，请重试！");
      }
    )
  }

  return (
    <div className='app-register-wrap'>
      <div className='register-box'>
        <div className='register-form-box'>
          <div className='register-form-title'>TODO&IT</div>
          <div className='register-form'>
            <div className='input-box'>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: '8px',
                  fontSize: '18px'
                }}
                placeholder='用户名'
              />
            </div>
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
            {/* <div className='signIn' >登录</div> */}
            <div className='signUp' onClick={submit}>注册</div>
          </div>
        </div>
        <div className='register-right-box' >
          <div className='arrow-box' onClick={() => { navigate('/login') }}>
            <img src={rightArrowIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
