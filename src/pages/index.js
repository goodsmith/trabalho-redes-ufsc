import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import socketIO from 'socket.io-client'
import { useToasts } from 'react-toast-notifications'

import { useAppState } from '../state'
import styles from '../styles.module.css'

const Index = () => {
  const [client, setClient] = useState(null)
  const [value, setValue] = useState('')
  const { data, setUser } = useAppState()
  const router = useRouter()
  const { addToast } = useToasts()

  useEffect(() => {
    // Conecta com servidor TCP via socket
    const io = socketIO()
    setClient(io)

    io.on('now', console.info)
    io.on('error', msg => {
      setValue('')
      addToast(msg, { appearance: 'error', autoDismiss: true })
    })
    io.on('loginSuccessful', msg => {
      if (msg === value) setUser(value)
    })
  }, [value])

  useEffect(() => {
    if (data.user) router.push('/chat')
  }, [data])

  const onChange = e => {
    setValue(e.target.value)
  }

  const onClick = () => client.emit('login', value)

  if (data.user) {
    return (
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  return (
    <div className={styles.loginForm}>
      <p className={styles.welcome}>Escolha um nome</p>

      <input placeholder="nick" onChange={onChange} value={value} />
      <button onClick={onClick}>Enviar</button>
    </div>
  )
}

export default Index
