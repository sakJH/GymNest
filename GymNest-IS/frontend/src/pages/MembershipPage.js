import React from 'react';
import DataList from '../components/DataList';
import UserList from '../components/UserList';

function MembershipPage() {
  return (
    <div>
      <h2>Správa Členství</h2>
      {/* Zde bude implementace funkcionality stránky */}
      <DataList />
      <UserList />
    </div>
  );
}

export default MembershipPage;
