const axios = require('axios');


const SHEET_ID='1h8vbXgFThuMHNjO3OFKre3jnsQ3ZwjYBZpi-bjTvmrc';
const GID = 0;

const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&id=${SHEET_ID}&gid=${GID}`;


async function fetchCSV() {
  try {
    const response = await axios.get(csvUrl, {
      responseType: 'text', 
      headers: {
        'Accept': 'text/csv',
      },
    });

    console.log('CSV data:\n', JSON.stringify(response.data));
  } catch (error) {
    console.error('Error fetching CSV:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.data);
    }
  }
}

fetchCSV();
