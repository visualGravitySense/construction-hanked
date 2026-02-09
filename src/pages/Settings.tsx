import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Switch,
  FormControlLabel,
  alpha,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function Settings() {
  const theme = useTheme();
  const [settings, setSettings] = React.useState({
    parserInterval: '30',
    queueSize: '1000',
    cacheTTL: '3600',
    maxRetries: '3',
    enableAutoMatching: true,
    enableNotifications: true,
    databaseHost: 'localhost',
    databasePort: '5432',
    databaseName: 'tender_parser',
    redisHost: 'localhost',
    redisPort: '6379',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    alert('Seaded salvestatud');
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a1a2e',
          }}
        >
          Süsteemi seaded
        </Typography>
        <Typography variant="body1" sx={{ color: '#5f6368' }}>
          Hangete parsija süsteemi konfiguratsioon
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a2e' }}>
              Parsijate seaded
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Parsimise intervall (minutid)"
                type="number"
                fullWidth
                value={settings.parserInterval}
                onChange={(e) => handleChange('parserInterval', e.target.value)}
                helperText="Kui sageli parsijaid käivitada"
              />
              <TextField
                label="Järjekorra suurus"
                type="number"
                fullWidth
                value={settings.queueSize}
                onChange={(e) => handleChange('queueSize', e.target.value)}
                helperText="Maksimaalne elementide arv järjekorras"
              />
              <TextField
                label="Vahemälu TTL (sekundid)"
                type="number"
                fullWidth
                value={settings.cacheTTL}
                onChange={(e) => handleChange('cacheTTL', e.target.value)}
                helperText="Andmete kehtivusaeg vahemälus"
              />
              <TextField
                label="Maksimaalselt katseid"
                type="number"
                fullWidth
                value={settings.maxRetries}
                onChange={(e) => handleChange('maxRetries', e.target.value)}
                helperText="Uuesti proovimiste arv vea korral"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a2e' }}>
              Üldised seaded
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableAutoMatching}
                    onChange={(e) => handleChange('enableAutoMatching', e.target.checked)}
                  />
                }
                label="Automaatne vastavusse viimine profiilidega"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  />
                }
                label="Luba teavitused"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a2e' }}>
              Andmebaasi seaded
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Host"
                fullWidth
                value={settings.databaseHost}
                onChange={(e) => handleChange('databaseHost', e.target.value)}
              />
              <TextField
                label="Port"
                type="number"
                fullWidth
                value={settings.databasePort}
                onChange={(e) => handleChange('databasePort', e.target.value)}
              />
              <TextField
                label="Database Name"
                fullWidth
                value={settings.databaseName}
                onChange={(e) => handleChange('databaseName', e.target.value)}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a2e' }}>
              Redisi seaded
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Host"
                fullWidth
                value={settings.redisHost}
                onChange={(e) => handleChange('redisHost', e.target.value)}
              />
              <TextField
                label="Port"
                type="number"
                fullWidth
                value={settings.redisPort}
                onChange={(e) => handleChange('redisPort', e.target.value)}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                transition: 'all 0.2s ease',
              }}
            >
              Salvesta kõik seaded
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
