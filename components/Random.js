"use client"
import { useDeviceWidthContext } from '@/context/page';

const Random = () => {
  const deviceWidth = useDeviceWidthContext();

  return (
    <div>
      <p>Device width category: {deviceWidth}</p>
    </div>
  );
};

export default Random;
