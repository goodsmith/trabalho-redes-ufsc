const next = require('next')
const Server = require('http').Server
const app = require('express')()
const io = require('socket.io')()

const port = process.env.PORT || 3000

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const state = {
    users: [],
  }

  // Cria servidor HTTP pra servir o site
  const server = Server(app)
  app.get('*', handler)

  // Cria servidor TCP
  io.on('connect', socket => {
    socket.emit('now', 'connected to TCP server')
    socket.emit('state', state)

    socket.on('login', msg => {
      if (!msg) {
        io.emit('error', 'Por favor escolha um nick')

        return
      }

      if (state.users.includes(msg)) {
        io.emit('error', 'Usuário com esse nome já existe')

        return
      }

      io.emit('loginSuccessful', msg)
      state.users = [...state.users, msg]
    })

    socket.on('logout', msg => {
      state.users = state.users.filter(u => u !== msg)
    })

    socket.on('sendMessage', value => {
      io.emit('message', value)
    })
  })

  server.listen(port, err => {
    if (err) throw err
  })
})
