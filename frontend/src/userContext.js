import React, { useState, useContext, useEffect } from 'react'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  useEffect(() => {
    previouslyAuth()
  }, [])

  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const contextValues = {
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
    previouslyAuth
  }

  function login(user) {
    setIsAuthenticated(true)
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  function logout() {
    setIsAuthenticated(false)
    localStorage.clear()
  }

  function previouslyAuth() {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setIsAuthenticated(true)
      setUser(foundUser)
    }
  }

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
}
