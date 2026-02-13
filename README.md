# 💼 InsiderJobs - Modern Job Portal Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

**InsiderJobs** is a comprehensive, full-stack job portal application designed to streamline the hiring process for both employers and job seekers.
Built with the **MERN** stack and enhanced with modern tools like **Clerk** for authentication and **Sentry** for error monitoring,
it offers a premium, scalable, and secure experience.

------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Live Links ##

| Feature | Link |
| :--- | :--- |
| **🌐 Live Demo (Frontend)** | [Visit InsiderJobs](https://insiderjobsfullstack.vercel.app) 
| **⚙️ API Server (Backend)** | [API Endpoint](https://insiderjobs-full-stack-server.vercel.app) 

----------------------------------------------------------------------------------------------------------------------------------------

## Key Features

### For Job Seekers
- **Smart Job Search**: Filter jobs based on location, category, and salary.
- **Seamless Applications**: One-click application process with resume upload support.
- **Application Tracking**: Real-time status updates on submitted applications.
- **Rich User Profile**: Personalized dashboard to manage applications and profile details.

### For Employers (Recruiters)
- **Comprehensive Dashboard**: Manage job postings and track applicant statistics.
- **Powerful Job Management**: Post, edit, and delete job listings with a rich text editor (Quill).
- **Applicant Review System**: View detailed applicant profiles and manage application statuses (Pending/Accepted/Rejected).
- **Company Branding**: Customizable company profiles with logo uploads via Cloudinary.

----------------------------------------------------------------------------------------------------------------------------------------

## Technical Prowess

This project demonstrates expertise in building production-ready applications with a focus on:

- **Authentication & Security**: Integrated **Clerk SDK** for robust user management and secure session handling.
- **Real-time Synchronization**: Implemented **Clerk Webhooks** using **Svix** to keep the local database in sync with authentication events.
- **Cloud Infrastructure**: Scalable image and file hosting using **Cloudinary**.
- **Observability**: Integrated **Sentry** for real-time error tracking and performance profiling.
- **State Management**: Efficient use of **React Context API** for global state management.
- **Responsive Design**: Mobile-first approach using **Tailwind CSS v4** for a sleek, modern UI.

-----------------------------------------------------------------------------------------------------------------------------------------

## 💻 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Axios, React Router, React Toastify |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | Clerk (Auth & Identity) |
| **Storage** | Cloudinary (Image Hosting) |
| **Monitoring** | Sentry (Error Tracking) |
| **Webhooks** | Svix (Clerk Webhook verification) |

----------------------------------------------------------------------------------------------------------------------------------------

## Project Structure

```text
Insiderjobs/
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # State management (Context API)
│   │   ├── pages/         # Page components (Home, Dashboard, etc.)
│   │   └── assets/        # Static assets
├── server/                # Node.js Backend (Express)
│   ├── config/            # DB, Cloudinary, Env configurations
│   ├── controllers/       # Business logic for routes
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Entry point
```

----------------------------------------------------------------------------------------------------------------------------------------

## Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas Account
- Clerk Account
- Cloudinary Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Insiderjobs.git
   cd Insiderjobs
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file and add your credentials
   npm run dev
   ```
   *Required Environment Variables (Server):*
   - `MONGO_URI`
   - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   # Create a .env file and add your credentials
   npm run dev
   ```
   *Required Environment Variables (Client):*
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_BACKEND_URL`

----------------------------------------------------------------------------------------------------------------------------------------

## 📈 Future Enhancements
- [ ] AI-powered job recommendations based on user skills.
- [ ] Real-time chat functionality between recruiters and applicants.
- [ ] Multi-language support (i18n).
- [ ] Advanced analytics dashboard for recruiters.

----------------------------------------------------------------------------------------------------------------------------------------

## 👤 Author
**Devesh Tripathi**
- GitHub: [@ideveshtripathii](https://github.com/ideveshtripathii/Insiderjobs)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/idevesh-tripathi)

----------------------------------------------------------------------------------------------------------------------------------------
*Show your support by ⭐ starring this repository!*
