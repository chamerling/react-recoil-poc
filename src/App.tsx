import React from 'react';
import UserList from './components/UserList';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div>
        <UserList/>
      </div>
    </RecoilRoot>
  );
}

export default App;
