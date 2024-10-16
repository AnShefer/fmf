import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import { GET_SUB_USER, DELETE_SUB_USER } from 'src/constants/apiEndPoints';

import { UserProfileView } from 'src/sections/user-profile/view';

import httpRequest from '../axios';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [CurrentUser, setCurrentUser] = useState({});

  const handleDeleteuser = async () => {
    setLoading(true);
    try {
      const response = await httpRequest.delete(`${DELETE_SUB_USER}/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleGetUser = async () => {
    try {
      const response = await httpRequest.get(`${GET_SUB_USER}/${id}`);
      if (response.status === 200) {
        setCurrentUser(response?.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    HandleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Helmet>
        <title> User Profile | Forever Messages </title>
      </Helmet>

      <UserProfileView
        CurrentUser={CurrentUser}
        handleDeleteuser={handleDeleteuser}
        loading={loading}
      />
    </>
  );                 
}
