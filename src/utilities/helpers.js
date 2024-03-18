import { jsPDF } from "jspdf";
import "jspdf-autotable";
const url = "https://airlineweb-server.onrender.com"; //https://airlineweb-server.onrender.com

export function signin(data, callback) {
  fetch(`${url}/users`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [user] = result.filter(
        (user) => user.email == data.email && user.password == data.password
      );
      callback(user);
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function signup(data, callback) {
  fetch(`${url}/users`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [user] = result.filter((user) => user.email == data.email);
      if (user) {
        user.status = 409;
        callback(user);
      } else {
        fetch(`${url}/users`, {
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
            result.status = 200;
            callback(result);
          })
          .catch((err) => {
            console.error("Error", err);
          });
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export async function addCity(data, callback) {
  fetch(`${url}/cities`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [city] = result.filter((city) => city.name == data.name);

      if (city) {
        city.status = 409;
        callback(city);
      } else {
        fetch(`${url}/cities`, {
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
            result.status = 200;
            callback(result);
          })
          .catch((err) => {
            console.error("Error", err);
          });
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export async function addAircraft(data, callback) {
  fetch(`${url}/aircrafts`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [aircraft] = result.filter(
        (aircraft) => aircraft.name == data.name
      );

      if (aircraft) {
        aircraft.status = 409;
        callback(aircraft);
      } else {
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

        fetch(`${url}/aircrafts`, {
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
            result.status = 200;
            callback(result);
          })
          .catch((err) => {
            console.error("Error", err);
          });
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export async function addFlight(data, callback) {
  fetch(`${url}/flights`, {
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
  fetch(`${url}/flights/${id}/${newData.status}`)
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
  fetch(`${url}/flights/${id}/${newData.status}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/bookedFlights/${id}/${JSON.stringify(newData)}`)
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
  fetch(`${url}/aircrafts`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [aircraft] = result.filter((item) => item.name === name);
      let seats;
      if (classe == "first") {
        seats = aircraft.firstClassSeats;
      } else if (classe == "business") {
        seats = aircraft.businessClassSeats;
      } else if (classe == "economy") {
        seats = aircraft.economyClassSeats;
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
      fetch(`${url}/aircrafts/${aircraft.id}/${JSON.stringify(updateData)}`)
        .then((res) => {
          return res.json();
        })
        .then(() => {
          if (callback) {
            callback();
          }
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
  fetch(`${url}/aircrafts`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      const [aircraft] = result.filter((item) => item.name === name);
      let seats;
      if (classe == "first") {
        seats = aircraft.firstClassSeats;
      } else if (classe == "business") {
        seats = aircraft.businessClassSeats;
      } else if (classe == "economy") {
        seats = aircraft.economyClassSeats;
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
      fetch(`${url}/aircrafts/${aircraft.id}/${JSON.stringify(updateData)}`)
        .then((res) => {
          return res.json();
        })
        .then(() => {})
        .catch((err) => {
          console.error("Error", err);
        });
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export function printTicket(flight, user) {
  const doc = new jsPDF();
  if (user == "client") {
    //add company name
    doc.text("KenyaAirways", 90, 50);

    // Set up table data
    const headers = ["Flight Ticket", " "];
    const data = [
      ["Username", `${flight.username}`],
      ["Email", `${flight.email}`],
      ["Phone Number", `${flight.phoneNumber}`],
      ["Flight Number", `${flight.flightNumber}`],
      ["Aircraft", `${flight.aircraft}`],
      ["Route", `${flight.origin} - ${flight.destination}`],
      ["Flight Date", `${flight.date}`],
      ["Flight Time", `${flight.time}`],
      ["Passengers", `${flight.passengers}`],
      ["Class", `${flight.selectedClass} class`],
      ["seat(s)", `${flight.seats}`],
      ["Amount paid", `Ksh. ${flight.cost}`],
    ];

    // Set up table properties
    const tableProps = {
      startY: 55,
      head: [headers],
      body: data,
      theme: "striped",
      styles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
    };

    // Add the table to the PDF
    doc.autoTable(tableProps);

    // Save the PDF
    doc.save(`KenyaAirways.${flight.flightNumber}/${flight.username}.pdf`);
  } else {
    const bookings = flight;
    doc.text("KenyaAirways", 90, 50);
    doc.text(`flight : ${bookings[0].flightNumber}`, 15, 55);
    const headers = ["Username", "Passengers", "Class", "Seats"];
    const data = [];

    bookings.forEach((el) => {
      data.push([el.username, el.passengers, el.selectedClass, el.seats]);
    });

    const tableProps = {
      startY: 58,
      head: [headers],
      body: data,
      theme: "striped",
      styles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
    };

    doc.autoTable(tableProps);
    doc.save(`KenyaAirways_flight${bookings[0].flightNumber}.pdf`);
  }
}
