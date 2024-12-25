import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { useMutation } from "react-query";
import { DatePicker } from "@mantine/dates";
import UserDetailContext from "../../context/UserDetailContent";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const token = userDetail?.token;

  const handleBookingSuccess = () => {
    toast.success("You have successfully booked your visit!", {
      position: "bottom-right",
    });
    setUserDetail((prev) => ({
      ...prev,
      bookings: [
        ...(prev.bookings || []),
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: handleBookingSuccess,
    onError: (error) => {
      toast.error("Failed to book your visit. Please try again.");
      console.error(error);
    },
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select Your Date of Visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button
          disabled={!value || !token || isLoading}
          onClick={() => mutate()}
        >
          {isLoading ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
