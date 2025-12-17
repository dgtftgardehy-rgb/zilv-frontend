import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  // 临时后端（等后端做好再换）
  const BACKEND_URL = 'https://example.com' // 先占位，功能开发中用本地状态

  const sendCode = async () => {
    // 临时模拟发送（真实后端做好再连）
    setMessage('验证码已发送（模拟，真实功能即将上线）')
  }

  const verify = () => {
    if (code === '123456') { // 临时验证码123456
      setLoggedIn(true)
      setMessage('登录成功！欢迎回来')
    } else {
      setMessage('验证码错误（临时用123456测试）')
    }
  }

  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '40px' }}>
      <h1>🛡️ 自律守护者</h1>
      {loggedIn ? (
        <div>
          <h2>欢迎回来，{email}！</h2>
          <p>打卡主功能开发中，很快上线～</p>
        </div>
      ) : (
        <div>
          <p>用邮箱登录，数据永久保存</p>
          <input 
            type="email" 
            placeholder="输入邮箱" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '12px', width: '300px', margin: '10px' }} 
          />
          <br />
          <button onClick={sendCode} style={{ padding: '12px 24px', margin: '10px' }}>
            发送验证码
          </button>
          <br />
          <input 
            placeholder="输入验证码（临时123456）" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            style={{ padding: '12px', width: '300px', margin: '10px' }} 
          />
          <br />
          <button onClick={verify} style={{ padding: '12px 24px', margin: '10px' }}>
            登录
          </button>
        </div>
      )}
      <p style={{ marginTop: '30px' }}>{message}</p>
    </div>
  )
}

export default App
