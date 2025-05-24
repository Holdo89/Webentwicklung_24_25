import React from "react";
import '../../styles/Landing.css';
import Text from '../../components/LandingPage/Text';
import Picture from '../../components/LandingPage/Picture';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <Text />
      <Picture />
    </div>
  );
}
