import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContent";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavroties from "../../hooks/useFavroties";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  useFavroties();
  useBookings();
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0(); // Fix: include getAccessTokenWithPopup
  const { setUserDetail } = useContext(UserDetailContext); // Use `setUserDetail` here

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetail((prev) => ({ ...prev, token: res })); // Update context using `setUserDetail`
        //console.log(res);
        mutate(res);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, getAccessTokenWithPopup, setUserDetail]); // Ensure correct dependencies

  return (
    <div style={{ background: "var(--black)", overflow: "hidden" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
