import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import FoodCard from '../Components/FoodCard';

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
      const [myFoods, setMyFoods] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
          if (user?.email) {
            fetch(`http://localhost:3000/my-requests?email=${user.email}`)
              .then((res) => res.json())
              .then((data) => {
                setMyFoods(data);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }
        }, [user?.email]);

        if (loading) return <Loading></Loading>;
    return (
        <div className="max-w-6xl mx-auto py-10 px-3">
      <h2 className="text-2xl text-center font-bold  mb-2">
        My Food Request Collection
      </h2>
      <p className='text-center mb-10'>A list of all the foods that i have requested from our community donors.</p>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No requested foods found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
    );
};

export default MyFoodRequest;