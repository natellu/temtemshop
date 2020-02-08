const { admin, db } = require('../utils/admin')
const firebase = require('firebase')
const config = require('../utils/config')
firebase.initializeApp(config)


const { validateSignupData, validateLoginData } = require('../utils/validators')

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        discord: req.body.discord,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    const { valid, errors } = validateSignupData(newUser)
    if(!valid) return res.status(400).json(errors)

    let token, userId 
    db.doc(`/users/${newUser.email}`).get()
        .then(doc => {
            if(doc.exists) return res.status(400).json({email: 'email already taken'})
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        })
        .then(data => {
            userId = data.user.uid 
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId,
                discord: newUser.discord
            }
            return db.doc(`/users/${newUser.email}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({token})
        })
        .catch(err => {
            if (err.code == 'auth/email-already-in-use') return res.status(400).json({ email: 'email is already in use' })
            
            return res.status(500).json({ general: 'something went wrong, please try again' })
        })
}

exports.updateDiscordID = (req, res) => {
    db.doc(`/users/${req.user.email}`).update({discord: req.body.discord})
        .then(() => {
            return res.json({message: 'discord id changed'})
        })
        .catch(() => {
            return res.status(500).json({error: 'something went wrong'})
        })
}


exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const { valid, errors } = validateLoginData(user)
    if(!valid) return res.status(400).json(errors)

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.json({ token })
        })
        .catch(err => {
            return res.status(403).json({ general: 'wrong credentials'})
        })
}

exports.addListing = (req, res) => {
    console.log(req)
    const newListing = {
        name: req.body.name,
        level: req.body.level,
        user: req.user.email,
        userDiscord: req.body.userdiscord,
        lp: req.body.lp,
        aus: req.body.aus,
        def: req.body.def,
        spdef: req.body.spdef,
        atk: req.body.atk,
        spatk: req.body.spatk,
        spd: req.body.spd,
        luma: req.body.luma,
        price: req.body.price,
        sex: req.body.sex,
        fertility: req.body.fertility,
        createdAt: new Date().toISOString()
    }

    db.collection("listings").add(
        newListing
    )
    .then(docRef => {
        console.log(`writen with id: ${docRef.id}`)
        return res.json({message: 'listing added'})
    })
    .catch(err => {
        console.error(err)
        return res.status(500).json({message: err})
    })
}

exports.getUserDetails = (req, res) => {
    let userData = {}
    const email = req.user.email
    db.doc(`/users/${email}`).get()
    .then(doc => {
        if(doc.exists){ 
            userData.user = doc.data()
        }
    })
    .then(() => {
        res.json({"user": userData})
    })
}

exports.search = (req, res) =>{
    let searchQuery = req.body.searchQuery

    let matches = []

    let listings = db.collection('listings')

    let query = listings.where('name', '==', searchQuery).get()
        .then(snapshot => {
            if(snapshot.empty){
                console.log('nothing found')
                return res.status(404).json({message: "no listings"})
            }
            snapshot.forEach(doc => {
                let listing = {
                    id: doc.id,
                    ...doc.data()
                }
                matches.push(listing)
            })

            return res.json({message: matches})
        })
        .catch(err => console.error(err))
}

exports.getLastTen = (req, res) => {
    let matches = []
    let listings = db.collection('listings')
    let query = listings.orderBy('createdAt', 'desc').limit(10).get()
    .then(snapshot => {
        if(snapshot.empty){
            console.log('nothing found')
            return res.status(404).json({message: "no listings"})
        }
        snapshot.forEach(doc => {
            let listing = {
                id: doc.id,
                ...doc.data()
            }
            matches.push(listing)
        })

        return res.json({message: matches})
    })
    .catch(err => console.error(err))
}

exports.getListingFromUser = (req, res) => {
    let matches = []
    let listings = db.collection('listings')
    let query = listings.where('user', '==', req.user.email).get()
        .then(snapshot => {
            if(snapshot.empty){
                console.log("no listings found")
                return res.status(404).json({message: "no listings"})
            }
            snapshot.forEach(doc => {
                let listing = {
                    id: doc.id,
                    ...doc.data()
                }
                matches.push(listing)
            })
            return res.json({message: matches})
        })
        .catch(err => console.error(err))
}

exports.deleteListing = (req, res) => {
    const document = db.doc(`/listings/${req.body.id}`)
    document.get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'listing not found'})
            }
            if(doc.data().user !== req.user.email){
                return res.status(403).json({error: 'unauthorized'})
            }else{
                return document.delete()
            }
        })
        .then(() => {
            res.json({ message: 'listing deleted successfully'})
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({error: err.code})
        })
}

