# 🚗 LamboCar - Car Selling Website

Welcome to **GoCar**, a modern, responsive, and user-friendly car selling platform built with the MERN Stack. This platform allows users to explore, buy, and manage car listings effortlessly with an intuitive interface and robust features.

---

## 🔗 Live Demo

👉 [Live Website link](https://lambo-car-frontend.vercel.app/)  
👉 [Server Live Link] https://lambocar.vercel.app/ (https://lambocar.vercel.app/api this is for checking api)
👉 [Server GitHub Repository](https://github.com/theabsparrow/Assignemnt-four-server.git)

---

## 📌 Project Features

- 🚗 Add, Edit, View Cars with Category, Price, and Rating
- 📄 Car Details with Booking Functionality
- 👤 User Dashboard to View Bookings
- 🛡️ Admin Panel to Manage, Users, and Cars
- 🌙 Dark Mode Support
- 📱 Fully Responsive for All Devices
- 📤 Image Upload
- 📧 Contact Form with EmailJS Integration
- 📦 PDF Invoice Generator after Booking

---

## 🛠️ Tech Stack

**used technology:**

- React.js
- Tailwind CSS
- React Router
- React Hook Form
- Redux
- EmailJS
- TanStack Table
- React hook form

---

### **Installation**

1. **Clone the Repository:**

**go to your terminal , access your demanded directory and command**

```bash
git clone https://github.com/theabsparrow/Assignment-four-client.git
```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
    Create a `.env` file in the root directory and add the following:

   ```env
   VITE_API_URL
   VITE_IMGBB_API
   VITE_SERVICE_ID
   VITE_TEMPLATE_ID
   VITE_PUBLIC_KEY
   ```

4. **Run the Server:**

```bash
npm run dev
```

5. **build the Server after completing:**
   ```bash
   npm run build
   ```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
