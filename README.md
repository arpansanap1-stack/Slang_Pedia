# 💬 Slang_Pedia

> **Decipher the Internet, One Word at a Time.**

Slang_Pedia is a modern, community-powered slang dictionary designed to help people understand **internet slang, Gen-Z terminology, texting acronyms, gaming expressions, and social-media language**.

Instead of searching through random websites to figure out what a term means, Slang_Pedia provides a simple place to **discover, search, decode, and contribute slang terms**.

---

## ✨ Features

### 🔎 Smart Slang Search

Search for slang terms instantly using the built-in search interface.

Examples:

* `ngl`
* `fr`
* `cooked`
* `yap`
* `brb`
* `sus`

Search works across both the slang term and its definition.

---

### 🧠 Slang Decoder

Don't know what a slang term means?

Use the **Slang Decoder** to quickly understand internet language without needing to know the exact terminology beforehand.

---

### 🗂️ Category Filtering

Browse slang based on different categories:

* 💬 **Chat**
* 🧬 **Gen-Z**
* 🎮 **Gaming**
* 🎵 **TikTok**
* 🌐 **All**

This makes it easier to discover slang based on where it is commonly used.

---

### ➕ Community Contributions

Users can add new slang terms to the dictionary through the built-in **Add Term** interface.

This allows the dictionary to grow with internet culture instead of relying on a static list of words.

---

### 🃏 Interactive Slang Cards

Every term is displayed using a dedicated card containing its relevant information, making the dictionary easy to browse and visually engaging.

---

### ⚡ Responsive Interface

The application is designed to work across different screen sizes, from desktop screens to mobile devices.

---

## 🛠️ Tech Stack

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| **Next.js 15**   | Full-stack React framework    |
| **React 19**     | User interface                |
| **Tailwind CSS** | Styling and responsive design |
| **MongoDB**      | Persistent slang data storage |
| **Mongoose**     | MongoDB object modeling       |
| **Lucide React** | UI icons                      |
| **JavaScript**   | Application logic             |

The repository currently uses Next.js, React, Mongoose, Lucide React, Tailwind CSS, PostCSS, and Autoprefixer.

---

## 🏗️ Project Architecture

```text
Slang_Pedia/
│
├── app/
│   ├── api/
│   │   └── terms/
│   │       └── ...
│   │
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.js
│   └── page.js
│
├── componenets/
│   ├── AddTermModal.jsx
│   ├── Header.jsx
│   ├── SlangCard.jsx
│   └── SlangDecoder.jsx
│
├── lib/
│   ├── fallbackTerms.js
│   └── mongodb.js
│
├── models/
│   └── ...
│
├── scripts/
│   └── seed.mjs
│
├── package.json
├── package-lock.json
├── next.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
└── README.md
```

The current repository is organized around the Next.js `app` directory, reusable UI components, database utilities, models, and a database seeding script.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/arpansanap1-stack/Slang_Pedia.git
```

Move into the project:

```bash
cd Slang_Pedia
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the value with your MongoDB connection string.

> ⚠️ Never commit `.env.local` or your database credentials to GitHub.

---

### 4. Seed the Database

If the project is configured to use the provided seed script:

```bash
npm run seed
```

The repository includes a dedicated `scripts/seed.mjs` script for populating the application data.

---

### 5. Start the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Starts the application in production mode.

### Lint

```bash
npm run lint
```

Runs the project's linting command.

### Database Seeding

```bash
npm run seed
```

Seeds the database with initial slang data.

These scripts are defined in the project's `package.json`.

---

## 🔌 API

Slang_Pedia uses Next.js API routes to communicate between the frontend and the slang database.

The main interface retrieves terms through:

```text
GET /api/terms
```

Category filtering can be performed using:

```text
GET /api/terms?tag=gen-z
```

Other supported categories include:

```text
chat
gen-z
gaming
tiktok
```

The frontend automatically requests the appropriate endpoint when the user changes the selected category.

---

## 🔄 How It Works

```text
                ┌──────────────────┐
                │      User        │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │   Slang_Pedia UI │
                └────────┬─────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        Search / Filter        Slang Decoder
              │
              ▼
        ┌──────────────────┐
        │ Next.js API      │
        │ /api/terms       │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │     MongoDB      │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │ Slang Term Data  │
        └──────────────────┘
```

---

## 🎨 UI & Design

Slang_Pedia uses a playful visual language inspired by modern internet culture.

The interface includes:

* Bold typography
* Rounded UI elements
* High-contrast cards
* Emoji-based visual cues
* Category pills
* Interactive buttons
* Responsive layouts
* Neo-brutalist inspired styling

The homepage specifically presents the product as a community dictionary for **texting acronyms, Gen-Z lingo, and chat slang**.

---

## 🧩 Core Components

### `Header`

Handles the main navigation and application-level interactions.

### `SlangCard`

Displays individual slang entries in an easy-to-scan format.

### `SlangDecoder`

Provides the dedicated slang-decoding experience.

### `AddTermModal`

Allows users to contribute new slang terms to the dictionary.

These reusable components are located inside the project's `componenets` directory.

---

## 🗄️ Database

Slang_Pedia uses **MongoDB** for persistent storage and **Mongoose** for database interaction.

Database-related functionality is organized inside:

```text
lib/
├── mongodb.js
└── fallbackTerms.js
```

The application also includes fallback slang data, allowing the project to maintain a usable dictionary even when database-backed data is unavailable.

---

## 📈 Future Improvements

Slang_Pedia can be expanded into a much larger platform.

Potential improvements include:

* 🤖 AI-powered slang explanations
* 🔊 Pronunciation/audio support
* 🌍 Regional slang
* 🗣️ Example conversations
* 👍 Community voting
* ⭐ Favorite terms
* 📊 Trending slang dashboard
* 🔥 Daily trending slang
* 👤 User profiles
* 🏆 Contributor reputation system
* 📝 Edit and moderation workflow
* 🌐 Multi-language explanations
* 📱 Progressive Web App support
* 🔐 Authentication
* 🤖 AI-powered context detection

---

## 🤝 Contributing

Contributions are welcome!

### 1. Fork the repository

```bash
git fork https://github.com/arpansanap1-stack/Slang_Pedia.git
```

### 2. Create a branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement your feature or fix.

### 4. Commit your changes

```bash
git commit -m "feat: add your feature"
```

### 5. Push your branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Describe what you changed and why.

---

## 🐛 Bug Reports & Feature Requests

If you discover a bug or have an idea for improving Slang_Pedia, open an issue in the repository.

Useful information to include:

* What happened?
* What did you expect?
* Steps to reproduce
* Screenshots if applicable
* Browser/device information

---

## 🔐 Security

Never expose sensitive information such as:

* MongoDB credentials
* API keys
* Authentication secrets
* `.env.local`
* Private tokens

Keep environment-specific configuration outside the repository.

---

## 📄 License

This project does not currently specify a license in the repository.

If you intend to make Slang_Pedia open source, consider adding an appropriate license such as the MIT License.

---

## 👨‍💻 Author

**Arpan Sanap**

Computer Science & Design Student

GitHub:
https://github.com/arpansanap1-stack

---

## ⭐ Support the Project

If you find **Slang_Pedia** useful or interesting:

⭐ Star the repository
🍴 Fork the project
🐛 Report bugs
💡 Suggest features
🤝 Contribute improvements

---

<div align="center">

### 💬 Slang_Pedia

**Understand the internet. One slang at a time.**

Made with ❤️ and a little bit of internet chaos.

</div>
