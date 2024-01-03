import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogin = (userCredentials: { name: string, email: string }) => {
        // make an API call to the login endpoint
        setIsLoggedIn(true);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <LoginForm onSubmit={handleLogin} />
            ) : <h4>Welcome</h4> //need to be replaced
            }
        </div>
    );
};

export default App;
