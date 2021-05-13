import { createContext, useContext, useCallback, useState } from 'react'

const AppContext = createContext()

const Provider = ({ children }) => {
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([])

  const clearData = () => {
    setUser(null)
    updateMessages(null)
  }

  const updateMessages = useCallback(
    msg => {
      const newMessages = messages.concat([msg])
      setMessages(newMessages)
    },
    [messages]
  )

  const sharedState = {
    data: { user, messages },
    setUser,
    updateMessages,
    clearData,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export const useAppState = () => useContext(AppContext)

export default Provider
