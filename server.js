// Creates the Express server
import express from 'express';
import router from './routes';

const app = express();
const port = process.env.PORT || 3009;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
export default app;
