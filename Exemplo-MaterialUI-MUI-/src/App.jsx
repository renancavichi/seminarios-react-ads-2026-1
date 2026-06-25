import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  createTheme, ThemeProvider, CssBaseline, Container, Box, Typography, Button, 
  IconButton, TextField, Switch, Slider, Rating, Alert, CircularProgress, 
  LinearProgress, Badge, Accordion, AccordionSummary, AccordionDetails, 
  Paper, Stack, FormControlLabel, Fab, InputAdornment, Divider, Checkbox, Link, Avatar
} from '@mui/material';

import {
  ExpandMore, Favorite, Send, Add, LockOutlined, EmailOutlined, 
  Visibility, VisibilityOff, Google, GitHub, SettingsOutlined
} from '@mui/icons-material';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { 
      threshold: 0.45,
      rootMargin: "0px 0px -100px 0px" 
    });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <Box
      ref={domRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
        transition: 'opacity 0.7s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 10
      }}
    >
      {children}
    </Box>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [rating, setRating] = useState(4.5);
  const [showPassword, setShowPassword] = useState(false);

  const dynamicTheme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: { main: isDarkMode ? '#ffffff' : '#0f172a' },
      secondary: { main: '#3b82f6' },
      background: { 
        default: isDarkMode ? '#05070a' : '#f8fafc',
        paper: isDarkMode ? '#0d1117' : '#ffffff',
      },
      text: { 
        primary: isDarkMode ? '#f8fafc' : '#0f172a',
        secondary: isDarkMode ? '#94a3b8' : '#64748b' 
      },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }
        }
      }
    }
  }), [isDarkMode]);

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      <ScrollReveal>
        <Typography variant="h1" align="center" gutterBottom>Material UI</Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ maxWidth: 500 }}>
          Demonstração dos principais componentes e funcionalidades do MUI.
        </Typography>
        <Box sx={{ mt: 10 }}><CircularProgress color="secondary" size={20} /></Box>
      </ScrollReveal>

      {/* TYPOGRAPHY + BUTTON */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>SISTEMA DE AÇÕES</Typography>
        <Typography variant="h4" gutterBottom>Typography & Button</Typography>
        <Stack direction="row" spacing={3}>
          {/* Principais: Button (Contained/Outlined) e IconButton */}
          <Button variant="contained" color="secondary" size="large" sx={{ color: '#fff' }}>Botão Principal</Button>
          <Button variant="outlined" size="large" color="primary">Secundário</Button>
          <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}><SettingsOutlined /></IconButton>
        </Stack>
      </ScrollReveal>
      {/* FIM: TYPOGRAPHY + BUTTON */}

      {/* INÍCIO: TEXTFIELDS */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>ENTRADA DE DADOS</Typography>
        <Typography variant="h4" gutterBottom>TextField</Typography>
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 400 }}>
          {/* Principal: TextField com props de validação (error, helperText) */}
          <TextField fullWidth label="Nome do Usuário" variant="outlined" placeholder="username" />
          <TextField fullWidth label="Erro de Validação" error helperText="Este campo é obrigatório" variant="outlined" />
        </Stack>
      </ScrollReveal>
      {/* FIM: TEXTFIELDS */}

      {/* INÍCIO: CARDS */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>ESTRUTURA</Typography>
        <Typography variant="h4" gutterBottom>Card</Typography>
        {/* Paper (container de layout com sombra e bordas) */}
        <Paper sx={{ p: 4, width: '100%', maxWidth: 350, textAlign: 'left' }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold">Título do Card</Typography>
            <Typography variant="body2" color="text.secondary">Container para agrupar conteúdo.</Typography>
            <Button variant="text" color="secondary" sx={{ p: 0, justifyContent: 'flex-start' }}>Saiba Mais</Button>
          </Stack>
        </Paper>
      </ScrollReveal>
      {/* CARDS */}

      {/* FEEDBACK VISUAL */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>FEEDBACK VISUAL</Typography>
        <Typography variant="h4" gutterBottom>Progress & Alerts</Typography>
        <Stack spacing={4} sx={{ width: '100%', maxWidth: 450 }}>
          {/* Principais: Alert, LinearProgress, CircularProgress e Badge */}
          <Alert severity="success" variant="outlined" sx={{ borderRadius: 2 }}>Dados sincronizados.</Alert>
          <LinearProgress color="secondary" sx={{ height: 6, borderRadius: 3 }} />
          <Badge badgeContent={3} color="secondary"><EmailOutlined /></Badge>
        </Stack>
      </ScrollReveal>
      {/* FEEDBACK VISUAL */}

      {/* CONTROLES */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>CONTROLES</Typography>
        <Typography variant="h4" gutterBottom>Switch, Slider & Rating</Typography>
        <Stack spacing={5} sx={{ width: '100%', maxWidth: 350 }}>
          {/* Switch (controla o estado isDarkMode), Slider e Rating */}
          <FormControlLabel 
            control={<Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} color="secondary" />} 
            label={isDarkMode ? "Modo Noturno" : "Modo Claro"} 
          />
          <Slider defaultValue={70} color="secondary" />
          <Rating value={rating} onChange={(e, v) => setRating(v)} precision={0.5} />
        </Stack>
      </ScrollReveal>
      {/* CONTROLES */}

      {/* COMPOSIÇÃO */}
      <ScrollReveal>
        <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>COMPOSIÇÃO</Typography>
        <Typography variant="h4" gutterBottom>Accordion & FAB</Typography>
        {/* Accordion (ocultar/mostrar) e Fab (botão flutuante de ação) */}
        <Accordion sx={{ width: '100%', maxWidth: 450 }}>
          <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight="bold">Como funciona o MUI?</Typography></AccordionSummary>
          <AccordionDetails><Typography variant="body2">É uma coleção de blocos de construção.</Typography></AccordionDetails>
        </Accordion>
        <Fab color="secondary" variant="extended" sx={{ mt: 5, color: '#fff' }}><Add sx={{ mr: 1 }} /> Criar Novo</Fab>
      </ScrollReveal>
      {/* COMPOSIÇÃO */}

      {/* LOGIN */}
      <ScrollReveal>
        <Typography variant="h4" sx={{ mb: 6, fontWeight: 900 }}>Aplicação Prática</Typography>
        {/* Paper, TextField com InputAdornment, Button e Divider */}
        <Paper elevation={0} sx={{ maxWidth: 400, width: '100%', p: 5 }}>
          <Stack spacing={4}>
            <Avatar sx={{ mx: 'auto', bgcolor: 'secondary.main', mb: 2 }}><LockOutlined sx={{color: '#fff'}} /></Avatar>
            <TextField fullWidth label="E-mail" InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined /></InputAdornment> }} />
            <TextField fullWidth type={showPassword ? 'text' : 'password'} label="Senha" />
            <Button variant="contained" color="secondary" fullWidth size="large" sx={{ fontWeight: 'bold', color: '#fff' }}>Entrar</Button>
          </Stack>
        </Paper>
      </ScrollReveal>
      {/* LOGIN */}

    </ThemeProvider>
  );
}
