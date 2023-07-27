import { useEffect } from 'react';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

function RoutingMap({ driverLocation, customers, onPath }) {
  const map = useMap();

  useEffect(() => {
    if (driverLocation) {
      const waypoints = customers.map((customer) => L.latLng(customer.location.latitude, customer.location.longitude));
      waypoints.unshift(L.latLng(driverLocation.latitude, driverLocation.longitude));

      L.Routing.control({
        waypoints,
      }).on('routesfound', function (e) {
        const routeCoordinates = e.routes[0].coordinates;
        onPath(routeCoordinates);
      }).addTo(map);
    }
  }, [map, driverLocation, customers])

  return null;
}

export default RoutingMap;
