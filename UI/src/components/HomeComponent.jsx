import React from 'react';
import { getLoggedInUser } from '../../utils/Auth';
import UserType from '../../utils/UserTypeConstants';
import AdminHomeComponent from './AdminHomeComponent.jsx';
import ClientHomeComponent from './ClientHomeComponent.jsx';

export default class HomeComponent extends React.Component {

    render() {
        const loggedInUser = getLoggedInUser();
        return (
            <>
                {
                    loggedInUser && (loggedInUser?.userTypeId?.code == UserType.ADMIN || loggedInUser?.userTypeId?.code == UserType.MASTER) ?
                        <AdminHomeComponent /> :
                        <ClientHomeComponent />
                }
            </>
        );
    }
}