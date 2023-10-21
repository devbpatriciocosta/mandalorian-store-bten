import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "productsDetails",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Não processada",
      "Processando",
      "Enviado",
      "Entregue",
      "Cancelada",],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);