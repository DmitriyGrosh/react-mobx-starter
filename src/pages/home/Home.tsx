import React, { useState, useEffect } from 'react';

const Home = () => {
  const [count, setCount] = useState<number>(0);
  const [doubleCount, setDoubleCount] = useState<number>(1);

  useEffect(() => {
    setDoubleCount((prev) => prev + 2);
  }, [count]);

  return (
    <div>
      Home
      {process.env.name}
      {count}
      {doubleCount}
      <button onClick={() => setCount((prev) => prev + 1)}>обновить</button>
    </div>
  );
};

export default Home;
