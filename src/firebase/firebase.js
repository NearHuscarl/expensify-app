import * as firebase from 'firebase';

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('expenses').on('child_removed', (snapshot) => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
// 	console.log('child change: ', snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
// 	console.log('child added: ', snapshot.key, snapshot.val());
// });

// database.ref('expenses').push({
// 	description: 'toothpaste',
// 	note: '',
// 	amount: 3000,
// 	createdAt: 0,
// });

// database.ref('expenses').on('value', (snapshot) => {
// 	const expenses = [];
// 	snapshot.forEach((childSnapshot) => {
// 		expenses.push({
// 			id: childSnapshot.key,
// 			...childSnapshot.val(),
// 		});
// 	});
// 	console.log(expenses);
// });

// database
// 	.ref('expenses')
// 	.once('value')
// 	.then((snapshot) => {
// 		const expenses = [];

// 		snapshot.forEach((childSnapshot) => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val(),
// 			});
// 		});

// 		console.log(expenses);
// 	});

// database.ref('notes').push({
// 	title: 'Course topic',
// 	body: 'React native, Angular',
// });

// database.ref().on(
// 	'value',
// 	(snapshot) => {
// 		const val = snapshot.val();
// 		console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// 	},
// 	(e) => {
// 		console.log('Error fetching data', e);
// 	},
// );

// database
// 	.ref('location/city')
// 	.once('value')
// 	.then((snapshot) => {
// 		const val = snapshot.val();
// 		console.log(val);
// 	})
// 	.catch((e) => {
// 		console.log('Error fetching data', e);
// 	});

// database
// 	.ref()
// 	.remove()
// 	.then(() => {
// 		console.log('sucessfully delete');
// 	})
// 	.catch((e) => {
// 		console.log('error: ', e);
// 	});

// database
// 	.ref()
// 	.set({
// 		name: 'near',
// 		age: 26,
// 		stressLevel: 6,
// 		isSingle: true,
// 		location: {
// 			city: 'Long An',
// 			country: 'VietNam',
// 		},
// 		job: {
// 			title: 'Software developer',
// 			company: 'Google',
// 		},
// 	})
// 	.then(() => {
// 		console.log('Data is saved');
// 	})
// 	.catch((e) => {
// 		console.log('This failed', e);
// 	});

// database.ref().update({
// 	stressLevel: 9,
// 	'location/city': 'Seattle',
// 	'job/company': 'Amazon',
// });
