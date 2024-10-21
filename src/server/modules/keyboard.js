const buttonsConfig = {
  guestMenu: {
    title: {
      pl: 'Proszę wybrać dzialanie',
      en: 'Please select an action',
      de: 'Bitte wählen Sie eine Aktion',
      ua: 'Оберіть, будь ласка, дію'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      pl: [
        [{ text: '📜 Pobierz menu', callback_data: '0_3' }],
        [{ text: '📝 Zamówienia', callback_data: '0_5' }],
        [{ text: '🇵🇱 🇬🇧 🇩🇪 🇺🇦 Wybierz język', callback_data: '0_1' }],
        [{ text: '✉︎ Zapytaj nas o cokolwiek w naszej działalności', callback_data: '0_2' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      en: [
        [{ text: '📜 Download the menu', callback_data: '0_3' }],
        [{ text: '📝 Your orders', callback_data: '0_5' }],
        [{ text: '🇵🇱 🇬🇧 🇩🇪 🇺🇦 Select a language', callback_data: '0_1' }],
        [{ text: '✉︎ Ask us about anything in our business', callback_data: '0_2' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      de: [
        [{ text: '📜 Menü herunterladen', callback_data: '0_3' }],
        [{ text: '📝 Ihre Aufträge', callback_data: '0_5' }],
        [{ text: '🇵🇱 🇬🇧 🇩🇪 🇺🇦 Wählen Sie eine Sprache', callback_data: '0_1' }],
        [{ text: '✉︎ Fragen Sie uns nach allem in unserem Geschäft', callback_data: '0_2' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ua: [
        [{ text: '📜 Завантажити меню', callback_data: '0_3' }],
        [{ text: '📝 Ваші замовлення', callback_data: '0_5' }],
        [{ text: '🇵🇱 🇬🇧 🇩🇪 🇺🇦 Виберіть мову', callback_data: '0_1' }],
        [{ text: '✉︎ Запитайте нас про що завгодно (в нашому бізнесі)', callback_data: '0_2' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },
  guestChooseLanguage: {
    title: {
      pl: 'Proszę wybrać język',
      en: 'Please select a language',
      de: 'Bitte wählen Sie eine Sprache',
      ua: 'Оберіть, будь ласка, мову'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      pl: [
        [{ text: '🇵🇱 Polski', callback_data: '0_6' }],
        [{ text: '🇬🇧 English', callback_data: '0_7' }],
        [{ text: '🇩🇪 Deutsch', callback_data: '0_8' }],
        [{ text: '🇺🇦 Українська', callback_data: '0_9' }],
        [{ text: '↩️', callback_data: '0_12' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      en: [
        [{ text: '🇵🇱 Polski', callback_data: '0_6' }],
        [{ text: '🇬🇧 English', callback_data: '0_7' }],
        [{ text: '🇩🇪 Deutsch', callback_data: '0_8' }],
        [{ text: '🇺🇦 Українська', callback_data: '0_9' }],
        [{ text: '↩️', callback_data: '0_12' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      de: [
        [{ text: '🇵🇱 Polski', callback_data: '0_6' }],
        [{ text: '🇬🇧 English', callback_data: '0_7' }],
        [{ text: '🇩🇪 Deutsch', callback_data: '0_8' }],
        [{ text: '🇺🇦 Українська', callback_data: '0_9' }],
        [{ text: '↩️', callback_data: '0_12' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ua: [
        [{ text: '🇵🇱 Polski', callback_data: '0_6' }],
        [{ text: '🇬🇧 English', callback_data: '0_7' }],
        [{ text: '🇩🇪 Deutsch', callback_data: '0_8' }],
        [{ text: '🇺🇦 Українська', callback_data: '0_9' }],
        [{ text: '↩️', callback_data: '0_12' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },
  usersStarterMenu: {
    title: {
      pl: 'Proszę wybrać dzialanie',
      en: 'Please select an action',
      de: 'Bitte wählen Sie eine Aktion',
      ua: 'Оберіть, будь ласка, дію'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      pl: [
        [{ text: '➕ Utwórz nowe zamówienia', callback_data: '2_1' }],
        [{ text: '📒 Zamówienia czekają na odbiór osobisty', callback_data: '2_3' }],
        [{ text: '📗 Przeglądaj zakończone Zamówienia', callback_data: '2_4' }],
        [{ text: '📕 Zamówienia wymagające Twojego uzupełnienia', callback_data: '2_11' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      en: [
        [{ text: '➕ Create a new order', callback_data: '2_1' }],
        [{ text: '📒 Ready to get', callback_data: '2_3' }],
        [{ text: '📗 View completed orders', callback_data: '2_4' }],
        [{ text: '📕 Requests needing your clarification', callback_data: '2_11' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      de: [
        [{ text: '➕ Neue Anfrage erstellen??????', callback_data: '2_1' }],
        [{ text: '📒 Offene Anfragen anzeigen??????', callback_data: '2_3' }],
        [{ text: '📗 Abgeschlossene Anfragen anzeigen??????', callback_data: '2_4' }],
        [{ text: '📕 Anfragen, die Ihre Klärung benötigen??????', callback_data: '2_11' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      ua: [
        [{ text: '➕ Створити нове замовлення', callback_data: '2_1' }],
        [{ text: '📒 Замовлення до отримання', callback_data: '2_3' }],
        [{ text: '📗 Переглянути замовлення, що вже є виконаними раніше', callback_data: '2_4' }],
        [{ text: '📕 Замовлення, за якими Ви не прийшли', callback_data: '2_11' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },

  // clientAdminStarterButtons: {
  //   title: 'Оберіть, будь ласка, дію',
  //   options: [{ resize_keyboard: true }],
  //   buttons: [
  //     [{ text: 'Отримати інформацію про користувача', callback_data: '3_1' }],
  //     [{ text: 'Надіслати відповідь на звернення', callback_data: '3_2' }],
  //     [{ text: '🏠', callback_data: '0_4' }]
  //   ]
  // },
  // chooseSenMessageSettings: {
  //   title: 'Оберіть, будь ласка, отримувачів повідомлення:',
  //   options: [{ resize_keyboard: true }],
  //   buttons: [
  //     [{ text: '🤽‍♂️ Обрати підрозділ(и) зі списку', callback_data: '19_1' }],
  //     [{ text: '🤽‍♀️ Обрати користувачів зі списку в підрозділах', callback_data: '19_2' }],
  //     [{ text: '👦🏼 Знайти користувача', callback_data: '19_3' }],
  //     [{ text: '🤽‍♀️ Показати список отримувачів (тут обрати - це видалити)', callback_data: '19_5' }],
  //     [{ text: '📧 Сформувати та надіслати повідомлення', callback_data: '19_4' }],
  //     [{ text: '↩️', callback_data: '3_3' }]
  //   ]
  // },
  // chooseTypeOfPeriod: {
  //   title: 'Оберіть, будь ласка, період формування звіту:',
  //   options: [{ resize_keyboard: true }],
  //   buttons: [
  //     [
  //       { text: '🌗 Останній місяць (останні 30 днів)', callback_data: 'last_month' },
  //       { text: '🌔 Останній тиждень (останні 7 днів)', callback_data: 'last_week' }
  //     ],
  //     [
  //       { text: '🌛🌜 Довільний період', callback_data: 'any_period' },
  //       { text: '🌕 Останній рік (останні 365 днів)', callback_data: 'last_year' }
  //     ],
  //     [
  //       { text: '🌙 Сьогодні', callback_data: 'today' },
  //       { text: '↖️', callback_data: 'x_x' }
  //     ]
  //   ]
  // },

}

const texts = {
  en: {
    '0_1': 'Sorry, there was an error sending the file.',
    '0_2': 'Leave a text message below.',
    '0_3': 'You have not left a meaningful message. Please try again',
    '0_4': 'Thank you! Your message has been sent.\n Wait for a response within 30 minutes',
    '0_5': 'There was an error processing your request.',
    '0_6': 'Sorry, you are too far from our café to place an order.',

  },
  pl: {
    '0_1': 'Przepraszamy, wystąpił błąd podczas wysyłania pliku.',
    '0_2': 'Pozostaw poniżej wiadomość tekstową.',
    '0_3': 'Nie zostawiłeś sensownej wiadomości. Spróbuj ponownie',
    '0_4': 'Dziękuję! Twoja wiadomość została wysłana.\n Odpowiedź otrzymasz w ciągu 30 minut',
    '0_5': 'Wystąpił błąd podczas przetwarzania Twojego żądania.',
    '0_6': 'Przepraszamy, jesteś zbyt daleko od naszej kawiarni, aby złożyć zamówienie.',

  },
  de: {
    '0_1': 'Entschuldigung, beim Senden der Datei ist ein Fehler aufgetreten.',
    '0_2': 'Hinterlassen Sie unten eine Textnachricht.',
    '0_3': 'Sie haben keine sinnvolle Nachricht hinterlassen. Bitte versuchen Sie es erneut',
    '0_4': 'Danke! Ihre Nachricht wurde gesendet.\n Warten Sie auf eine Antwort innerhalb von 30 Minuten',
    '0_5': 'Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten.',
    '0_6': 'Entschuldigung, Sie sind zu weit von unserem Café entfernt, um eine Bestellung aufzugeben.',
  },
  ua: {
    '0_1': 'Вибачте, сталася помилка під час відправлення файлу.',
    '0_2': 'Залиште текстове повідомлення нижче.',
    '0_3': 'Ви не залишили змістовного повідомлення. Будь ласка, спробуйте ще раз',
    '0_4': 'Дякуємо! Ваше повідомлення відправлено.\n Очікуйте відповіді протягом 30 хвилин',
    '0_5': 'Під час обробки вашого запиту сталася помилка.',
    '0_6': "Вибачте, ви занадто далеко від нашої кав'ярні, щоб зробити замовлення.",
  }
}
module.exports = { buttonsConfig, texts }
