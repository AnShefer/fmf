import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

import { GET_SUB_USERS, UPDATE_SUB_USER_STATUS } from 'src/constants/apiEndPoints';

import DashboardHeader from 'src/components/main-dashboard';

import httpRequest from '../../../axios';
import UserDashboard from '../user-main-dashboard-content';
import ForeverMessagesDashboard from '../user-main-dashboard-header';

const MainDashboardView = () => {
  const [allSubusers, setAllSubusers] = useState([]);
  const [Disableuser, setDisableuser] = useState(false);

  const getSubusers = async () => {
    try {
      const response = await httpRequest.get(GET_SUB_USERS);

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setAllSubusers(response.data.subusers);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch subusers');
    }
  };

  const handleDisableuser = async () => {
    try {
      const response = await httpRequest.put(`${UPDATE_SUB_USER_STATUS}/${Disableuser}`);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        getSubusers();
        setDisableuser('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getSubusers();
  }, []);

  return (
    <>
      <DashboardHeader />
      <ForeverMessagesDashboard />
      <UserDashboard
        setDisableuser={setDisableuser}
        getSubusers={getSubusers}
        allSubusers={allSubusers}
        disableduser={handleDisableuser}
      />
    </>
  );
};

export default MainDashboardView;
