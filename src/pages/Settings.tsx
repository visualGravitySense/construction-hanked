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
    alert('Настройки сохранены');
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
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Настройки системы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Конфигурация системы парсинга тендеров
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Настройки парсеров
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Интервал парсинга (минуты)"
                type="number"
                fullWidth
                value={settings.parserInterval}
                onChange={(e) => handleChange('parserInterval', e.target.value)}
                helperText="Как часто запускать парсеры"
              />
              <TextField
                label="Размер очереди"
                type="number"
                fullWidth
                value={settings.queueSize}
                onChange={(e) => handleChange('queueSize', e.target.value)}
                helperText="Максимальное количество элементов в очереди"
              />
              <TextField
                label="TTL кэша (секунды)"
                type="number"
                fullWidth
                value={settings.cacheTTL}
                onChange={(e) => handleChange('cacheTTL', e.target.value)}
                helperText="Время жизни данных в кэше"
              />
              <TextField
                label="Максимум попыток"
                type="number"
                fullWidth
                value={settings.maxRetries}
                onChange={(e) => handleChange('maxRetries', e.target.value)}
                helperText="Количество повторных попыток при ошибке"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.info.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Общие настройки
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
                label="Автоматическое сопоставление с профилями"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={(e) => handleChange('enableNotifications', e.target.checked)}
                  />
                }
                label="Включить уведомления"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.success.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Настройки базы данных
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
              background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.warning.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Настройки Redis
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
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Сохранить все настройки
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
