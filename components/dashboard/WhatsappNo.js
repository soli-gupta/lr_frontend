import React from 'react'
import Link from 'next/link';

function WhatsappNo() {
  return (
    <div className='whatsapp'><Link href={`https://api.whatsapp.com/send/?phone=917082206652&text&type=phone_number&app_absent=0`} target='_blank'><span>Chat</span></Link></div>
  )
}

export default WhatsappNo
