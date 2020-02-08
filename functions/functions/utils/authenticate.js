const { admin, db } = require('./admin')

module.exports = (req, res, next) => {
    let idToken
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
        console.error('no token found')
        return res.status(403).json({ error: 'unauthorized' })
    }
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken
            return db.collection('users')
                .where('userId', '==', req.user.user_id)
                .limit(1)
                .get()
        })
        .then(data => {
            req.user.email = data.docs[0].data().email
            return next()
        })
        .catch(err => {
            console.error('error while verifying token ', err)
            return res.status(403).json(err)
        })
}