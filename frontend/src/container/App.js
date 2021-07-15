import React from 'react';
import UserSignupPage from '../pages/UserSingupPage'
import LanguageSelector from '../components/LanguageSelector'
import LoginPage from '../pages/LoginPage'
function App() {
  return (
    <div className="row">

      <div className="col">
        <UserSignupPage />
      </div>

      <div className="col">
        <LoginPage />
      </div>

      <LanguageSelector />

    </div>
  );
}

export default App;
