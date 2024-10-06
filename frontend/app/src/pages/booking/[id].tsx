import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../app/globals.css';

type Booking = {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
};

const BookingDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBookingDetails = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/bookings/${id}`);
          const data: Booking = await res.json();
          setBooking(data);
        } catch (error) {
          console.error('Error fetching booking details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookingDetails();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!booking) {
    return <p className="text-center mt-4">Booking not found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Booking Details</h1>
        <p className="text-lg text-gray-700 mb-4">
          This Booking is with <strong className="text-blue-600">{booking.doctor_name}</strong> for 
          <strong className="text-blue-600"> {booking.service}</strong> and it ends at 
          <strong className="text-blue-600"> {booking.end_time}</strong>.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Date: <strong className="text-blue-600">{booking.date.split("T")[0]}</strong>
        </p>
        <Link
          href="/bookings"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 shadow hover:shadow-lg"
        >
          Back to Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingDetails;