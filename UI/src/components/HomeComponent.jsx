import React from 'react';
import { getLoggedInUser } from '../../utils/Auth';
import UserType from '../../utils/UserTypeConstants';
import AdminHomeComponent from './AdminHomeComponent.jsx';
import ClientHomeComponent from './ClientHomeComponent.jsx';

export default class HomeComponent extends React.Component {

    render() {
        const loggedInUser = getLoggedInUser();
        console.log(loggedInUser);
        return (
            <>
                {
                    loggedInUser.userTypeId.code == UserType.ADMIN ?
                        <AdminHomeComponent /> :
                        <ClientHomeComponent />
                }
            </>
        );
    }
}