import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import ActionAreaCard from './ActionAreaCard';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AiSelectorModal({
    modalAiObject, 
    dataAi,
    onChangeModelInfo,
    onTargetModelInfo,
    aiModelInfo,
    alarm
    // onSubmitAlarm, 
    // onChangeAlarm
}) {

  return (
    <div>
        <Button 
            onClick={modalAiObject.handleOpenAiModal} 
            variant="contained"
				size="midium"
				className="btn__icon"
        > 가족 선택</Button>
      <Modal
        open={modalAiObject.openAiModal}
        onClose={modalAiObject.handleSimpleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            가족 선택
          </Typography>
          <CssBaseline />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            원하시는 가족을 선택해주세요
            {/* {JSON.stringify(dataAi.modelList[0])} */}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} 
        //   onSubmit={onSubmitAlarm}
          >
            {/* <ActionAreaCard /> */}
            <Grid container spacing={2}>
              {dataAi.modelList.map((card) =>
                <ActionAreaCard card={card} onTargetModelInfo={onTargetModelInfo} />
              )}

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="text"
                  label="알림 내용을 적어주세요"
                  name="text"
                  // autoComplete="email"
                  onChange={onChangeModelInfo}
                />
              </Grid>
            </Grid>
            <div>모델이름 : {aiModelInfo.modelName}</div>
            <div>알림내용 : {aiModelInfo.text}</div>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>modalAiObject.handleCloseAiModal(alarm, e)}
            >
              SAVE
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button variant="body2" onClick={modalAiObject.handleSimpleClose}>
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
