import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserForm from './UserForm'

export default function UserProfile() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)


  return (
    <>
      <UserForm id={userInfo.id} action='edit' />
    </>
  )
}
