# 🎓 Edu Fun – Smart Learning Management System (LMS)

**Edu Fun** is a modern and secure **Learning Management System (LMS)** designed to make academic content delivery seamless for students and educators.
Built using **React JS** with a **Lovable Cloud integrated backend**, Edu Fun provides an efficient way to upload, organize, and access educational resources such as **PDF study materials** and **YouTube video lectures**.

---

## 🚀 Tech Stack

| Layer                        | Technology                                    |
| :--------------------------- | :-------------------------------------------- |
| **Frontend**                 | React JS, HTML5, CSS3, JavaScript (ES6+)      |
| **Backend**                  | Lovable Cloud Integrated Backend (Node.js)    |
| **Authentication & Storage** | Lovable Cloud Auth & File Storage             |
| **UI Design**                | Responsive Academic Theme (Light + Dark Mode) |
| **Deployment**               | Lovable Cloud (One-Click Deployment)          |

---

## 🎯 Project Overview

Edu Fun offers a clean, user-friendly, and fully responsive LMS platform where:

* 👨‍🏫 **Admins** can upload **subject PDFs** and **YouTube links** directly via the dashboard.
* 🎓 **Students** can view, download, and watch learning content with ease.
* 🔒 **Authentication** ensures secure, role-based access to features.
* 💬 **Contact Us** lets users submit feedback or queries.
* 🌗 **Light & Dark Mode** enhances accessibility and user experience.

---

## 🧩 Core Features

### 📘 Subjects Section

* Organized subject-wise layout with downloadable PDF files.
* Each subject card displays a list of uploaded materials.
* Built-in **search** and **filter** functionalities.
* Preview and download options for study materials.

### 🎥 YouTube Section

* Subject-specific embedded YouTube videos.
* Admin can add, edit, or delete video links.
* Smooth, responsive video player cards.

### 🔐 Authentication

* Email-Password-based authentication using Lovable Cloud Auth.
* Admin role for managing uploads and content.
* Secure session handling and protected routes.

### 🧑‍💼 Admin Dashboard

* Upload and manage PDFs and YouTube links.
* View analytics (downloads, uploads, and usage stats).
* Clean interface with quick access to all modules.

### 💬 Contact Us Form

* Capture user feedback and queries.
* Data securely stored in Lovable Cloud Database.
* Confirmation toast messages on submission.

### 🌗 UI Design & Accessibility

* Academic, student-friendly look and feel.
* Supports both **light** and **dark** themes.
* Fully responsive on desktop, tablet, and mobile devices.
* Smooth animations and modern design system.

---

## ⚙️ Security & Performance

* Authentication-based access control (admin vs. student).
* Secure upload handling and validation.
* HTTPS-ready and API-secured communication.
* Optimized loading and caching for faster performance.

---

## 🏗️ Folder Structure

```
EduFun/
│
├── public/
│   ├── index.html
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Subjects/
│   │   ├── YouTube/
│   │   ├── Contact/
│   │   └── Admin/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

## 💻 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/edu-fun.git
cd edu-fun
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_LOVABLE_PROJECT_ID=<your-lovable-project-id>
REACT_APP_LOVABLE_API_KEY=<your-api-key>
REACT_APP_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_AUTH_DOMAIN=<your-auth-domain>
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

Your app will be running at **[http://localhost:5173/](http://localhost:5173/)**

### 5️⃣ Build for Production

```bash
npm run build
```

### 6️⃣ Deploy to Lovable Cloud

Use the one-click deployment option from the Lovable Cloud dashboard or CLI.

---

## 🌐 Deployment Link

🔗 **Live Website:** : Providing Soon 
📦 **GitHub Repo:** : Just Go to the Code Section and clone the repository

---

## 📊 Future Enhancements

* Add user activity analytics dashboard.
* Implement role-based content recommendations.
* Integrate chatbot support for quick help.
* Enable multilingual content support.

---

## 🧠 Learnings & Takeaways

While building Edu Fun, I deepened my understanding of:

* Scalable React architecture for LMS systems.
* Cloud-based authentication and storage with Lovable Cloud.
* Secure user management and protected routes.
* Designing clean, responsive academic UIs.

---

## 👨‍💻 Author

**Singidi Sai Naga Sudheer**
🎓 B.Tech CSE SVCET 26 | Aspiring MERN Stack Developer | Python | Freelancer  
📧 [sudheergaming93@outlook.com]
🔗 [https://www.linkedin.com/in/singidi-sainagasudheer-7751b3370?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bnfa74QzmSDaRuHxs0XZitQ%3D%3D]

---

## 🏁 License

This project is licensed under the **MIT License** – feel free to use, modify, and distribute with attribution.
