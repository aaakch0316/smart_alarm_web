import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PersonAddSVG } from "@/icons";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({modalObject, onSubmitAlarm, onChangeAlarm}) {

  return (
    <div>
      <Button 
        onClick={modalObject.handleOpenModal} 
        variant="contained"
				size="large"
				className="btn__icon"
        ><PersonAddSVG /> Add Alarm</Button>
      <Modal
        open={modalObject.openModal}
        onClose={modalObject.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Alarm
          </Typography>
          <CssBaseline />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula 
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} 
          onSubmit={onSubmitAlarm}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField
                  // autoComplete="given-name"
                  name="alerthour"
                  required
                  fullWidth
                  id="alerthour"
                  label="Alarm Hour"
                  autoFocus
                  onChange={onChangeAlarm}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="alertmin"
                  label="Alarm Min"
                  name="alertmin"
                  // autoComplete="family-name"
                  onChange={onChangeAlarm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="content"
                  label="content"
                  name="content"
                  // autoComplete="email"
                  onChange={onChangeAlarm}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SAVE
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button variant="body2" onClick={modalObject.handleCloseModal}>
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
