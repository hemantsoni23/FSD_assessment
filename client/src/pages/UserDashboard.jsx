import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import RoleMessage from '../components/RoleMessage';
import CountrySelector from '../components/CountrySelector';
import DataTable from '../components/DataTable';
import CreateDataButton from '../components/CreateDataButton';
import axios from 'axios';

const UserDashboard = () => {
  const { role, country, handleCountrySelect } = useContext(UserContext);
  const [countrySelected, setCountrySelected] = useState(localStorage.getItem('country') ? true : false);
  const [refreshTable, setRefreshTable] = useState(false); // Added state for refreshing table

  useEffect(() => {
    const updateCountry = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_ROUTE}/user/country`,
          { country },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    updateCountry();
    if (countrySelected === true) {
      setCountrySelected(false);
    }
  }, [countrySelected, country]);

  // Function to trigger table refresh
  const handleRefreshTable = () => {
    setRefreshTable((prev) => !prev);
  };

  if (role === null || role === "undefined") {
    return (
      <div>
        <RoleMessage />
      </div>
    );
  }

  if (role === 'Viewer') {
    return (
      <div>
        <DataTable isViewer={true} refreshTable={refreshTable} />
      </div>
    );
  }

  if (role === 'User') {
    return (
      <div>
        {!country && country === "undefined" && country === "null" ? (
          <CountrySelector onCountrySelect={handleCountrySelect} setCountrySelected={setCountrySelected} />
        ) : (
          <>
            <CreateDataButton onRefreshTable={handleRefreshTable} />
            <DataTable isViewer={false} refreshTable={refreshTable} />
          </>
        )}
      </div>
    );
  }

  return null;
};

export default UserDashboard;

