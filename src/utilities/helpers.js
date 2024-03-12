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
  let firstClassSeats = [];
  let businessClassSeats = [];
  let economyClassSeats = [];
  let firstLetters = ["A", "B", "C", "D"];
  let businessLetters = ["E", "F", "G", "H"];
  let economyLetters = ["I", "J", "K", "L"];

  for (let i = 1; i <= data.firstClassCapacity; i++) {
    let seatNumber = Math.ceil(i / 4); //calculate seat number (1-4)
    let letterIndex = (i - 1) % 4; //calculate letter index (0-3)
    let letter = firstLetters[letterIndex];

    let seat = {
      tag: seatNumber.toString() + letter,
      occupied: false,
    };
    firstClassSeats.push(seat);
  }

  for (let i = 1; i <= data.businessClassCapacity; i++) {
    let seatNumber = Math.ceil(i / 4); //calculate seat number (1-4)
    let letterIndex = (i - 1) % 4; //calculate letter index (0-3)
    let letter = businessLetters[letterIndex];

    let seat = {
      tag: seatNumber.toString() + letter,
      occupied: false,
    };
    businessClassSeats.push(seat);
  }

  for (let i = 1; i <= data.economyClassCapacity; i++) {
    let seatNumber = Math.ceil(i / 4); //calculate seat number (1-4)
    let letterIndex = (i - 1) % 4; //calculate letter index (0-3)
    let letter = economyLetters[letterIndex];

    let seat = {
      tag: seatNumber.toString() + letter,
      occupied: false,
    };
    economyClassSeats.push(seat);
  }

  data.firstClassSeats = firstClassSeats;
  data.businessClassSeats = businessClassSeats;
  data.economyClassSeats = economyClassSeats;
  data.status = "INACTIVE";

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

export function bookFlight(data, callback) {
  fetch(`${url}/bookedFlights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
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

export function getBookedFlights(data, callback) {
  fetch(`${url}/bookedFlights`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const bookedFlights = result.filter(
        (flight) => flight.email === data.email
      );
      callback(bookedFlights);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function getAllFlights(callback) {
  fetch(`${url}/flights`)
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

export function getTickets(data, callback) {
  fetch(`${url}/bookedFlights`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const bookedTickets = result.filter(
        (flight) => flight.flightNumber === data.flightNumber
      );
      callback(bookedTickets);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function adminCompleteFlight(id, newData, callback) {
  fetch(`${url}/flights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function adminCancelFlight(id, newData, callback) {
  fetch(`${url}/flights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientCancelFlight(id, newData, oldData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientAddPassenger(id, newData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientChangePassenger(id, newData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientChangeClass(id, newData, oldaData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientChangeSeats(id, newData, oldData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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

export function clientDeletePassenger(id, newData, oldData, callback) {
  fetch(`${url}/bookedFlights/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
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
