const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

// ###################################################START###################################################

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

//=====================API Routes=============================

//=====================Showroom===============================

//Get All Cars from the showroom table

app.get("/showroom/cars", (req, res) => {
  const query = "SELECT * FROM showroom";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

//Get a single car via ID from the showroom table

app.get("/showroom/cars/:carId", (req, res) => {
  const carId = req.params.carId;
  const query = "SELECT * FROM showroom WHERE car_id = ?";
  db.query(query, [carId], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Failed to fetch car details." });
    }
    res.json(results[0]);
  });
});

//Get car based on the filter option

app.get("/all-cars", async (req, res) => {
  const { page = 1, size = 6, filter, sort, search } = req.query;
  const limit = parseInt(size, 10);
  const offset = (parseInt(page, 10) - 1) * limit;
  try {
    let query = "SELECT * FROM showroom";
    const params = [];

    if (search) {
      query += " WHERE brand LIKE ? OR model LIKE ?";
      params.push(`%${search}%`, `%${search}%`);
    }

    if (filter) {
      if (query.includes("WHERE")) {
        query += " AND";
      } else {
        query += " WHERE";
      }
      if (filter === "automatic") {
        query += " transmission_type = ?";
        params.push("Automatic");
      } else if (filter === "manual") {
        query += " transmission_type = ?";
        params.push("Manual");
      } else if (filter === "recondition") {
        query += " recondition = ?";
        params.push("Yes");
      }
    }
    if (sort) {
      if (sort === "priceAsc") {
        query += " ORDER BY price ASC";
      } else if (sort === "priceDesc") {
        query += " ORDER BY price DESC";
      } else if (sort === "seatsAsc") {
        query += " ORDER BY sit_number ASC";
      } else if (sort === "seatsDesc") {
        query += " ORDER BY sit_number DESC";
      }
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);
    db.query(query, params, (err, cars) => {
      if (err) {
        console.error("Error fetching cars:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const countQuery = search
        ? "SELECT COUNT(*) AS count FROM showroom WHERE brand LIKE ? OR model LIKE ?"
        : "SELECT COUNT(*) AS count FROM showroom";
      const countParams = search ? [`%${search}%`, `%${search}%`] : [];

      db.query(countQuery, countParams, (countErr, countResult) => {
        if (countErr) {
          console.error("Error counting cars:", countErr);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        const totalCount = countResult[0].count;
        res.json({ cars, totalCount });
      });
    });
  } catch (error) {
    console.error("Error in /all-cars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Add car to the showroom table

app.post("/showroom/add", (req, res) => {
  const {
    brand,
    model,
    year,
    price,
    engine_type,
    transmission_type,
    mileage,
    image,
    description,
    status,
    recondition,
    sit_number,
  } = req.body;

  const query = `
    INSERT INTO showroom (brand, model, year, price, engine_type, transmission_type, mileage, image, description, status, recondition, sit_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      brand,
      model,
      year,
      price,
      engine_type,
      transmission_type,
      mileage,
      image,
      description,
      status,
      recondition,
      sit_number,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding car:", err);
        return res.status(500).json({ message: "Failed to add car." });
      }
      res.status(201).json({ message: "Car added successfully!" });
    }
  );
});

//Delete car from the showroom table

app.delete("/showroom/delete/:carId", (req, res) => {
  const { carId } = req.params;
  const query = "DELETE FROM showroom WHERE car_id = ?";
  db.query(query, [carId], (err, result) => {
    if (err) {
      console.error("Error deleting car:", err);
      return res.status(500).json({ message: "Failed to delete car." });
    }
    res.json({ message: "Car deleted successfully!" });
  });
});

// Sold Cars total count

app.get("/showroom/sold", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM showroom WHERE status = 'Sold'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching sold cars count:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ count: results[0].count });
  });
});

//Update car in the showroom table
app.put("/showroom/cars/edit/:id", (req, res) => {
  const carId = req.params.id;
  const updatedData = req.body;
  const query = `UPDATE showroom SET ? WHERE car_id = ?`;

  db.query(query, [updatedData, carId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database update failed." });
    }
    res.json({ message: "Car details updated successfully" });
  });
});

// When user purchases a car
app.put("/showroom/purchase/:carId", (req, res) => {
  const carId = req.params.carId;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const updateQuery1 = "UPDATE showroom SET status = ? WHERE car_id = ?";
  db.query(updateQuery1, ["Sold", carId], (updateErr) => {
    if (updateErr) {
      console.error("Error updating showroom:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error while updating showroom." });
    }

    const updateQuery2 = `
      UPDATE users
      SET purchased_car_ids = TRIM(CONCAT(IFNULL(purchased_car_ids, ''), ' ', ?))
      WHERE user_id = ?;
    `;
    db.query(updateQuery2, [carId, userId], (userUpdateErr) => {
      if (userUpdateErr) {
        console.error("Error updating user's purchased cars:", userUpdateErr);
        return res
          .status(500)
          .json({ message: "Database error while updating user." });
      }

      res.json({ message: "Car purchased and user updated successfully!" });
    });
  });
});

//========================Rental=============================

// get all cars from the rental table
app.get("/rental/cars", (req, res) => {
  const query = "SELECT * FROM rental";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching rental cars:", err);
      return res.status(500).json({ message: "Failed to fetch rental cars" });
    }
    res.json(results);
  });
});

// Get featured cars (Landing pager er feature cars component er jonno)
app.get("/rental/car", (req, res) => {
  const query = `SELECT * FROM rental WHERE is_available = 'Yes' LIMIT 6`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching featured cars:", err);
      return res.status(500).json({ message: "Failed to fetch featured cars" });
    }
    res.json(results);
  });
});

// Get the single car via id from the rental table
app.get("/rental/car/:rentalId", (req, res) => {
  const rentalId = req.params.rentalId;

  const query = `SELECT * FROM rental WHERE rental_id = ?`;

  db.query(query, [rentalId], (err, results) => {
    if (err) {
      //console.error("Error fetching rental car details:", err);
      return res.status(500).json({ message: "Failed to fetch car details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(results[0]);
  });
});

// Add car to the rental table
app.post("/rental/add", (req, res) => {
  const {
    rental_id,
    car_id,
    brand,
    model,
    year,
    daily_rate,
    weekly_rate,
    monthly_rate,
    is_available,
    image,
  } = req.body;

  const query = `
  INSERT INTO rental (rental_id,brand, model, year, daily_rate, weekly_rate, monthly_rate, is_available, image) 
  VALUES (?,?,?, ?, ?, ?, ?, ?, ?)
`;
  db.query(
    query,
    [
      rental_id,
      brand,
      model,
      year,
      daily_rate,
      weekly_rate,
      monthly_rate,
      is_available,
      image,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding rental car:", err.message);
        return res.status(500).json({ message: "Failed to add car." });
      }

      res.json({ message: "Car added successfully!", carId: result.insertId });
    }
  );
});

//Filtered search for rental
app.get("/rental/all-cars", (req, res) => {
  const { page = 1, size = 6, filter, sort, search } = req.query;

  const limit = parseInt(size, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  let query = "SELECT * FROM rental";
  const params = [];
  if (filter) {
    query +=
      filter === "available"
        ? " WHERE is_available = 'Yes'"
        : " WHERE is_available = 'No'";
  }
  if (search) {
    query += query.includes("WHERE") ? " AND" : " WHERE";
    query += " (brand LIKE ? OR model LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  if (sort) {
    if (sort === "priceAsc") query += " ORDER BY daily_rate ASC";
    if (sort === "priceDesc") query += " ORDER BY daily_rate DESC";
    if (sort === "yearAsc") query += " ORDER BY year ASC";
    if (sort === "yearDesc") query += " ORDER BY year DESC";
  }
  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching rental cars:", err);
      return res.status(500).json({ message: "Failed to fetch cars." });
    }
    const countQuery = "SELECT COUNT(*) AS count FROM rental";
    db.query(countQuery, (countErr, countResults) => {
      if (countErr) {
        console.error("Error counting cars:", countErr);
        return res.status(500).json({ message: "Failed to count cars." });
      }

      res.json({ cars: results, totalCount: countResults[0].count });
    });
  });
});

// Delete car from the rental table
app.delete("/rental/delete/:rentalId", (req, res) => {
  const { rentalId } = req.params;
  const query = "DELETE FROM rental WHERE rental_id = ?";
  db.query(query, [rentalId], (err, result) => {
    if (err) {
      console.error("Error deleting rental car:", err);
      return res.status(500).json({ message: "Failed to delete car." });
    }
    res.json({ message: "Car deleted successfully!" });
  });
});

//Rented Cars Count
app.get("/rental/rented", (req, res) => {
  const query =
    "SELECT COUNT(*) AS count FROM rental WHERE is_available = 'No'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching rented cars count:", err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ count: results[0].count });
  });
});

//Update car in the rental table
app.put("/rental/edit/:id", (req, res) => {
  const rentalId = req.params.id;
  const updatedData = req.body;

  const query = "UPDATE rental SET ? WHERE rental_id = ?";

  db.query(query, [updatedData, rentalId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Failed to update rental details." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rental not found." });
    }

    res.json({ message: "Rental details updated successfully." });
  });
});

// When user rents a car
app.put("/rental/purchase/:carId", (req, res) => {
  const carId = req.params.carId;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const updateQuery1 = "UPDATE rental SET is_available = ? WHERE rental_id = ?";
  db.query(updateQuery1, ["No", carId], (updateErr) => {
    if (updateErr) {
      console.error("Error updating rental:", updateErr);
      return res
        .status(500)
        .json({ message: "Database error while updating rental." });
    }

    const updateQuery2 = `
      UPDATE users
      SET rented_car_ids = TRIM(CONCAT(IFNULL(rented_car_ids, ''), ' ', ?))
      WHERE user_id = ?;
    `;
    db.query(updateQuery2, [carId, userId], (userUpdateErr) => {
      if (userUpdateErr) {
        console.error("Error updating user's rented cars:", userUpdateErr);
        return res
          .status(500)
          .json({ message: "Database error while updating user." });
      }

      res.json({ message: "Car rented and user updated successfully!" });
    });
  });
});

//============================Services========================
// Get all services
app.get("/services", (req, res) => {
  const query = `
    SELECT *
    FROM services
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching services:", err);
      return res.status(500).json({ message: "Failed to fetch services." });
    } else {
      res.json(results);
      //console.log("Success");
    }
  });
});
// Add a service
app.post("/services/add", (req, res) => {
  const {
    service_id,
    service_name,
    description,
    price,
    estimated_duration,
    category,
    status,
    image,
  } = req.body;
  const query = `
    INSERT INTO services (service_id, service_name, description, price, estimated_duration, category, status, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      service_id,
      service_name,
      description,
      price,
      estimated_duration,
      category,
      status,
      image,
    ],
    (err, results) => {
      if (err) {
        //console.error("Error adding service:", err);
        return res.status(500).json({ message: "Failed to add service." });
      }
      res.json({ message: "Service added successfully!" });
    }
  );
});
// Delete a service
app.delete("/services/delete/:serviceId", (req, res) => {
  const { serviceId } = req.params;
  const query = "DELETE FROM services WHERE service_id = ?";
  db.query(query, [serviceId], (err, results) => {
    if (err) {
      console.error("Error deleting service:", err);
      return res.status(500).json({ message: "Failed to delete service." });
    }
    res.json({ message: "Service deleted successfully!" });
  });
});
// Update a service
app.put("/services/edit/:id", (req, res) => {
  const serviceId = req.params.id;
  const updatedData = req.body;

  const query = "UPDATE services SET ? WHERE service_id = ?";

  db.query(query, [updatedData, serviceId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "Failed to update service details." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found." });
    }

    res.json({ message: "Service details updated successfully." });
  });
});

// Get a single service
app.get("/services/:serviceId", (req, res) => {
  const { serviceId } = req.params;
  const query = "SELECT * FROM services WHERE service_id = ?";
  db.query(query, [serviceId], (err, results) => {
    if (err) {
      console.error("Error fetching service:", err);
      return res.status(500).json({ message: "Failed to fetch service." });
    }
    res.json(results[0]);
  });
});

//book a service
app.put("/service/purchase/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  if (!serviceId) {
    return res.status(400).json({ message: "Service ID is required." });
  }

  const updateQuery = `
    UPDATE users
    SET purchased_service_ids = TRIM(CONCAT(IFNULL(purchased_service_ids, ''), ' ', ?))
    WHERE user_id = ?;
  `;
  db.query(updateQuery, [serviceId, userId], (userUpdateErr) => {
    if (userUpdateErr) {
      console.error("Error updating user's purchased services:", userUpdateErr);
      return res
        .status(500)
        .json({ message: "Database error while updating user." });
    }

    res.json({ message: "Service purchased and user updated successfully!" });
  });
});

//============================User========================

// Get all users
app.get("/user", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Failed to fetch users." });
    }
    res.json(results);
  });
});

// Get a single user
app.get("/user/:email", (req, res) => {
  const { email } = req.params;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Failed to fetch user." });
    }
    res.json(results[0]);
  });
});

// Add a user
app.post("/user/add", (req, res) => {
  const { name, email } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Database error." });
    } else if (results.length > 0) {
      return res.status(200).json({ user: results[0] });
    } else {
      const queryInsert = `
      INSERT INTO users (name, email, purchased_car_ids, rented_car_ids, purchased_service_ids, is_admin, admin_request) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      db.query(
        queryInsert,
        [name, email, null, null, null, false, false],
        (err, result) => {
          if (err) {
            console.error("Error adding user:", err);
            return res.status(500).json({ message: "Failed to add user." });
          }

          res.status(201).json({
            user: {
              user_id: result.insertId,
              name,
              email,
              purchased_car_ids: null,
              rented_car_ids: null,
              purchased_service_ids: null,
              is_admin: false,
              admin_request: false,
            },
          });
        }
      );
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
