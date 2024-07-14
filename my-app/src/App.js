import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://todobackend-pratik3311s-projects.vercel.app/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const response = await axios.post('https://todobackend-pratik3311s-projects.vercel.app/', { title, description });
      setItems([...items, response.data]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todobackend-pratik3311s-projects.vercel.app/${id}`);
      const updatedItems = items.filter(item => item._id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">MERN Stack App: Input and Display</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-4 text-black rounded-lg"
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 mb-4 text-black rounded-lg"
        ></textarea>
        <button type="submit" className="w-full p-4 bg-blue-600 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>

      <div className="w-full max-w-lg mt-8 space-y-4">
        {items.map(item => (
          <div key={item._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
            <button onClick={() => handleDelete(item._id)} className="mt-4 p-2 bg-red-600 rounded-lg hover:bg-red-700">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
