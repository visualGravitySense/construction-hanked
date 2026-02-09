import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  alpha,
  useTheme,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function Monitoring() {
  const theme = useTheme();
  const systemMetrics = {
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 78,
  };

  const parserMetrics = [
    {
      name: 'Riigihangete Portal',
      status: 'active',
      lastRun: '2 min tagasi',
      successRate: 98,
      itemsProcessed: 1234,
      errors: 2,
    },
    {
      name: 'E-procurement Portal',
      status: 'active',
      lastRun: '5 min tagasi',
      successRate: 95,
      itemsProcessed: 890,
      errors: 5,
    },
    {
      name: 'Muud allikad',
      status: 'warning',
      lastRun: '15 min tagasi',
      successRate: 88,
      itemsProcessed: 234,
      errors: 12,
    },
  ];

  const recentErrors = [
    {
      id: 1,
      timestamp: '2024-01-15 10:45:00',
      source: 'Parser 1 - Riigihangete',
      message: 'Ühenduse ajalõpp allikaga',
      severity: 'warning',
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:30:00',
      source: 'Processor',
      message: 'Andmete deduplikatsiooni viga',
      severity: 'error',
    },
    {
      id: 3,
      timestamp: '2024-01-15 10:15:00',
      source: 'Notifier',
      message: 'E-kirja saatmine aadressile it@example.com ebaõnnestus',
      severity: 'error',
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
          Süsteemi seire
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Süsteemi olek, mõõdikud ja logid
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
            }}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                CPU Usage
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{systemMetrics.cpu}%</Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.cpu}
                sx={{ 
                  mt: 2, 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                    borderRadius: 5,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: `1px solid ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 16px ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.2)}`,
              },
            }}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                Memory Usage
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{systemMetrics.memory}%</Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.memory}
                sx={{ 
                  mt: 2, 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${theme.palette.secondary?.main || theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
                    borderRadius: 5,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 16px ${alpha(theme.palette.success.main, 0.2)}`,
              },
            }}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                Disk Usage
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{systemMetrics.disk}%</Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.disk}
                sx={{ 
                  mt: 2, 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    borderRadius: 5,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 16px ${alpha(theme.palette.warning.main, 0.2)}`,
              },
            }}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
                Network Usage
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{systemMetrics.network}%</Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.network}
                sx={{ 
                  mt: 2, 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                    borderRadius: 5,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parsijate mõõdikud
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Parsija</TableCell>
                    <TableCell>Olek</TableCell>
                    <TableCell>Viimane käivitamine</TableCell>
                    <TableCell>Edukus</TableCell>
                    <TableCell>Töödeldud</TableCell>
                    <TableCell>Vead</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parserMetrics.map((parser) => (
                    <TableRow key={parser.name}>
                      <TableCell>{parser.name}</TableCell>
                      <TableCell>
                        <Chip
                          icon={parser.status === 'active' ? <CheckCircleIcon /> : <WarningIcon />}
                          label={parser.status === 'active' ? 'Aktiivne' : 'Hoiatus'}
                          color={parser.status === 'active' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{parser.lastRun}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={parser.successRate}
                            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                            color={parser.successRate >= 95 ? 'success' : parser.successRate >= 85 ? 'warning' : 'error'}
                          />
                          <Typography variant="body2">{parser.successRate}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{parser.itemsProcessed}</TableCell>
                      <TableCell>
                        {parser.errors > 0 ? (
                          <Chip label={parser.errors} color="error" size="small" />
                        ) : (
                          <Typography variant="body2" color="text.secondary">0</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Viimased vead ja hoiatused
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {recentErrors.map((error) => (
                <Alert
                  key={error.id}
                  severity={error.severity as 'warning' | 'error'}
                  icon={error.severity === 'error' ? <ErrorIcon /> : <WarningIcon />}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {error.source}
                  </Typography>
                  <Typography variant="body2">
                    {error.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {error.timestamp}
                  </Typography>
                </Alert>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
