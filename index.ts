// Packages
import dotenv from 'dotenv';

// Project
import app from './src/app';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));