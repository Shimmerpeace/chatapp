"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import AlertBox from "@/components/ui/AlertBox";
import TweetForm from "@/components/tweets/TweetForm";
import TweetList from "@/components/tweets/TweetList";

export default function HomePage() {
  // --- USER STATE with _id ---
  // user will look like { name, email, _id }
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    error: false,
  });
  const [newTweet, setNewTweet] = useState(null);

  // --- LOG IN: Save full user object (with _id) in state ---
  async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user); // includes name, email, _id
      setModalOpen(false);
      setAlert({ show: true, message: "Login Successful!", error: false });
    } else {
      setAlert({ show: true, message: data.error, error: true });
    }
  }

  // --- REGISTER: Save full user object (with _id) in state ---
  async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user); // includes name, email, _id
      setModalOpen(false);
      setAlert({
        show: true,
        message: "Registration Successful!",
        error: false,
      });
    } else {
      setAlert({ show: true, message: data.error, error: true });
    }
  }

  function handleLogout() {
    setUser(null);
    setNewTweet(null);
    setAlert({ show: true, message: "You logged out.", error: false });
  }

  // --- When tweeting, pass full user object (with _id) as author ---
  return (
    <div className="min-h-screen">
      <Header
        user={user}
        onLoginClick={() => setModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="pt-[120px] px-[100px] pb-20 min-h-screen max-w-3xl mx-auto relative">
        {user ? (
          <>
            <TweetForm user={user} onPost={setNewTweet} />
            <TweetList newTweet={newTweet} />
          </>
        ) : (
          <section className="text-white flex flex-col items-start gap-4">
  <h1 className="text-4xl font-extrabold  text-green-700">
              Express your thoughts!
            </h1>
            <p className="text-xl mt-3  text-green-700">Be part of our community today and connect with others.</p>
            <button
              className="mt-6 px-6 py-3 bg-white text-green-700 font-bold rounded-full text-lg hover:bg-green-200 transition"
              onClick={() => {
                setModalOpen(true);
                setIsRegister(true);
              }}
            >
              Register Now
            </button>
          </section>
        )}
      </main>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        {isRegister ? (
          <RegisterForm
            onSubmit={handleRegister}
            onSwitch={() => setIsRegister(false)}
          />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            onSwitch={() => setIsRegister(true)}
          />
        )}
      </Modal>
      <AlertBox
        show={alert.show}
        message={alert.message}
        error={alert.error}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
}
