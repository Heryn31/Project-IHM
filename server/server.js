const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const loginRoute = require('./routes/auth');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const Parser = require("rss-parser");

const { v4: uuidv4 } = require('uuid');


const app = express();
const parser = new Parser({
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)' }
});
const RSS_URL = "https://rss.app/feeds/d87BSTmLJTcl8oUi.xml";
const DEFAULT_THEME = "parc";


app.use(cors({
  origin: 'http://localhost:5173', // l'URL frontend
  credentials: true,
}));

app.use(express.json());

// Connexion MongoDB locale
mongoose.connect("mongodb://localhost:27017/mern_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur de connexion:", err));

//Mise a jour des status
mongoose.connection.once('open', async () => {
  await User.updateMany({}, { status: 'offline' });
  console.log('Tous les utilisateurs mis en statut offline au démarrage');
});


// Schéma utilisateur
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Schéma Price
const PriceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Decouverte', 'Famille', 'Nationale'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'EUR' // ou MGA, USD selon ton besoin
  }
});

// Ampisaina rehefa mampiasa ORM 
const Price = mongoose.model('Price', PriceSchema);

// Schéma Park
const ParkSchema = new mongoose.Schema(
  {
    num: { type: Number, required: true, unique: true },
    title: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    description: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    fauna: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    flora: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    activities: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    access: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
    bestTime: {
      fr: { type: String, required: true },
      en: { type: String, default: "" },
    },
  },
  { timestamps: true, strict: true }
);


// Ampiasaina rehefa mampiasa ORM
const Park = mongoose.model('Park', ParkSchema);

//Schema Image
const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// XD
const Image = mongoose.model('Image', ImageSchema);

//Messages schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message',  messageSchema);


// Exemple d'insertion de prix dans la base de données
// (à commenter après la première exécution pour éviter les doublons)
// await Price.deleteMany({}); //Mamafa ny donnees an'ny Price raha ilaina
// const newPrice = new Price({
//   type: 'Decouverte',
//   amount: 100000,
//   currency: 'MGA'
// });

// Sauvegarde dans MongoDB
// await newPrice.save();

// console.log("Prix inséré :", newPrice);


// Mot de passe de test de Alice 
// addPasswordToUser('681615b9185e31afe7d861e0', 'Nata31.04');


app.use(session({
  secret: 'mySecretKey123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }, // sécuriser + si en prod : secure: true
}));

//Middleware pour verifier le role de l'user eto:
function isAdmin(req, res, next) {
  if (req.session && req.session.userId && req.session.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Accès interdit : Admin uniquement" });
}

//Route pour la connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe invalide' });

    // Crée une session
    req.session.userId = user._id;
    req.session.role = user.role;
    user.status = 'online';
    await user.save();
    res.json({ message: 'Connecté', user: { name: user.name, email: user.email, status: user.status, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//Route pour l'inscription
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà. User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (err) {
    console.error('Erreur lors de l’enregistrement:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


//Route pour l'inscription  de guest 
app.post('/api/guest-login', (req, res) => {
  const guestId = uuidv4(); // ID unique pour chaque invité

  const guestUser = {
    id: guestId,
    name: 'Guest',
    email: `guest_${guestId}@guest.local`,
    role: 'guest'
  };

  // Stocker dans la session
  req.session.user = guestUser;

  res.status(200).json({
    message: 'Connexion en tant qu\'invité réussie',
    user: guestUser
  });
});


// Route pour récupérer les utilisateurs
app.get("/api/users", async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

//Route pour supprimer les utilisateurs
app.delete("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Verification de l'authentification et récupération de l'utilisateur
app.get('/api/check-auth', async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select('name email role status'); // Sécurité : ne pas renvoyer le mot de passe
      return res.json({ authenticated: true, user });
    } catch (err) {
      return res.status(500).json({ authenticated: false, message: 'Erreur lors de la récupération du user' });
    }
  } else {
    res.json({ authenticated: false });
  }
});
// Route de déconnexion
app.get('/api/logout', async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user) {
        user.status = 'offline';
        await user.save(); // 👈 on sauvegarde le nouveau statut
      }
    } catch (err) {
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
  }
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    res.clearCookie('connect.sid'); // Nettoie le cookie de session
    res.json({ message: 'Déconnecté' });
  });
});

// Route des recuperation des donnees via RSS parser
app.get("/api/articles", async (req, res) => {
  try {
    const feed = await parser.parseURL(RSS_URL);

    let articles = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
      description: item.contentSnippet,
      image: extractImageFromContent(item.content)
    }));

    // articles = articles.filter(a =>
    //   a.title.toLowerCase().includes(DEFAULT_THEME) ||
    //   a.description.toLowerCase().includes(DEFAULT_THEME)
    // );

    res.json(articles);
  } catch (error) {
    console.error("Erreur RSS:", error);
    res.status(500).json({ error: error.message });
  }
});

function extractImageFromContent(content) {
  const match = content?.match(/<img.*?src="(.*?)"/);
  return match ? match[1] : null;
}

// Route pour récupérer les prix
app.get("/api/prices", async (req, res) => {
  try {
    const prices = await Price.find();
    res.json(prices);
  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour Modifier les prix par son nom

app.put("/api/prices/:type", async (req, res) => {
  try {
    const { type } = req.params;           // ex: Decouverte
    const { amount, currency } = req.body; // valeurs à modifier

    const updatedPrice = await Price.findOneAndUpdate(
      { type },                            // critère de recherche
      { amount, currency },                // champs à mettre à jour
      { new: true }                        // retourne le document modifié
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: `Prix '${type}' non trouvé.` });
    }

    res.json(updatedPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =====================
// 🔹 READ (GET)
// =====================

app.get("/api/parks", async (req, res) => {
  try {
    const parks = await Park.find();
    res.json(parks);
  } catch (error) {
    console.error("Erreur lors de la récupération des parks:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// =====================
// 🔹 CREATE (POST)
// =====================
app.post("/api/parks", async (req, res) => {
  try {
    const park = new Park(req.body);
    await park.save();
    res.status(201).json(park);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// 🔹 UPDATE (PUT ou PATCH)
// =====================
app.put("/api/parks/:id", async (req, res) => {
  try {
    const park = await Park.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!park) return res.status(404).json({ error: "Parc non trouvé" });
    res.json(park);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// 🔹 DELETE
// =====================
app.delete("/api/parks/:id", async (req, res) => {
  try {
    const park = await Park.findByIdAndDelete(req.params.id);
    if (!park) return res.status(404).json({ error: "Parc non trouvé" });
    res.json({ message: "Parc supprimé avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Messages routes

app.post('/api/messages', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

// Récupérer tous les messages (pour l'admin)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
});

// Marquer un message comme lu
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur Express sur le port ${PORT}`));
