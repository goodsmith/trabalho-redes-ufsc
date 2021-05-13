import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import socketIO, { io } from 'socket.io-client'
import useMedia from 'use-media'

import { useAppState } from '../state'
import styles from '../styles.module.css'
import Send from '../../public/send-button.svg'

const Chat = () => {
  const [client, setClient] = useState()
  const [value, setValue] = useState('')
  const { data, updateMessages, clearData } = useAppState()
  const router = useRouter()
  const isMobile = useMedia({ maxWidth: 800 })
  const chat = useRef()

  useEffect(() => {
    // Conecta com servidor TCP via socket
    const io = socketIO()
    setClient(io)

    io.on('now', console.info)
    io.on('message', updateMessages)
  }, [updateMessages, io])

  useEffect(() => {
    if (!data.user) router.push('/')

    if (chat && chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight
    }
    return () => {
      if (client) client.emit('logout', data.user)
      clearData
    }
  }, [data, client])

  if (!data.user) {
    return (
      <div className={styles['lds-ring']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  const onChange = e => setValue(e.target.value)
  const onClick = () => {
    client.emit('sendMessage', { text: value, user: data.user })
    setValue('')
  }

  return (
    <div className={styles.chatContainer}>
      <div ref={chat} className={styles.chatMessages}>
        {data.messages.map(({ user, text }, i) => (
          <div className={user === data.user && styles.self} key={`${user}.${i}`}>
            <p className={styles.author}>{user}</p>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <input placeholder="Mande aqui sua mensagem..." onChange={onChange} value={value} />
        <button onClick={onClick}>{isMobile ? <Send /> : 'Enviar'}</button>
      </div>
    </div>
  )
}

export default Chat
