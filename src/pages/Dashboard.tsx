import * as React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  alpha,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { hankedTenders } from '../data/hankedTenders';

export default function Dashboard() {
  const theme = useTheme();
  
  // Подсчет реальных данных из парсера
  const concreteTendersCount = hankedTenders.length;
  const totalValue = hankedTenders.reduce((sum, t) => {
    const value = parseInt(t.value.replace('€', '').replace(',', ''));
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  
  const stats = [
    {
      title: 'Всего тендеров',
      value: concreteTendersCount.toString(),
      change: `+${concreteTendersCount} новых`,
      icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
      bgColor: '#f5f5f5',
      iconBg: '#212121',
    },
    {
      title: 'Активных профилей',
      value: '45',
      change: '+3',
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      bgColor: '#fafafa',
      iconBg: '#424242',
    },
    {
      title: 'Совпадений сегодня',
      value: concreteTendersCount.toString(),
      change: `+${concreteTendersCount} по бетонным работам`,
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      bgColor: '#f5f5f5',
      iconBg: '#616161',
    },
    {
      title: 'Отправлено уведомлений',
      value: '156',
      change: '+23',
      icon: <NotificationsActiveIcon sx={{ fontSize: 48 }} />,
      bgColor: '#fafafa',
      iconBg: '#757575',
    },
  ];

  const parserStatus = [
    { name: 'Riigihangete Portal', status: 'active', lastRun: '2 мин назад', items: 234 },
    { name: 'E-procurement Portal', status: 'active', lastRun: '5 мин назад', items: 189 },
    { name: 'Hanked.ee', status: 'active', lastRun: '3 мин назад', items: 145 },
    { name: 'Другие источники', status: 'active', lastRun: '10 мин назад', items: 67 },
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
            color: '#212121',
          }}
        >
          Панель управления
        </Typography>
        <Typography variant="body1" sx={{ color: '#757575' }}>
          Обзор системы парсинга тендеров
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                background: stat.bgColor,
                border: '1px solid #e0e0e0',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                  borderColor: '#bdbdbd',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      sx={{ 
                        color: '#757575',
                        fontWeight: 500, 
                        textTransform: 'uppercase', 
                        letterSpacing: 0.5,
                        fontSize: '0.75rem',
                        mb: 1,
                      }}
                      gutterBottom 
                      variant="body2"
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h3" 
                      component="div"
                      sx={{ 
                        fontWeight: 700,
                        color: '#212121',
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#424242',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 16, color: '#616161' }} />
                      {stat.change} за последние 24 часа
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: stat.iconBg,
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, color: '#212121' }}>
              Статус парсеров
            </Typography>
            <Box sx={{ mt: 2 }}>
              {parserStatus.map((parser, index) => (
                <Box 
                  key={parser.name} 
                  sx={{ 
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    background: '#fafafa',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#f5f5f5',
                      borderColor: '#bdbdbd',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight="600" sx={{ color: '#212121' }}>
                      {parser.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#757575' }}>
                        {parser.lastRun}
                      </Typography>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: '#424242',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': {
                              opacity: 1,
                            },
                            '50%': {
                              opacity: 0.5,
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#616161',
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 100, textAlign: 'right', color: '#757575' }}>
                      {parser.items} тендеров
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3,
              background: '#ffffff',
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3, color: '#212121' }}>
              Последние совпадения
            </Typography>
            <Box sx={{ mt: 2 }}>
              {hankedTenders.slice(0, 5).map((tender, i) => (
                <Box 
                  key={tender.id} 
                  sx={{ 
                    mb: 2, 
                    pb: 2, 
                    borderBottom: '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      pl: 1,
                      borderLeft: '3px solid #212121',
                    },
                    '&:last-child': {
                      borderBottom: 'none',
                      mb: 0,
                      pb: 0,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#424242',
                      }}
                    />
                    <Typography variant="body2" fontWeight="600" sx={{ color: '#212121' }}>
                      {tender.title.length > 50 ? tender.title.substring(0, 50) + '...' : tender.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ display: 'block', color: '#757575' }}>
                    Совпал с профилем "Бетонные работы" • {tender.value}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem', color: '#9e9e9e' }}>
                    {tender.region} • Срок: {tender.deadline}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
