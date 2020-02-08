const functions = require('firebase-functions');
const { signup, login, addListing,getUserDetails, search, getListingFromUser, deleteListing, getLastTen,updateDiscordID } = require('./handlers/user')
const Authenticate = require('./utils/authenticate')

const app = require('express')()
const cors = require('cors')
app.use(cors())


app.post('/signup', signup)
app.post('/login', login)
app.post('/addlisting', Authenticate, addListing)
app.post('/updatediscord', Authenticate, updateDiscordID)
app.post('/getUserDetails', Authenticate, getUserDetails)
app.post('/search', search)
app.post('/getuserlistings', Authenticate, getListingFromUser)
app.post('/deletelisting', Authenticate, deleteListing)
app.post('/getlastten', getLastTen)


exports.api = functions.https.onRequest(app)