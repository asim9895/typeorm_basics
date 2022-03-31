import express from 'express';
import { postgres_db } from './database/postgres';
import { clientRoutes } from './routes/clientRoutes';
import { bankerRoutes } from './routes/bankerRoutes';
import { transactionRoutes } from './routes/transactionRoutes';

postgres_db();

const app = express();
const port = process.env.PORT || 2900;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/bank', clientRoutes);
app.use('/api/bank', bankerRoutes);
app.use('/api/bank', transactionRoutes);

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
