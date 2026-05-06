const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Supabase
const supabase = createClient(
  "https://lkcurpkkbmrvxtsfwqli.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrY3VycGtrYm1ydnh0c2Z3cWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMzQ1MTEsImV4cCI6MjA5MzYxMDUxMX0.E-5GHLZeAJx1G1lhUdIUtQsra6rUP2CxSQmbuAmxj4c"
);

// (opcional) pasta static
const pastaview = path.join(__dirname, "view");
app.use(express.static(pastaview));

app.post("/enviar", async (req, res) => {
  const { nome, email, servico } = req.body;
  console.log("DADOS A ENVIAR:", { nome, email, servico });

  try {
    const { data, error } = await supabase
      .from("Pedidos")
      .insert([{ nome, email, servico }]);

    if (error) {
      console.log("❌ SUPABASE ERROR:", error);
      return res.status(500).json({ ok: false });
    }

    console.log("✅ GUARDADO NA BASE");

    return res.json({
      ok: true,
      message: "Pedido enviado com sucesso"
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return res.status(500).json({
      ok: false,
      message: "Erro no servidor"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor online na porta " + PORT);
});