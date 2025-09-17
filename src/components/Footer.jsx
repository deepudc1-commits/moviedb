import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
            <p className='mar-bot0'>Copyright © {new Date().getFullYear()} - All right reserved by FilmsVault</p>
        </aside>
    </footer>
  )
}

export default Footer
