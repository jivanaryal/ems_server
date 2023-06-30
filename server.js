const express = require("express");
const cors = require("cors");
const dept_router = require("./routes/department");
const emp_router = require("./routes/employee");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/department", dept_router);
app.use("/api/v1/employee", emp_router);

const port = 5000;

app.listen(port, console.log(`the port is running at ${port}`));
