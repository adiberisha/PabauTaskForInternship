import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../app/globals.css';

type Booking = {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
};

const HomePage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        const data: Booking[] = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Bookings</h1>
        <Link
          href="/new-booking"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow transition duration-200 hover:bg-blue-600 w-full text-center"
        >
          Create Booking
        </Link>
        <ul className="space-y-4 mt-6">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 bg-gray-50"
            >
              <Link href={`/booking/${booking.id}`} className="text-gray-800 hover:text-blue-500">
                {`A Booking on ${booking.date.split("T")[0]} starting at ${booking.start_time}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default HomePage;