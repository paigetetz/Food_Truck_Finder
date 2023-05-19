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
  console.log(foodTrucks.location);

  const handleSearch = (term) => {
    setSearch(term);
  }
  const filteredFoodTrucks = foodTrucks.filter((foodTruck) => {
    const address = foodTruck.address || '';
    const locationDescription = foodTruck.locationdescription || '';
    return address.toLowerCase().includes(search.toLowerCase())
      || locationDescription.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
    <Search onSearch={handleSearch} />
    <div className="flex justify-center items-center h-screen">
    <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "80%", width: "80%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredFoodTrucks.map((truck) => (
        <Marker key={truck.objectid} icon={foodTruckIcon} position={[truck.latitude, truck.longitude]}>
          <Popup>
            <div className='text-md'>
              <p className='text-lg'>{truck.applicant}</p>
              <p>Address: {truck.address}</p>
              <p>Cuisine: {truck.fooditems}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
  </>
  );
}

export default Map;







