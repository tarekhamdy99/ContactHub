# 📇 ContactHub - Smart Contact Manager

![GitHub repo size](https://img.shields.io/github/repo-size/tarekhamdy99/ContactHub)
![GitHub last commit](https://img.shields.io/github/last-commit/tarekhamdy99/ContactHub)
![GitHub language count](https://img.shields.io/github/languages/count/tarekhamdy99/ContactHub)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-blue)](https://tarekhamdy99.github.io/ContactHub/)

**ContactHub** is an interactive web application for managing contacts, built with pure JavaScript, HTML, and CSS. It's designed as a practical demonstration of **CRUDS** principles (Create, Read, Update, Delete, Search) featuring a modern user interface and smooth user experience.

![ContactHub Screenshot](https://raw.githubusercontent.com/tarekhamdy99/ContactHub/main/Assets/Images/Screenshot.png)
_Add a screenshot of the application here_

---

## ✨ Key Features (CRUDS Operations)

The application implements the full range of data management operations:

| Operation      | Description                                                                                         |
| :------------- | :-------------------------------------------------------------------------------------------------- |
| **Create**     | Add a new contact with name, phone number, email, and category (Favorite/Emergency).                |
| **Read**       | Display all contacts in a structured table with real-time statistics (Total, Favorites, Emergency). |
| **Update**     | Edit any contact's details and save the changes.                                                    |
| **Delete**     | Delete a single contact or clear all contacts at once.                                              |
| **Search**     | Instant search and dynamic filtering by contact name or phone number.                               |
| **Validation** | Input validation (name, Egyptian phone number, email) with alert messages.                          |
| **Status**     | Manage special statuses for contacts such as Favorite or Emergency for quick access.                |
| **Storage**    | Save all data to browser `localStorage` to ensure persistence across page reloads.                  |

---

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=fontawesome&logoColor=white)

- **Frontend:** HTML5, CSS3, Bootstrap 5
- **Logic:** Vanilla JavaScript (ES6+)
- **Icons:** Font Awesome 6
- **Storage:** Browser LocalStorage API
- **Validation:** Custom Regular Expressions

---

## 🚀 Live Demo

Experience the application live: [ContactHub Demo](https://tarekhamdy99.github.io/ContactHub/)

---

## 📂 Project Structure

```
ContactHub/
│
├── index.html        # Main HTML entry point
├── Assets/
│   └── Images/       # Image assets
├── CSS/
│   └── style.css     # Custom stylesheet
├── JS/
│   └── main.js       # Application logic & CRUDS implementation
└── webfonts/         # Font Awesome web fonts
```

## ⚙️ CRUDS Implementation Details

### Create

The `addContact()` function captures input from the form, validates the data, creates a contact object, and pushes it to the main contacts array before updating the UI and localStorage.

### Read

The `displayContacts()` function dynamically renders contact cards/rows in the UI based on the filtered array, updating counters for Total, Favorites, and Emergency contacts.

### Update

By clicking the edit icon, the form switches to "Update Mode", populating fields with existing data. The `updateContact()` function saves modifications by updating the object in the array.

### Delete

- **Single Delete:** Removes one contact by filtering it out using a unique identifier.
- **Delete All:** Clears the entire contacts array after user confirmation.

### Search

The `searchContacts()` function filters the contacts array in real-time as the user types in the search bar, matching against name or phone number.

---

## ✅ Input Validation Rules

| Field     | Rule                                                                                |
| :-------- | :---------------------------------------------------------------------------------- |
| **Name**  | Only letters and spaces allowed (2-50 characters).                                  |
| **Phone** | Must be a valid 11-digit Egyptian phone number starting with 010, 011, 012, or 015. |
| **Email** | Must match a standard email format (e.g., `user@domain.com`).                       |

---

## 🧠 Key Takeaways

This project showcases:

- Pure JavaScript CRUDS operations without frameworks.
- DOM manipulation and event handling.
- Working with browser storage (localStorage).
- Form validation using Regular Expressions.
- Responsive design with Bootstrap.
- Clean and organized code structure.

---

## 📄 License

This project is open-source and available for learning purposes. Feel free to use and modify it as needed.

---

## 👤 Author

**Tarek Hamdy Arafa**

[![GitHub](https://img.shields.io/badge/GitHub-tarekhamdy99-181717?style=flat&logo=github)](https://github.com/tarekhamdy99)

---

⭐ **If you find this project helpful, consider giving it a star on GitHub!**
