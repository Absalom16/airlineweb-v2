import axios from "axios";
const url = "http://localhost:3000";

export function signin(data) {
  console.log(data);
}

export function signup(data) {
  console.log(data);
}

export async function addCity(data) {
  const response = await axios.post(`${url}/cities`, data);
  return response;
}

export async function addAircraft(data) {
  const response = await axios.post(`${url}/aircrafts`, data);
  return response;
}

export async function addFlight(data) {
  data.status = "ACTIVE";
  const response = await axios.post(`${url}/flights`, data);
  return response;
}

export function getCities(callback) {
  fetch(`${url}/cities`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function getAircrafts(callback) {
  fetch(`${url}/aircrafts`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function getActiveFlights(callback) {
  fetch(`${url}/flights`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const activeFlights = result.filter(
        (flight) => flight.status === "ACTIVE"
      );
      callback(activeFlights);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}
