const express = require('express');
const fs = require('fs');
const carbone = require('carbone');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001; // Or any other port you prefer

app.get('/', (req, res) => {
  // For simplicity, data is hardcoded here
  var data = [
    {
      "companyName": "JohnInsurance & Co",
      "period": 2,
      "sD": 1659041229,
      "id":2891,
      "insured": {
        "name": "Jean Michel",
        "street": "23, Sycamore Street",
        "city": "New York",
        "phone": "+33 2 38 99 18 23"
      },
      "showPropertyDamage": false,
      "propertyDamage": [
        {
          "type": "Fire"
        },
        {
          "type": "Wind"
        },
        {
          "type": "Hail"
        },
        {
          "type": "Water"
        }
      ],
      "options" : [
        {
          "type": "Furniture",
          "note": "/",
          "cost": 1200
        },
        {
          "type": "Appliances",
          "note": "/",
          "cost": 400
        },
        {
          "type": "Clothing",
          "note": "/",
          "cost": 300
        },
        {
          "type": "Dishes",
          "note": "in some cases",
          "cost": 300
        }
      ],
      "optionsTotalHT": 2200,
      "optionsTaxes": 10,
      "optionsTotal": 2420
    }
  ];
  carbone.render(
    './template.odt',
    data,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error generating invoice.');
      }

      // Send the generated file to the client
      res.setHeader('Content-Type', 'application/vnd.oasis.opendocument.text');

      res.setHeader('Content-Disposition', 'attachment; filename=result.odt');
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
