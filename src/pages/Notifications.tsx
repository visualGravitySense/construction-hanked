import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WebhookIcon from '@mui/icons-material/Webhook';
import SaveIcon from '@mui/icons-material/Save';

export default function Notifications() {
  const theme = useTheme();
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [webhookEnabled, setWebhookEnabled] = React.useState(false);
  const [emailSettings, setEmailSettings] = React.useState({
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'notifications@example.com',
    smtpPassword: '********',
    fromEmail: 'notifications@example.com',
  });
  const [webhookUrl, setWebhookUrl] = React.useState('');

  const notificationHistory = [
    {
      id: 1,
      type: 'email',
      recipient: 'it@example.com',
      subject: 'Новое совпадение: Тендер #1001',
      status: 'sent',
      timestamp: '2024-01-15 10:30:00',
    },
    {
      id: 2,
      type: 'webhook',
      recipient: 'https://api.example.com/webhook',
      subject: 'Тендер #1002',
      status: 'sent',
      timestamp: '2024-01-15 10:25:00',
    },
    {
      id: 3,
      type: 'email',
      recipient: 'consulting@example.com',
      subject: 'Новое совпадение: Тендер #1003',
      status: 'failed',
      timestamp: '2024-01-15 10:20:00',
    },
  ];

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
          Уведомления
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Настройка системы уведомлений
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                  borderRadius: 2,
                  p: 1,
                  mr: 1,
                  color: 'white',
                }}
              >
                <EmailIcon sx={{ fontSize: 30 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Email-рассылка</Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={emailEnabled}
                  onChange={(e) => setEmailEnabled(e.target.checked)}
                />
              }
              label="Включить email-уведомления"
              sx={{ mb: 3 }}
            />

            {emailEnabled && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="SMTP Host"
                  fullWidth
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                />
                <TextField
                  label="SMTP Port"
                  fullWidth
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                />
                <TextField
                  label="SMTP User"
                  fullWidth
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                />
                <TextField
                  label="SMTP Password"
                  fullWidth
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                />
                <TextField
                  label="From Email"
                  fullWidth
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                />
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => alert('Настройки сохранены')}
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
                  Сохранить настройки
                </Button>
              </Box>
            )}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.secondary?.main || theme.palette.info.main} 100%)`,
                  borderRadius: 2,
                  p: 1,
                  mr: 1,
                  color: 'white',
                }}
              >
                <WebhookIcon sx={{ fontSize: 30 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Webhooks</Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={webhookEnabled}
                  onChange={(e) => setWebhookEnabled(e.target.checked)}
                />
              }
              label="Включить webhooks"
              sx={{ mb: 3 }}
            />

            {webhookEnabled && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Webhook URL"
                  fullWidth
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.example.com/webhook"
                  helperText="URL для отправки уведомлений о совпадениях"
                />
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => alert('Настройки сохранены')}
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
                  Сохранить настройки
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              История уведомлений
            </Typography>
            <List>
              {notificationHistory.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1">
                            {notification.type === 'email' ? 'Email' : 'Webhook'}
                          </Typography>
                          <Chip
                            label={notification.status === 'sent' ? 'Отправлено' : 'Ошибка'}
                            color={notification.status === 'sent' ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {notification.recipient}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {notification.subject}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < notificationHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
