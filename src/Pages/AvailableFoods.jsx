import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../Components/FoodCard';
import Loading from './Loading';

const AvailableFoods = () => {
    const data = useLoaderData();
  // console.log(data);
  const [foods, setFoods] = useState(data);
const [loading, setLoading] = useState(true);
useEffect(() => {
    if (data) {
      setFoods(data);
      setLoading(false);
    }
  }, [data]);
    return (
        <div>
      <div className="text-2xl text-center font-bold mt-10 mb-2"> All Foods</div>
      <p className=" text-center mb-10 ">Explore all available Foods</p>
      {loading ? (
        <Loading /> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
    );
};

export default AvailableFoods;