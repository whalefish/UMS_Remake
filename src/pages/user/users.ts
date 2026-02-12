import './users.scss'

// 模擬後端資料
const users = [
  { id: 1, name: 'Amy' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Cindy' }
]

const list = document.querySelector('#userList')!

users.forEach(u => {
  const li = document.createElement('li')
  li.className = 'user-item'
  li.textContent = u.name
  list.appendChild(li)
})