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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p>This Booking is with <strong>{booking.doctor_name}</strong> for <strong>{booking.service}</strong> and it ends at <strong>{booking.end_time}</strong>.</p>
      <Link href="/bookings" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        Back to Bookings
      </Link>
    </div>
  );
};

export default BookingDetails;