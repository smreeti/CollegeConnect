import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            localStorage.clear();
            navigate('/');
        };

        logout();
    }, [navigate]);

    return null; // Return null as the component doesn't render anything
};

export default LogoutComponent;
