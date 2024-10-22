const buttonsConfig = {
  guestMenu: {
    title: {
      pl: 'Proszę wybrać dzialanie',
      en: 'Please select an action',
      de: 'Bitte wählen Sie eine Aktion',
      uk: 'Оберіть, будь ласка, дію'
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
        [{ text: '🇵🇱 🇬🇧 🇩🇪 🇺🇦 Select a langukge', callback_data: '0_1' }],
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
      uk: [
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
      en: 'Please select a langukge',
      de: 'Bitte wählen Sie eine Sprache',
      uk: 'Оберіть, будь ласка, мову'
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
      uk: [
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
      uk: 'Оберіть, будь ласка, дію'
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
      uk: [
        [{ text: '➕ Створити нове замовлення', callback_data: '2_1' }],
        [{ text: '📒 Замовлення до отримання', callback_data: '2_3' }],
        [{ text: '📗 Переглянути замовлення, що вже є виконаними раніше', callback_data: '2_4' }],
        [{ text: '📕 Замовлення, за якими Ви не прийшли', callback_data: '2_11' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    }
  },
  usersOrderMenu: {
    title: {
      pl: 'Proszę wybrać dzialanie',
      en: 'Please select an action',
      de: 'Bitte wählen Sie eine Aktion',
      uk: 'Оберіть, будь ласка, дію'
    },
    options: [{ resize_keyboard: true }],
    buttons: {
      pl: [
        [{ text: '📝 Dodaj produkt', callback_data: '3_1' }],
        [{ text: '📝 Usuń produkt', callback_data: '3_2' }],
        [{ text: '📝 Wyślij zamówienie', callback_data: '3_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      en: [
        [{ text: '📝 Add a product', callback_data: '3_1' }],
        [{ text: '📝 Remove a product', callback_data: '3_2' }],
        [{ text: '📝 Send the order', callback_data: '3_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      de: [
        [{ text: '📝 Produkt hinzufügen', callback_data: '3_1' }],
        [{ text: '📝 Produkt entfernen', callback_data: '3_2' }],
        [{ text: '📝 Bestellung senden', callback_data: '3_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ],
      uk: [
        [{ text: '📝 Додати продукт', callback_data: '3_1' }],
        [{ text: '📝 Видалити продукт', callback_data: '3_2' }],
        [{ text: '📝 Відправити замовлення', callback_data: '3_3' }],
        [{ text: '🏠', callback_data: '0_4' }]
      ]
    },
  }
}


const texts = {
  en: {
    '0_0': 'We are open /n Monday - Friday 8:00 - 17:00 /n Saturday 9-15:00',
    '0_1': 'Sorry, there was an error sending the file.',
    '0_2': 'Leave a text message below.',
    '0_3': 'You have not left a meaningful message. Please try again',
    '0_4': 'Thank you! Your message has been sent.\n Wait for a response within 30 minutes',
    '0_5': 'There was an error processing your request.',
    '0_6': 'Sorry, you are too far from our café to place an order.',
    '0_7': 'Added:',
    '0_8': 'Removed:',
    '0_9': 'No products selected',
    '0_10': 'Selected products',
    '0_11': 'Send Order',
    '0_12': 'Cancel Order',
    '0_13': 'To send the message, select the products',
  },
  pl: {
    '0_0': 'Jesteśmy otwarci /n poniedziałek - piątek 8:00 - 17:00 /n sobota 9-15:00',
    '0_1': 'Przepraszamy, wystąpił błąd podczas wysyłania pliku.',
    '0_2': 'Pozostaw poniżej wiadomość tekstową.',
    '0_3': 'Nie zostawiłeś sensownej wiadomości. Spróbuj ponownie',
    '0_4': 'Dziękuję! Twoja wiadomość została wysłana.\n Odpowiedź otrzymasz w ciągu 30 minut',
    '0_5': 'Wystąpił błąd podczas przetwarzania Twojego żądania.',
    '0_6': 'Przepraszamy, jesteś zbyt daleko od naszej kawiarni, aby złożyć zamówienie.',
    '0_7': 'Dodano:',
    '0_8': 'Usunięto:',
    '0_9': 'Nie wybrano produktów',
    '0_10': 'Wybrane produkty',
    '0_11': 'Wyślij zamówienie',
    '0_12': 'Anuluj zamówienie',
    '0_13': 'Aby wysłać wiadomość, wybierz produkty',
  },
  de: {
    '0_0': 'Wir sind geöffnet /n Montag - Freitag 8:00 - 17:00 /n Samstag 9-15:00',
    '0_1': 'Entschuldigung, beim Senden der Datei ist ein Fehler aufgetreten.',
    '0_2': 'Hinterlassen Sie unten eine Textnachricht.',
    '0_3': 'Sie haben keine sinnvolle Nachricht hinterlassen. Bitte versuchen Sie es erneut',
    '0_4': 'Danke! Ihre Nachricht wurde gesendet.\n Warten Sie auf eine Antwort innerhalb von 30 Minuten',
    '0_5': 'Bei der Verarbeitung Ihrer Anfrage ist ein Fehler aufgetreten.',
    '0_6': 'Entschuldigung, Sie sind zu weit von unserem Café entfernt, um eine Bestellung aufzugeben.',
    '0_7': 'Hinzugefügt:',
    '0_8': 'Entfernt:',
    '0_9': 'Keine Produkte ausgewählt',
    '0_10': 'Ausgewählte Produkte',
    '0_11': 'Bestellung senden',
    '0_12': 'Bestellung abbrechen',
    '0_13': 'Um die Nachricht zu senden, wählen Sie die Produkte aus',
  },
  uk: {
    '0_0': 'Ми працюємо /n Понеділок - П\'ятниця 8:00 - 17:00 /n Субота 9-15:00',
    '0_1': 'Вибачте, сталася помилка під час відправлення файлу.',
    '0_2': 'Залиште текстове повідомлення нижче.',
    '0_3': 'Ви не залишили змістовного повідомлення. Будь ласка, спробуйте ще раз',
    '0_4': 'Дякуємо! Ваше повідомлення відправлено.\n Очікуйте відповіді протягом 30 хвилин',
    '0_5': 'Під час обробки вашого запиту сталася помилка.',
    '0_6': "Вибачте, ви занадто далеко від нашої кав'ярні, щоб зробити замовлення.",
    '0_7': 'Додано:',
    '0_8': 'Видалено:',
    '0_9': 'Продукти не вибрані',
    '0_10': 'Вибрані продукти',
    '0_11': 'Відправити замовлення',
    '0_12': 'Скасувати замовлення',
    '0_13': 'Для відправлення повідомлення виберіть продукти',
  }
}
module.exports = { buttonsConfig, texts }
