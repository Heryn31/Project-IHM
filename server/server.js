const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const loginRoute = require('./routes/auth');
const bcrypt = require("bcryptjs");
const session = require("express-session");

const { v4: uuidv4 } = require('uuid');


const app = express();

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
  // autres champs...
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);



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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur Express sur le port ${PORT}`));
