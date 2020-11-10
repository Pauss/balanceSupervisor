import React, { useState, useContext, useEffect } from 'react'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  useEffect(() => {
    previouslyAuth()
  }, [])

  let init_condition = false
  let init_user = {}

  function initVals() {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const init_user = JSON.parse(loggedInUser)
      init_condition = true
    }
  }

  initVals()

  const [user, setUser] = useState({ init_user })
  const [isAuthenticated, setIsAuthenticated] = useState(init_condition)

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
