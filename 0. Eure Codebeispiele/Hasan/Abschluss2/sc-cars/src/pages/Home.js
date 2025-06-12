import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import IntroSplit from "../components/IntroSplit";
import UeberMich from "../components/UeberMich";
import Aufbereitung from "../components/Aufbereitung";
import Kontakt from "../components/Kontakt";
import Termin from "../components/Termin";
import { useLocation } from "react-router-dom";

export default function Home() {
  const navbarRef = useRef(null);
  const ueberMichRef = useRef(null);
  const aufbereitungRef = useRef(null);
  const kontaktRef = useRef(null);
  const terminRef = useRef(null);
  const introSplitRef = useRef(null);

  const location = useLocation();

  const [date, setDate] = useState(new Date());
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [ueberMichVisible, setUeberMichVisible] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  // IntersectionObserver nur für ueberMichRef
  useEffect(() => {
    if (!ueberMichRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === ueberMichRef.current) {
            setUeberMichVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ueberMichRef.current);

    return () => observer.disconnect();
  }, []);

  // Scroll to hash on mount or location change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // React-konformes Form-Handling
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Vielen Dank für Ihre Nachricht!");
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
      <Kontakt kontaktRef={kontaktRef} handleFormSubmit={handleFormSubmit} formStatus={formStatus} />
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
