import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FoodTruck from './FoodTruck.png';
import Search from './Search';

const foodTruckIcon = new Icon({
  iconUrl: FoodTruck,
  iconSize: [40, 40]
});

function Map() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://data.sfgov.org/resource/rqzj-sfat.json')
      .then((response) => response.json())
      .then((data) => setFoodTrucks(data));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="Map">
      <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {foodTrucks.map((truck) => (
          <Marker key={truck.objectid} icon={foodTruckIcon} position={[truck.latitude, truck.longitude]}>
          <Popup>
            <div className='text-md'>
              <p>{truck.applicant}</p>
              <p>{truck.address}</p>
              <p>{truck.fooditems}</p>
            </div>
          </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;







