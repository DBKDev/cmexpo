import React from 'react';
import { Navigate } from 'react-router-dom';
import { accountService } from '@/Services/account_service';

const AuthGuard = ({children}) => {


    if(!accountService.isLoggedIn()) {
        return <Navigate to="/auth" />;
    }
    return  children;
}
 
export default AuthGuard;