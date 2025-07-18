import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
  Box
} from '@mui/material';
import './ContactPopup.css';

/**
 * Popup-Dialog zur Anzeige der Kontaktdaten.
 *
 * @param {boolean} open     Öffnungszustand des Dialogs
 * @param {Function} onClose Callback zum Schließen des Dialogs
 */
export default function ContactPopup({ open, onClose }) {
  const CONTACTS = [
    {
      name: 'Tagaluba',
      items: [
        { label: 'Telefon', value: '+43681 102 66 070', isLink: false },
        { label: 'E-Mail',  value: 'mail@farmerland.at', isLink: true, href: 'mailto:mail@farmerland.at' }
      ]
    }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Veranstalter kontaktieren</DialogTitle>
      <DialogContent dividers>
        {CONTACTS.map(org => (
          <Box key={org.name} className="contact-section">
            <Typography className="contact-company">{org.name}</Typography>
            {org.items.map(item => (
              <Typography key={item.label} className="contact-detail">
                <strong>{item.label}:</strong>{' '}
                {item.isLink
                  ? <Link href={item.href}>{item.value}</Link>
                  : item.value}
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
  open:   PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
