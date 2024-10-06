import { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

const NewBooking = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    service: '',
    doctor_name: '',
    start_time: '',
    end_time: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Booking created successfully!');
        router.push('/');
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Service:</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Doctor Name:</label>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Time:</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Time:</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default NewBooking;