import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../utils/userContext.js'

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === true) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}
