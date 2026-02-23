const CryptoJS = require('crypto-js');
const admin = require('firebase-admin');

// Инициализация Firebase (нужно добавить Service Account в переменные Netlify)
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(
			JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
		),
	});
}

const db = admin.firestore();

exports.handler = async (event) => {
	const data = JSON.parse(event.body);
	const { orderReference, transactionStatus } = data;
	const merchantSecret = process.env.WFP_MERCHANT_SECRET;

	console.log(data);

	// Проверка подписи (упрощенно для примера, в проде сверяй все поля)
	if (transactionStatus === 'Approved') {
		// Извлекаем userId из orderReference (он там зашит после ORDER_)
		const userId = orderReference.split('_')[1];

		// Обновляем доступ в Firebase
		await db.collection('users').doc(userId).update({ hasCourseABC: true });
	}

	// Ответ для WayForPay (обязательно!)
	const time = Math.floor(Date.now() / 1000);
	const resSig = CryptoJS.HmacMD5(
		[orderReference, 'accept', time].join(';'),
		merchantSecret,
	).toString();

	return {
		statusCode: 200,
		body: JSON.stringify({
			orderReference,
			status: 'accept',
			time,
			signature: resSig,
		}),
	};
};
