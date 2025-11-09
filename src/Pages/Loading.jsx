import React from 'react';
import { CircleLoader } from 'react-spinners';

const Loading = () => {
     return (
    <div className="min-h-[50vh] flex justify-center items-center">
     <CircleLoader></CircleLoader>
    </div>
  );
};

export default Loading;