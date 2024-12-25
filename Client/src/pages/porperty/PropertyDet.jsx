import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import "./PropertyDet.css";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import BookingModal from "../../components/BookingModal/BookingModal";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContent";
import { Button } from "@mantine/core";
import Heart from "../../components/Heart/Heart";

const PropertyDet = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  console.log("Property ID:", id);

  const { data, isLoading, isError } = useQuery(
    ["data", id],
    () => getProperty(id),
    {
      onError: (error) =>
        console.error("Error fetching property details:", error),
    }
  );

  const [modalOpened, setModalOpened] = useState(false);

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { token, bookings },
    setUserDetail,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  const residency = data?.residency;
  const imageUrl = residency?.image;
  const title = residency?.title || "No title available";
  const price = residency?.price || "Unknown";
  const description = residency?.description || "No description";
  const facilities = residency?.facilities || {};
  const address = residency?.address || "No address available";
  const city = residency?.city || "City not available";
  const country = residency?.country || "Country not available";

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={id} />
        </div>
        <img
          src={imageUrl || "/path-to-placeholder-image.jpg"}
          alt="home image"
        />
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ₹{price}
              </span>
            </div>
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E372" />
                <span>{facilities?.parking} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E372" />
                <span>{facilities?.bedrooms} Rooms</span>
              </div>
            </div>
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {description}
            </span>
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {address}, {city}, {country}
              </span>
            </div>
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your Residency
              </button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
          <div className="map">
            <Map address={address} city={city} country={country} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDet;
