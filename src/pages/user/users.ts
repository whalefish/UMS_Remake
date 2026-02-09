import './users.scss'

interface User {
  name: string
}

const mode = document.body.dataset.mode

if (mode === 'mock') {
  const users: User[] = [
    { name: 'Fish' },
    { name: 'Amy' },
  ]

  const container = document.getElementById('mock-users')
  if (container) {
    container.innerHTML = users
      .map(u => '<div class="user">' + u.name + '</div>')
      .join('')
  }
}