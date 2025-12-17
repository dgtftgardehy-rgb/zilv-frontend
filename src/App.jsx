import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [habits, setHabits] = useState([])
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('check')
  const [selectedHabit, setSelectedHabit] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const verify = () => {
    if (code === '123456') {
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
        checkedDates: [], // 打卡日期
        records: {} // 数字记录 {date: value}
      }])
      setNewName('')
    }
  }

  const toggleCheck = (habitIndex, dateStr) => {
    const updated = [...habits]
    const habit = updated[habitIndex]
    if (habit.type === 'check' || habit.type === 'special') {
      if (habit.checkedDates.includes(dateStr)) {
        habit.checkedDates = habit.checkedDates.filter(d => d !== dateStr)
      } else {
        habit.checkedDates.push(dateStr)
      }
    } else if (habit.type === 'number') {
      habit.records[dateStr] = parseFloat(inputValue) || 0
      setInputValue('')
    }
    setHabits(updated)
  }

  const getStreak = (checkedDates) => {
    let streak = 0
    const today = format(new Date(), 'yyyy-MM-dd')
    for (let d = new Date(); ; d.setDate(d.getDate() - 1)) {
      const dateStr = format(d, 'yyyy-MM-dd')
      if (dateStr > today) continue
      if (checkedDates.includes(dateStr)) {
        streak++
      } else if (dateStr < today) {
        break
      }
    }
    return streak
  }

  const renderCalendar = (habit) => {
    const monthStart = startOfMonth(new Date())
    const monthEnd = endOfMonth(new Date())
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', margin: '20px 0' }}>
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold' }}>{day}</div>
        ))}
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const checked = habit.checkedDates.includes(dateStr)
          const value = habit.records[dateStr]
          return (
            <div
              key={dateStr}
              onClick={() => setSelectedHabit({habitIndex: habits.indexOf(habit), dateStr})}
              style={{
                aspectRatio: '1',
                background: checked ? '#28a745' : '#6c757d',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {day.getDate()}
              {value > 0 && <small>{value}</small>}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>🛡️ 自律守护者</h1>
      {loggedIn ? (
        <div>
          <h2 style={{ textAlign: 'center' }}>欢迎，{email}！</h2>

          <div style={{ margin: '20px 0' }}>
            <input placeholder="习惯名称" value={newName} onChange={e => setNewName(e.target.value)} style={{ padding: '10px' }} />
            <select onChange={e => setNewType(e.target.value)} style={{ padding: '10px' }}>
              <option value="check">普通打卡</option>
              <option value="number">数字记录</option>
              <option value="special">特殊挑战</option>
            </select>
            <button onClick={addHabit} style={{ padding: '10px' }}>添加</button>
          </div>

          {habits.map((habit, index) => (
            <div key={index} style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', margin: '20px 0', borderRadius: '15px' }}>
              <h3>{habit.name} 🔥 {getStreak(habit.checkedDates)} 天</h3>
              {habit.type === 'special' && <p style={{ fontSize: '0.9em' }}>健康提示：保持规律排精有利于身心健康</p>}
              {renderCalendar(habit)}
              {selectedHabit && selectedHabit.habitIndex === index && (
                <div>
                  <p>为 {selectedHabit.dateStr} 打卡</p>
                  {habit.type === 'number' && <input placeholder="输入数字（如公里数）" value={inputValue} onChange={e => setInputValue(e.target.value)} />}
                  <button onClick={() => {
                    toggleCheck(selectedHabit.habitIndex, selectedHabit.dateStr)
                    setSelectedHabit(null)
                  }}>确认</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <input type="email" placeholder="输入邮箱" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', width: '80%' }} />
          <br /><br />
          <button onClick={() => setMessage('验证码已发送（临时用123456）')} style={{ padding: '12px' }}>
            发送验证码
          </button>
          <br /><br />
          <input placeholder="验证码（临时123456）" value={code} onChange={e => setCode(e.target.value)} style={{ padding: '12px', width: '80%' }} />
          <br /><br />
          <button onClick={verify} style={{ padding: '12px' }}>登录</button>
        </div>
      )}
      <p style={{ textAlign: 'center' }}>{message}</p>
    </div>
  )
}

export default App
