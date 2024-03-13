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

  updateSeatsOccupied(data.aircraft, data.selectedClass, data.seats.split(","));
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

  updateSeatsVacant(oldData.aircraft, oldData.classe, oldData.seats.split(","));
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

  updateSeatsOccupied(
    newData.aircraft,
    newData.classe,
    newData.seats.split(",")
  );
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

export function clientChangeClass(id, newData, oldData, callback) {
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

  updateSeatsOccupied(
    oldData.aircraft,
    newData.selectedClass,
    newData.seats.split(","),
    () => {
      updateSeatsVacant(
        oldData.aircraft,
        oldData.classe,
        oldData.seats.split(",")
      );
    }
  );
}

export function clientChangeSeats(id, newData, oldData, callback) {
  // console.log(newData);
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

  updateSeatsOccupied(
    oldData.aircraft,
    oldData.classe,
    newData.seats.split(","),
    () => {
      updateSeatsVacant(
        oldData.aircraft,
        oldData.classe,
        oldData.seats.split(",")
      );
    }
  );
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
  updateSeatsVacant(oldData.aircraft, oldData.classe, oldData.seats.split(","));
}

export function updateSeatsOccupied(name, classe, tags, callback) {
  fetch(`${url}/aircrafts?name=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      let seats;
      if (classe == "first") {
        seats = result[0].firstClassSeats;
      } else if (classe == "business") {
        seats = result[0].businessClassSeats;
      } else if (classe == "economy") {
        seats = result[0].economyClassSeats;
      }

      //updating newly occupied seats
      const arr = [];
      tags.forEach((tag) => {
        seats.forEach((seat) => {
          if (seat.tag == tag) {
            seat.occupied = true;
          }
          if (arr.includes(seat)) {
            return;
          }
          arr.push(seat);
        });
      });

      let updateData;
      if (classe == "first") {
        updateData = { firstClassSeats: arr };
      } else if (classe == "business") {
        updateData = { businessClassSeats: arr };
      } else if (classe == "economy") {
        updateData = { economyClassSeats: arr };
      }

      //updating data in db
      fetch(`${url}/aircrafts/${result[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (callback) {
            callback();
          }
          console.log(data);
        })
        .catch((err) => {
          console.error("Error", err);
        });
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function updateSeatsVacant(name, classe, tags) {
  fetch(`${url}/aircrafts?name=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      let seats;
      if (classe == "first") {
        seats = result[0].firstClassSeats;
      } else if (classe == "business") {
        seats = result[0].businessClassSeats;
      } else if (classe == "economy") {
        seats = result[0].economyClassSeats;
      }

      //updating newly occupied seats
      const arr = [];
      tags.forEach((tag) => {
        seats.forEach((seat) => {
          if (seat.tag == tag) {
            seat.occupied = false;
          }
          if (arr.includes(seat)) {
            return;
          }
          arr.push(seat);
        });
      });

      let updateData;
      if (classe == "first") {
        updateData = { firstClassSeats: arr };
      } else if (classe == "business") {
        updateData = { businessClassSeats: arr };
      } else if (classe == "economy") {
        updateData = { economyClassSeats: arr };
      }

      //updating data in db
      fetch(`${url}/aircrafts/${result[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error("Error", err);
        });
    })
    .catch((err) => {
      console.error("Error", err);
    });
}
