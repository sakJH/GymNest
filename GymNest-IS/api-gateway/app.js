const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Zde můžete přidat vlastní middleware nebo konfiguraci
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});