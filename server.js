const app=require('./app');
const PORT=process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Azure Node app is running ✅');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});