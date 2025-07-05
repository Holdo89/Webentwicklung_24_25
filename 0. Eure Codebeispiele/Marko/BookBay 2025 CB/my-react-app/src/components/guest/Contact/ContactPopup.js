import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
  Box
} from "@mui/material";
import "./ContactPopup.css";

const CONTACTS = [
  {
    name: "Tagaluba",
    items: [
      { label: "Telefon", value: "+43681 102 66 070", isLink: false },
      { label: "E-Mail", value: "mail@farmerland.at", isLink: true, href: "mailto:mail@farmerland.at" },
    ],
  },
  {
    name: "Feedcube",
    items: [
      { label: "Allgemeine Anfragen", value: "office@feedcube.net", isLink: true, href: "mailto:office@feedcube.net" },
      { label: "Technische Fragen", value: "support@feedcube.net", isLink: true, href: "mailto:support@feedcube.net" },
    ],
  },
];

export default function ContactPopup({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Veranstalter kontaktieren</DialogTitle>
      <DialogContent dividers>
        {CONTACTS.map((org) => (
          <Box key={org.name} className="contact-section">
            <Typography className="contact-company">{org.name}</Typography>
            {org.items.map((it) => (
              <Typography key={it.label} className="contact-detail">
                <strong>{it.label}:</strong>{" "}
                {it.isLink ? <Link href={it.href}>{it.value}</Link> : it.value}
              </Typography>
            ))}
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
}

ContactPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
