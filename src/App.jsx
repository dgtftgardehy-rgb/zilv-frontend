import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [habits, setHabits] = useState([]) // 所有习惯
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('check') // check:普通, number:数字, special:特殊

  const verify = () => {
    if (code === '123456') { // 临时验证码
      setLoggedIn(true)
      setMessage('登录成功！')
    } else {
      setMessage('验证码错误（临时用123456）')
    }
  }

  const addHabit = () => {
    if (newName.trim()) {
      setHabits([...habits, {
        name: newName,
        type: newType,
        streak: 0,
        value: 0 // 数字型用
      }])
      setNewName('')
    }
  }

  const checkIn = (index) => {
    const updated = [...habits]
    updated[index].streak += 1
    if (updated[index].type === 'number') {
      updated[index].value += 1 // 示例增加1，可改
    }
    setHabits(updated)
  }

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>🛡️ 自律守护者</h1>
      {loggedIn ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>欢迎，{email}！</h2>

          <div style={{ margin: '20px 0' }}>
            <input placeholder="习惯名称（如早起、跑步）" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '10px', width: '60%' }} />
            <select onChange={e => setNewType(e.target.value)} style={{ padding: '10px' }}>
              <option value="check">普通打卡</option>
              <option value="number">数字记录（如公里、个数）</option>
              <option value="special">特殊挑战（连续天数）</option>
            </select>
            <button onClick={addHabit} style={{ padding: '10px' }}>添加</button>
          </div>

          <div>
            {habits.map((habit, index) => (
              <div key={index} style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', margin: '10px 0', borderRadius: '10px' }}>
                <h3>{habit.name} 🔥 {habit.streak} 天</h3>
                {habit.type === 'number' && <p>今日记录：{habit.value}</p>}
                {habit.type === 'special' && <p>健康提示：保持规律排精有利于身心健康</p>}
                <button onClick={() => checkIn(index)}>今天打卡</button>
              </div>
            ))}
            {habits.length === 0 && <p style={{ textAlign: 'center' }}>添加第一个习惯开始坚持吧！</p>}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <p>邮箱登录（临时测试）</p>
          <input type="email" placeholder="输入邮箱" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', width: '80%' }} />
          <br /><br />
          <button onClick={() => setMessage('验证码已发送（临时用123456）')} style={{ padding: '12px 24px' }}>
            发送验证码
          </button>
          <br /><br />
          <input placeholder="验证码（临时123456）" value={code} onChange={e => setCode(e.target.value)} style={{ padding: '12px', width: '80%' }} />
          <br /><br />
          <button onClick={verify} style={{ padding: '12px 24px' }}>
            登录
          </button>
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>{message}</p>
    </div>
  )
}

export default App
