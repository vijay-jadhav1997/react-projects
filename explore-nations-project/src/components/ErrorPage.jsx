// import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  return (
    <div className='error-page'>
      <h1>Oops!</h1>
      <h2 className='not-found'>{error?.status} {error?.statusText}</h2>
      <h2>{error?.error?.message}</h2>
    </div>
  )
}

export default ErrorPage