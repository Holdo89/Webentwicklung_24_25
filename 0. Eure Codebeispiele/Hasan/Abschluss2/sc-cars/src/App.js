// src/App.js
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import IntroSplit from "./components/IntroSplit";
import UeberMich from "./components/UeberMich";
import Aufbereitung from "./components/Aufbereitung";
import Kontakt from "./components/Kontakt";
import Termin from "./components/Termin";

export default function App() {
  const navbarRef = useRef(null);
  const ueberMichRef = useRef(null);
  const aufbereitungRef = useRef(null);
  const kontaktRef = useRef(null);
  const terminRef = useRef(null);
  const introSplitRef = useRef(null);

  const [date, setDate] = useState(new Date());
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [ueberMichVisible, setUeberMichVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === introSplitRef.current) {
            navbarRef.current.classList.toggle("visible", !entry.isIntersecting);
          }
          if (entry.target === ueberMichRef.current) {
            setUeberMichVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    [ueberMichRef.current, aufbereitungRef.current, kontaktRef.current, terminRef.current, introSplitRef.current]
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const status = document.getElementById("formStatus");
    status.textContent = "Vielen Dank für Ihre Nachricht!";
    status.style.color = "green";
    e.target.reset();
  };

  const handleTerminBestätigen = () => {
    setConfirmationMessage(`Termin am ${date.toLocaleDateString("de-DE")} wurde bestätigt.`);
  };

  return (
    <>
      <Navbar navbarRef={navbarRef} />
      <IntroSplit introSplitRef={introSplitRef} />
      <UeberMich ueberMichRef={ueberMichRef} ueberMichVisible={ueberMichVisible} />
      <Aufbereitung aufbereitungRef={aufbereitungRef} />
      <Kontakt kontaktRef={kontaktRef} handleFormSubmit={handleFormSubmit} />
      <Termin
        terminRef={terminRef}
        date={date}
        setDate={setDate}
        handleTerminBestätigen={handleTerminBestätigen}
        confirmationMessage={confirmationMessage}
      />
    </>
  );
}
