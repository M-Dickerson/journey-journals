const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const nodemailer = require('nodemailer');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/api/email', async (req, res) => {
  console.log(req.data);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ryanmbelcher86@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: 'Journey Journals',
    to: 'ryananddomi@gmail.com',
    subject: 'Message from:',
    text: 'Hello World?',
    html: '<p>Hello World?<p>'
  });

  console.log("Message sent: %s", info.messageId);
  res.status(200);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);