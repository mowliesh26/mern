// import React, { useState } from 'react'
// import { GoogleLogin, googleLogout } from '@react-oauth/google'
// import { jwtDecode } from "jwt-decode"
// import { useNavigate } from 'react-router'

// import ErrorPage from '../../Components/PageNotFound/PageNotFound.jsx'
// import Home from '../Home/Home.jsx'
// import Upload from '../Upload/Upload.jsx'

// export default function Login() {
//   const [logindata, setLogindata] = useState(false)
//   const navigate = useNavigate()
//   function handlelogout() {
//     googleLogout()
//   }
//   console.log("logindata", logindata)

//   const handleLogin = (credentialResponse) => {
//     const a = (jwtDecode(credentialResponse.credential).email_verified)
//     localStorage.setItem("token", a)
//     setLogindata(a)
//     // console.log("a",a);
//     // if(a){

//     // }
//     navigate("/home")
//   }

//   return (


//     <div  >
//       {!logindata ?
//         <GoogleLogin
//           onSuccess={handleLogin}
//           onError={<ErrorPage />}
//           auto_select={true}

//         /> :
//         ""
//       }
//     </div>
//   )
// }

// import React, { useState } from 'react'
// import { GoogleLogin, googleLogout } from '@react-oauth/google'
// import { jwtDecode } from "jwt-decode"
// import { useNavigate } from 'react-router'

// import ErrorPage from '../../Components/PageNotFound/PageNotFound.jsx'
// import Home from '../Home/Home.jsx'

// export default function Login() {
//   const [logindata, setLogindata] = useState(false)
//   const navigate = useNavigate()

//   function handlelogout() {
//     googleLogout()
//   }

//   const handleLogin = (credentialResponse) => {
//     const decodedToken = jwtDecode(credentialResponse.credential)
//     const isEmailVerified = decodedToken.email_verified
    
//     // Save the email verification status in localStorage (or token, depending on your use case)
//     localStorage.setItem("token", credentialResponse.credential)
    
//     setLogindata(isEmailVerified)
    
//     if (isEmailVerified) {
//       // Navigate to /home if login is successful
//       navigate("/home")
//     } else {
//       // Handle the case if email is not verified
//       console.log("Email not verified")
//     }
//   }

//   return (
//     <div>
//       {!logindata ? (
//         <GoogleLogin
//           onSuccess={handleLogin}
//           onError={() => <ErrorPage />}
//           auto_select={true}
//         />
//       ) : (
//         // This section will render Home after login is successful
//         <Home />
//       )}
//     </div>
//   )
// }

import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);
    if (user.email_verified) {
      localStorage.setItem('token', credentialResponse.credential);
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      alert('Email verification failed!');
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome! Please Login</h1>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          alert('Login failed!');
        }}
      />
    </div>
  );
}
