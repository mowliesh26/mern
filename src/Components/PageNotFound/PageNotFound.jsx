import React from "react";
// import image from '../Assets/Pagenotfound.jpg'
import image from'../../Assets/Pagenotfound.jpg'
import './PageNotfound.css'
// import { useSelector } from "react-redux";
import Login from "../../pages/Login/Login";
import { Link } from "react-router";

function ErrorPage() {
  // const store = useSelector(items => items.privateroute

  // )


  return (
    <>
      <nav className="navigate">
        <img className='notfound' src={image} alt="errorimage"></img>
        <Login></Login>
        {/* {store ? <a href='/dashboard'> Dashboard</a>
          : <a href='/'> Login</a>
          } */}
         <Link to='/'/>

      </nav>

    </>
  )
}

export default ErrorPage 
