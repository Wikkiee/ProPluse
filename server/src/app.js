require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const multer = require("multer");
const upload = multer();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  connection.query(
    "CREATE DATABASE IF NOT EXISTS propluse",
    (err, res, fld) => {
      if (err) throw err;
    }
  );
  connection.query("USE propluse", (err, res, flds) => {
    if (err) throw err;
    console.log("Using ProPluse Database");
  });
  connection.query(
    `CREATE TABLE IF NOT EXISTS Users(
    userId INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255),
    userEmail VARCHAR(255),
    userPassword VARCHAR(255),
    PRIMARY KEY (userId)
  )`,
    (err, res, flds) => {
      if (err) throw err;
      console.log("User Table");
    }
  );
  connection.query(
    `CREATE TABLE IF NOT EXISTS Courses(
    courseId INT NOT NULL AUTO_INCREMENT,
    userId INT,
    courseTitle VARCHAR(255),
    courseCategory VARCHAR(255),
    courseDuration VARCHAR(255),
    courseDescription VARCHAR(1000),
    thumbnailImage MEDIUMBLOB,
    PRIMARY KEY (courseId),
    FOREIGN KEY (userId) REFERENCES Users(userId)
  )`,
    (err, res, flds) => {
      if (err) throw err;
      console.log("Course Table");
    }
  );
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS || "http://localhost:5000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello there",
  });
});

app.get("/check", (req, res) => {
  console.log("Triggered");
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ message: "hello" }));
  console.log("sent successfuly");
});

app.post("/api/v1/register", (req, res) => {
  console.log(req.body);
  connection.query(
    `SELECT * FROM Users WHERE userEmail='${req.body.userEmail}' OR userName='${req.body.userName}'`,
    (err, result, flds) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(result);
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            isSuccess: false,
            isError: true,
            errorMessage: "User Email / User Name is already exist",
          })
        );
      } else {
        bcrypt.hash(req.body.userPassword, 10, function (err, hash) {
          connection.query(
            `INSERT INTO Users(userName,userEmail,userPassword) VALUES(
            '${req.body.userName}','${req.body.userEmail}','${hash}'
          )`,
            (err, result, fild) => {
              if (err) throw err;
              console.log("Inserted successfully");
              res.setHeader("Content-Type", "application/json");
              connection.query(
                `SELECT userId from Users WHERE userEmail='${req.body.userEmail}'`,
                (err, result, fld) => {
                  res.send(
                    JSON.stringify({
                      isSuccess: true,
                      isError: false,
                      data: {
                        userId: result[0].userId,
                        userName: req.body.userName,
                      },
                    })
                  );
                }
              );
            }
          );
        });
      }
    }
  );
});

app.post("/api/v1/login", (req, res) => {
  console.log(req.body);
  connection.query(
    `SELECT userId,userName,userPassword FROM Users WHERE userEmail='${req.body.userEmail}'`,
    (err, result, fild) => {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        const hash = result[0].userPassword;
        const userId = result[0].userId;
        const userName = result[0].userName;
        console.log(hash);
        bcrypt.compare(req.body.userPassword, hash, function (err, result) {
          console.log(result);
          if (result) {
            res.setHeader("Content-Type", "application/json");
            res.send(
              JSON.stringify({
                isSuccess: true,
                isError: false,
                data: {
                  userId: userId,
                  userName: userName,
                },
              })
            );
          } else {
            res.setHeader("Content-Type", "application/json");
            res.send(
              JSON.stringify({
                isSuccess: false,
                isError: true,
                errorMessage: "User Email / Password is invalid",
              })
            );
          }
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            isSuccess: false,
            isError: true,
            errorMessage: "User Email / Password is invalid",
          })
        );
      }
    }
  );
});

app.post("/course/newcourse", upload.single("image"), (req, res) => {
  const imageData = req.file.buffer;
  console.log(req.body);
  console.log("Check");
  connection.query(
    "INSERT INTO courses (userId,courseTitle,courseCategory,courseDuration,courseDescription,thumbnailimage) VALUES (?,?,?,?,?,?)",
    [
      1,
      req.body.courseTitle,
      req.body.courseCategory,
      req.body.courseDuration,
      req.body.courseDescription,
      imageData,
    ],
    (err, result, fld) => {
      if (err) throw err;
      console.log("Inserted Successfully");
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          isSuccess: true,
          isError: false,
          errorMessage: null,
        })
      );
    }
  );
});

app.get("/api/v1/course/user/:userId", (req, res) => {
  console.log(req.params);
  connection.query(
    `SELECT * FROM Courses WHERE userId=${req.params.userId}`,
    (err, result, flds) => {
      if (err) throw err;
      console.log(result);
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          isSuccess: true,
          isError: false,
          errorMessage: null,
          data: result,
        })
      );
    }
  );
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});
