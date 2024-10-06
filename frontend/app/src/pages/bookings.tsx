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
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-row justify-between"></div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <Link href="/new-booking" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        Create Booking
      </Link>
      <ul className="space-y-2">
        {bookings.map((booking) => (
          <li key={booking.id} className="border p-4 rounded shadow hover:bg-gray-100 transition duration-200">
            <Link href={`/booking/${booking.id}`}>
              {`A Booking on ${booking.date} starting at ${booking.start_time}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
