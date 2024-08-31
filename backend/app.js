const express = require("express")
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authenticateToken');
const db = require("./database/index");
const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})