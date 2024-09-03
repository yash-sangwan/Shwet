import React from 'react';
import NavbarDB from '../../Components/Dashboard/NavbarDB';
import DiscoverGroups from '../../Components/Dashboard/GroupsDB/DiscoverGroups';
import Header from '../../Components/Dashboard/GroupsDB/Header';

const GroupsDB = () => {
  return (
    <>
      <NavbarDB />
      <div className="min-h-screen bg-gray-900 text-white pt-16">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <DiscoverGroups />
        </div>
      </div>
    </>
  );
};

export default GroupsDB;
