import Talk from '../assets/children.png';
import Computer from '../assets/boy.png';
import Books from '../assets/chat (1).png';
// import Fire from '../assets/fire.png';

export const servicesData = [
	{
		id: 1,
		image: Talk,
		title: 'Групові заняття онлайн для дітей 7–12 років',
		subtitle: 'Дитина розуміє, але не говорить? ',
		points: [
			'регулярна розмовна практика в мінігрупах',
			'підтримка та мотивація без стресу',
			'дитина починає відповідати і будувати речення',
		],
		result: 'Результат:',
		resultText:
			'Дитина не боїться говорити англійською і розуміє уроки в школі',
		price: {
			amount: '2000 грн./місяць',
			// icon: Fire,
			// note: "* діє до 31.08",
		},
		link: 'Залишити заявку',
		type: 'external', // Тип: внешняя ссылка
		action: 'tg://resolve?domain=AnnaYakushkina', // Куда веде
	},

	{
		id: 2,
		image: Computer,
		title: 'Онлайн-курси англійської',
		subtitle: 'Для тих, хто хоче займатися у своєму темпі',
		points: [
			'короткі відеоуроки',
			'завдання та словники до кожного уроку',
			'доступ у будь-який час',
		],
		result: 'Підійде якщо:',
		resultText:
			'Немає можливості відвідувати заняття, але хочеться системності',
		price: {
			amount: '',
			// icon: Fire,
			note: '',
		},
		link: 'Обрати курс',
		type: 'modal', // Тип: переход внутри сайта
		action: 'handleCoursesClick', // Роут
	},

	{
		id: 3,
		image: Books,
		title: 'Мовні консультації',
		subtitle: 'Розумієш англійську, але складно говорити?',
		points: [
			'один на один міні-сесії під твій запит',
			'допомога “розговоритися”',
			'пояснення без складної теорії',
		],
		result: 'Результат:',
		resultText: 'Ти починаєш говорити, а не просто вчити',
		price: {
			amount: '',
			// icon: Fire,
			note: '',
		},
		link: 'Подати заявку',
		type: 'external', // Тип: внешняя ссылка
		action: 'tg://resolve?domain=AnnaYakushkina', // Куда веде
	},
];
