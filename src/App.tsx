import React, { useState } from 'react';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // This will be called when the user successfully logs in
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <HomePage onLogin={handleLoginSuccess} />
            ) : (
                <h4>Redirect to serach page</h4> // Users should be brought to the search page
            )}
        </div>
    );
};

export default App;
