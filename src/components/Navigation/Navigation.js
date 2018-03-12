import React from 'react';

const navigation = ({routeChange, signedIn}) => {
  if (signedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => routeChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => routeChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
        <p onClick={() => routeChange('register')} className="f3 link dim black underline pa3 pointer">Sign Up</p>
      </nav>
    )
  }
  
};

export default navigation;
