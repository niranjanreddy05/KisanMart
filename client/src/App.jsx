

import './App.css'
import Home from './components/Home/Home'
import { AuthProvider } from './context/AuthContext';
import Posts from './components/Posts/Posts'
import Singlepost from './components/Posts/Singlepost'
import MyPost from './components/Posts/MyPost'
import Orders from './components/Posts/Orders'
import AddPost from './components/Posts/AddPost'
import Login from './components/Login'
import Register from './components/Register'
import { SkeletonTheme } from 'react-loading-skeleton';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Layout from '../Layout';


function App() {
  const queryClient = new QueryClient();
  
//   const Layout = () => {
//     return (
//       <div className="app">
//         <QueryClientProvider client={queryClient}>
//           <AuthProvider>
//             <Navbar currentUser={currentUser} />
//             <NavMenu currentUser={currentUser} />
//             <Outlet />
//             <Footer />
//           </AuthProvider>
//         </QueryClientProvider>
//       </div>
//     );
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [ {
      path: "/",
      element: <Home/>
    },
    {
      path: "/posts",
      element: <Posts/>
    },
    {
      path: "/post/:id",
      element: <Singlepost/>
    },
    {
      path: "/myposts",
      element: <MyPost/>
    },
    {
      path: "/orders",
      element: <Orders/>
    },
    {
      path: "/addpost",
      element: <AddPost/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    }]
  },
]);




  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <SkeletonTheme baseColor="#D3D3D3" highlightColor="#C0C0C0">
        <RouterProvider router={router} />
        </SkeletonTheme>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
