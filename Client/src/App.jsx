import { Suspense, useState } from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Website from "./pages/Website.jsx";
import Properties from "./pages/properties/Properties.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactQueryDevtools } from "react-query/devtools";
import PropertyDet from "./pages/porperty/PropertyDet.jsx";
import UserDetailContext from "./context/UserDetailContent.jsx";
import BookingModal from "./components/BookingModal/BookingModal.jsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

function App() {
  const queryClient = new QueryClient();

  const [UserDetail, setUserDetail] = useState({
    favorites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetail: UserDetail, setUserDetail }}>
      <QueryClientProvider client={queryClient}>
        <BookingModal />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<PropertyDet />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favorites />} />
              </Route>
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
