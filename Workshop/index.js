const express = require('express');

const app = express();
const port = 3000;

require('./config/express')(app);
require('./config/routes')(app);

app.listen(port, console.log(`Server started on port: ${port}`));