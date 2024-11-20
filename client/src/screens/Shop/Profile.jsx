import { UserProfile } from '@features'
import React from 'react'
import ShopWrapper from './Wrapper'

export default function Profile() {
  return (
    <ShopWrapper bannerText="Profile Info" childClass="flex-col md:min-h-screen md:flex-row md:flex-row-reverse">
      <UserProfile />
    </ShopWrapper>
  )
}
