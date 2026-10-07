# hurstfurniture.com

```bash
npm install
cp .env.local.example .env.local   # then fill it in
npm run dev                        # http://localhost:3000
```

## Firebase setup (one time)
```bash
npm install -g firebase-tools
firebase login
firebase use --add                 # pick the Hurst Firebase project
(cd functions && npm install)
firebase functions:secrets:set PLACES_API_KEY
firebase deploy --only firestore:rules,storage,functions
```
Then install the "Trigger Email from Firestore" extension (collection: `mail`) in the Firebase console.

## Deploy
```bash
npm run deploy
```
