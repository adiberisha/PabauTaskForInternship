import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {

  const bookings = await getBookings()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center p-6 rounded-lg shadow-lg bg-white bg-opacity-20 backdrop-blur-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Current Booking Count: {bookings.length}
        </h1>
        <Link href="bookings" className="inline-block mt-2 px-4 py-2 text-lg font-semibold text-blue-500 bg-white rounded-lg shadow hover:bg-blue-100 transition duration-300">
          View Bookings
        </Link>
      </div>
    </div>
  );
};

export default Home;