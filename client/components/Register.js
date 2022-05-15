import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

export function Register({onChange, onCheck, onSubmit}){

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6} >
                <TextField
                  autoComplete="given-name"
                  name="userid"
                  required
                  fullWidth
                  id="userid"
                  label="사용자ID"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이 름"
                  name="name"
                  autoComplete="family-name"
                  onChange={onChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password Confirm"
                  type="password"
                  id="password2"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="User Name"
                  // type="password"
                  id="name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="age"
                  label="User Age"
                  // type="password"
                  id="age"
                  onChange={onChange}
                />
              </Grid>
              <Grid>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">*질병이 있으시다면 선택해주세요</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox name="고혈압" onChange={onCheck}/>
                            }
                            label="고혈압"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox name="당뇨병" onChange={onCheck}/>
                            }
                            label="당뇨병"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox name="고지혈증" onChange={onCheck}/>
                            }
                            label="고지혈증"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox name="관절염" onChange={onCheck}/>
                            }
                            label="관절염"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox name="치매" onChange={onCheck} />
                            }
                            label="치매"
                        />
                    </FormGroup>
                    <FormHelperText>체크한 질병에 따라 AI서비스가 맞춤으로 진행됩니다</FormHelperText>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SIGNUP
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  로그인 화면으로 전환
                </Link>
              </Grid>
            </Grid>
          </Box>
         </Box>
      </Container>
    </ThemeProvider>
  );
}

