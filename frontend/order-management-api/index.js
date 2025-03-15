const express = require('express');
const app = express();
const ordersRouter = require('./routes/orders');

app.use(express.json());
app.use('/orders', ordersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Exporting app for testing
