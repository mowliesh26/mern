 
// import './App.css';
// import { BrowserRouter, HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
// import Login from './pages/Login/Login.jsx';
// import { PublicRoutes } from './Router/PublicRoute.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { Suspense, useState } from 'react'
// import Home from './pages/Home/Home.jsx';

 
// // import DarkMode from '../../Components/DarkMode/DarkMode'
// function App() {
 
 
//   // const navigate=useNavigate()
   
//   return (
//     <div className="App">
      

//       <BrowserRouter>
        
//         <Home/>
//         {/* <Login/> */}
//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;

// // import logo from './logo.svg';
// // import './App.css';
// // import { HashRouter, Route, Routes } from 'react-router-dom';
// // import Login from './pages/Login/Login.jsx';
// // import { PublicRoutes } from './Router/PublicRoute.js';
// // import { Suspense } from 'react';



// // function App() {
// //   return (

// //     <HashRouter >
// //       <Routes>
// //         {PublicRoutes.map((route) => {
// //           let Component = route.component
// //           return (
// //             <Route exact={true} key={route.name} path={route.path}
// //               element={
// //                 <>
// //                   <Suspense fallback={"loading"}>
// //                     <Component />
// //                   </Suspense></>
// //               } />
// //           )
// //         })}
// //       </Routes>

// //     </HashRouter>
// //   );
// // }

// // export default App;

// import './App.css';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import Login from './pages/Login/Login';
// import Home from './pages/Home/Home';
// import Upload from './pages/Upload/Upload';
// import Show from './pages/Visualize/Visualize';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
    
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Routes>
         
//           <Route path="/" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/home" />} />

         
//           <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />}>
//             <Route path="upload" element={<Upload />} />
//             <Route path="show" element={<Show />} />
//             <Route index element={<h1>Welcome to Home</h1>} />

//           </Route>

       
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Show from './pages/Visualize/Visualize';
import Map from './pages/Map/Map';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    console.log("boolean",!!localStorage.getItem('token'));
    
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/home/upload" />}
          />

          <Route
            path="/home"
            element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/" />}
          >
            
            <Route path="upload" element={<Upload />} />
            <Route path="show" element={<Show />} />
            <Route path="map" element={<Map />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

