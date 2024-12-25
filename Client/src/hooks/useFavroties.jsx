import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../context/UserDetailContent';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { getAllFav } from '../utils/api';

const useFavroties = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const queryRef = useRef();
    const { user } = useAuth0();
  
    const { data, isLoading, isError, refetch } = useQuery({
      queryKey: "allFavourites",
      queryFn: () => getAllFav(user?.email, userDetail?.token),
      onSuccess: (data) =>
        setUserDetail((prev) => ({ ...prev, favorites: data })),
      enabled: user !== undefined,
      staleTime: 30000,
    });
  
    queryRef.current = refetch;
  
    useEffect(() => {
      queryRef.current && queryRef.current();
    }, [userDetail?.token]);
  
    return { data, isError, isLoading, refetch };
  };

export default useFavroties
