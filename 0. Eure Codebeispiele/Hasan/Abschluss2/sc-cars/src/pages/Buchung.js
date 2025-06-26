import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "../styles/Buchung.css";

export default function Buchung() {
  const { datum } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [angebot, setAngebot] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [zeiten, setZeiten] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/buchung/${datum}`);
    }
  }, [user, navigate, datum]);

  const angebote = ["Innenreinigung","Außenreinigung","Innen- und Außenreinigung","Politur","Kundenberatung","Tiefenreinigung-Sitze","Felgenreparatur","Sonstiges"];

  useEffect(() => {
    if (!angebot) return;
    let end = angebot.includes("Politur") ? "14:00" : angebot.includes("Innen- und Außenreinigung") ? "15:30" : "17:00";
    let zeiten = [];
    let [h,m]=["09:00","09:00"].map((t,i)=>t.split(":").map(Number)[i]);
    // simplified time slots
    for(let hh=9; hh<18; hh++){
      zeiten.push(`${hh.toString().padStart(2,"0")}:00`);
      zeiten.push(`${hh.toString().padStart(2,"0")}:30`);
    }
    setZeiten(zeiten);
  }, [angebot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!angebot||!uhrzeit){ setError("Bitte wählen"); return;}
    const res = await fetch("http://localhost:3001/buchung", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ datum: new Date(datum).toISOString().split("T")[0], angebot, uhrzeit, benutzer_id: user.id })
    });
    const d = await res.json();
    if (!res.ok) { setError(d.error||"Fehler"); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="buchung-thanks">Danke, Termin gebucht!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="buchung-container">
        <div className="buchung-card">
          <h2 className="buchung-title">Buchung am {new Date(datum).toLocaleDateString()}</h2>
          <form onSubmit={handleSubmit} className="buchung-form">
            <label>
              Leistung
              <select value={angebot} onChange={(e)=>setAngebot(e.target.value)} required>
                <option value="">Bitte wählen</option>
                {angebote.map((a,i)=><option key={i}>{a}</option>)}
              </select>
            </label>
            {angebot && (
              <label>
                Uhrzeit
                <select value={uhrzeit} onChange={(e)=>setUhrzeit(e.target.value)} required>
                  <option value="">Bitte wählen</option>
                  {zeiten.map((z,i)=><option key={i}>{z}</option>)}
                </select>
              </label>
            )}
            {error && <div className="error-msg">{error}</div>}
            <button type="submit" className="submit-btn">Buchen</button>
          </form>
        </div>
      </div>
    </>
  );
}
