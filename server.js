const express = require("express");
const cors = require("cors");
const dept_router = require("./routes/department");
const emp_router = require("./routes/employee");
const create_router = require("./routes/createemp");
const admin_router = require("./routes/adminlogintable");
const leave_router = require("./routes/leaverequest");
const task_router = require("./routes/task");
const history_router = require("./routes/task_history");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static("./public"));

app.use("/api/v1/department", dept_router);
app.use("/api/v1/employee", emp_router);
app.use("/api/v1/createemp", create_router);
app.use("/api/v1/adminlogintable", admin_router);
app.use("/api/v1/leave", leave_router);
app.use("/api/v1/task", task_router);
app.use("/api/v1/task_history", history_router);

const port = 5000;

app.listen(port, console.log(`the port is running at ${port}`));
