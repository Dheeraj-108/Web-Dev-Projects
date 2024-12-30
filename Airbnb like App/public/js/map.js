import * as L from "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js";

const map = L.map("map", {
  center: [Coordinates[1], Coordinates[0]],
  zoom: 15,
});

L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=7ChPVwYFDS9Gow0WMrp3", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const marker = L.marker([Coordinates[1], Coordinates[0]]).addTo(map);
marker.bindTooltip("Exact location provided after booking");
