import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import MainDirectory from './components/MainDirectory.jsx';
import NotFound from './NotFound.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';
import About from './components/AboutComponent.jsx';
import ResetPasswordComponent from './components/ResetPassword.jsx';
import EmailSentComponent from './components/EmailSentComponent.jsx';
import UpdatePasswordComponent from './components/UpdatePasswordComponent.jsx';
import LogoutComponent from './components/LogoutComponent.jsx';
import ProfileComponent from './components/ProfileComponent.jsx';
import CreatePostComponent from './components/CreatePostComponent.jsx';
import SearchUserComponent from './components/SearchUserComponent.jsx';
import EditProfileComponent from './components/EditProfileComponent.jsx';
import ReportComponent from './components/ReportComponent.jsx';
import NotificationsComponent from './components/NotificationsComponent.jsx';
import UsersListComponent from './components/UsersListComponent.jsx';
import ManageUsersPageComponent from './components/ManageUsersPageComponent.jsx';
import UserDetailComponent from './components/UserDetailComponent.jsx';


export default function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const accessToken = localStorage.getItem('jwt');
        const refreshToken = localStorage.getItem('refreshToken');

        const currentPath = window.location.pathname;

        if (currentPath === '/' || currentPath === '/signup' || currentPath === '/about') {
          return;
        }

        if (!accessToken || !refreshToken) {
          navigate('/');
          return;
        }

      } catch (error) {
        console.log('Error:', error);
        navigate('/');
      }
    };

    authenticateUser();
  }, [navigate]);

  return (

    <Routes>
      <Route path="/" element={<MainDirectory />} />
      <Route path="/home" element={<HomeComponent />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<SignupComponent />} />
      <Route path="/resetPassword" element={<ResetPasswordComponent />} />
      <Route path="/emailSent" element={<EmailSentComponent />} />
      <Route path="/updatePassword/:id" element={<UpdatePasswordComponent />} />
      <Route path="/profile/:id" element={<ProfileComponent />} />

      <Route path="/createPost" element={<CreatePostComponent />} />
      <Route path="/search" element={<SearchUserComponent />} />
      <Route path="/edit" element={<EditProfileComponent />} />

      <Route path="/reports" element={<ReportComponent />} />
      <Route path='/notifications' element={<NotificationsComponent />} />

      <Route path='/userslist' element={<ManageUsersPageComponent />} />

      <Route path="/:schoolName/users-list" element={<UsersListComponent />} />

      <Route path="/:schoolName/:user/details" element={<UserDetailComponent />} />

      <Route path="/logout" element={<LogoutComponent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}