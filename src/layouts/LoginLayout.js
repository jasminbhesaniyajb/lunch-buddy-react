import React from "react"
const LoginLayout = ({children}) => {
  return (
    <React.Fragment>
      <div className="body">
          {children}
      </div>
  </React.Fragment>
  )
}
export default LoginLayout;