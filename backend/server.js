import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import productRoute from './routes/productRoutes';
import orderRoute from './routes/orderRoutes';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(res => console.log(`MongoDB connected...`))
  .catch(error => console.log(error.message));

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log('Server started at ', (new Date()).toLocaleString());
  console.log(`Server listening on port 5000, use http://localhost:5000 to connect`);
});
