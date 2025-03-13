const express = require('express');
const escpos = require('escpos');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Printer Setup (Replace with your printer’s IP address)
const device = new escpos.Network('10.0.0.75'); // Change this to your printer's IP
const printer = new escpos.Printer(device);

// Route to Receive Orders
app.post('/order', (req, res) => {
    const order = req.body;
    console.log("Received Order:", order);

    device.open(() => {
        printer.text(`Name: ${order.name || "N/A"}`);
        printer.text(`Phone: ${order.phone || "N/A"}`);
        printer.text(`Object: ${order.object || "N/A"}`);
        printer.text(`Color: ${order.color || "N/A"}`);
        printer.text(`Price: $${order.price || "N/A"}`);
        printer.text(`Info: ${order.additionalInfo || "N/A"}`);
        printer.cut();
        printer.close();

        res.status(200).send('Order sent to printer');
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
