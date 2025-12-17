import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [habits, setHabits] = useState([]) // 临时本地习惯
  const [newHabit, setNewHabit] = useState('')

  const sendCode = () => {
    setMessage('验证码已发送！（临时模拟，用123456登录）')
  }

  const verify = () => {
    if (code === '123456') {
      setLoggedIn(true)
      setMessage('登录成功！')
    } else {
      setMessage('验证码错误（临时用123456）')
    }
  }

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { name: newHabit, streak: 0 }])
      setNewHabit('')
    }
  }

  const checkIn = (index) => {
    const updated = [...habits]
    updated[index].streak += 1
    setHabits(updated)
  }

  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '20px', minHeight: '100vh' }}>
      <h1>🛡️ 自律守护者</h1>
      {loggedIn ? (
        <div>
          <h2>欢迎，{email}！</h2>
          <input 
            placeholder="添加新习惯（如早起、健身）" 
            value={newHabit} 
            onChange={(e) => setNewHabit(e.target.value)} 
            style={{ padding: '10px', width: '80%', margin: '10px' }} 
          />
          <button onClick={addHabit} style={{ padding: '10px' }}>添加</button>
          <div style={{ marginTop: '30px' }}>
            <h3>我的习惯</h3>
            {habits.map((habit, index) => (
              <div key={index} style={{ margin: '20px', background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '10px' }}>
                <p>{habit.name} 🔥 {habit.streak} 天</p>
                <button onClick={() => checkIn(index)}>今天打卡</button>
              </div>
            ))}
            {habits.length === 0 && <p>还没有习惯，添加一个开始吧！</p>}
          </div>
        </div>
      ) : (
        <div>
          <p>邮箱登录（临时测试）</p>
          <input 
            type="email" 
            placeholder="输入邮箱" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '12px', width: '80%', margin: '10px' }} 
          />
          <br />
          <button onClick={sendCode} style={{ padding: '12px 24px', margin: '10px' }}>
            发送验证码
          </button>
          <br />
          <input 
            placeholder="验证码（临时123456）" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            style={{ padding: '12px', width: '80%', margin: '10px' }} 
          />
          <br />
          <button onClick={verify} style={{ padding: '12px 24px', margin: '10px' }}>
            登录
          </button>
        </div>
      )}
      <p>{message}</p>
    </div>
  )
}

export default App
