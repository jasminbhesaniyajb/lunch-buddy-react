import React from 'react';
import PublicHeader from "../components/public/PublicHeader"
import PublicFooter from "../components/public/PublicFooter"

const PublicLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="body">
        <PublicHeader />
          {children}
        <PublicFooter />
      </div>
  </React.Fragment>
  )
}
export default PublicLayout;