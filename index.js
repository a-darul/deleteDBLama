const mongoose = require("mongoose");
const DBconfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const Schema = new mongoose.Schema({});

const Trx = mongoose.model("trx", Schema, "trx");
const TrxWallet = mongoose.model("trxWallet", Schema, "transaksiWallet");

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/anekapay_prod", DBconfig),
      console.log("DB Connected");

    console.log("Hapus trx");
    const trx = await Trx.deleteMany({ "trx.epoc": { $lte: 1589037099 } });
    console.log(trx);

    console.log("Hapus wallet");
    const wallet = await TrxWallet.deleteMany({
      tgl: { $gte: -1589037099000 },
    });
    console.log(wallet);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
