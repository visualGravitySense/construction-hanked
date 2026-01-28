import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  alpha,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Profile {
  id: number;
  name: string;
  categories: string[];
  regions: string[];
  keywords: string[];
  email: string;
  active: boolean;
  matches: number;
}

export default function Profiles() {
  const theme = useTheme();
  const [profiles, setProfiles] = React.useState<Profile[]>([
    {
      id: 1,
      name: 'IT-услуги',
      categories: ['IT-услуги', 'Разработка ПО'],
      regions: ['Таллинн', 'Тарту'],
      keywords: ['веб-разработка', 'приложение', 'система'],
      email: 'it@example.com',
      active: true,
      matches: 12,
    },
    {
      id: 2,
      name: 'Консалтинг',
      categories: ['Консалтинг', 'Бизнес-услуги'],
      regions: ['Таллинн'],
      keywords: ['консалтинг', 'стратегия', 'трансформация'],
      email: 'consulting@example.com',
      active: true,
      matches: 8,
    },
    {
      id: 3,
      name: 'Строительство',
      categories: ['Строительство'],
      regions: ['Таллинн', 'Тарту', 'Нарва'],
      keywords: ['строительство', 'ремонт', 'реконструкция'],
      email: 'construction@example.com',
      active: false,
      matches: 5,
    },
    {
      id: 4,
      name: 'Бетонные работы',
      categories: ['Строительство', 'Бетонные работы'],
      regions: ['Таллинн', 'Тарту', 'Нарва', 'Пярну'],
      keywords: ['бетон', 'бетонные работы', 'фундамент', 'заливка бетона', 'бетонирование'],
      email: 'concrete@example.com',
      active: true,
      matches: 3,
    },
  ]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingProfile, setEditingProfile] = React.useState<Profile | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    categories: [] as string[],
    regions: [] as string[],
    keywords: '',
    email: '',
    active: true,
  });

  const allCategories = ['IT-услуги', 'Консалтинг', 'Строительство', 'Бетонные работы', 'Мебель', 'Разработка ПО', 'Бизнес-услуги'];
  const allRegions = ['Таллинн', 'Тарту', 'Нарва', 'Пярну', 'Вильянди'];

  const handleOpenDialog = (profile?: Profile) => {
    if (profile) {
      setEditingProfile(profile);
      setFormData({
        name: profile.name,
        categories: profile.categories,
        regions: profile.regions,
        keywords: profile.keywords.join(', '),
        email: profile.email,
        active: profile.active,
      });
    } else {
      setEditingProfile(null);
      setFormData({
        name: '',
        categories: [],
        regions: [],
        keywords: '',
        email: '',
        active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProfile(null);
  };

  const handleSave = () => {
    if (editingProfile) {
      setProfiles(profiles.map(p =>
        p.id === editingProfile.id
          ? {
              ...p,
              ...formData,
              keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
            }
          : p
      ));
    } else {
      const newProfile: Profile = {
        id: Math.max(...profiles.map(p => p.id)) + 1,
        name: formData.name,
        categories: formData.categories,
        regions: formData.regions,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        email: formData.email,
        active: formData.active,
        matches: 0,
      };
      setProfiles([...profiles, newProfile]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот профиль?')) {
      setProfiles(profiles.filter(p => p.id !== id));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
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
            Профили клиентов
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Управление профилями для сопоставления с тендерами
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
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
          Создать профиль
        </Button>
      </Box>

      <Grid container spacing={3}>
        {profiles.map((profile) => (
          <Grid item xs={12} md={6} lg={4} key={profile.id}>
            <Card
              sx={{
                height: '100%',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {profile.name}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(profile)}
                      sx={{
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.1),
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(profile.id)}
                      sx={{
                        '&:hover': {
                          background: alpha(theme.palette.error.main, 0.1),
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Категории:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {profile.categories.map((cat) => (
                      <Chip key={cat} label={cat} size="small" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Регионы:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {profile.regions.map((reg) => (
                      <Chip key={reg} label={reg} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Ключевые слова:
                  </Typography>
                  <Typography variant="body2">
                    {profile.keywords.join(', ')}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Email: {profile.email}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <Chip
                    icon={profile.active ? <CheckCircleIcon /> : undefined}
                    label={profile.active ? 'Активен' : 'Неактивен'}
                    color={profile.active ? 'success' : 'default'}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      boxShadow: profile.active ? `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}` : 'none',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Совпадений: <strong>{profile.matches}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProfile ? 'Редактировать профиль' : 'Создать профиль'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Название профиля"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Категории</InputLabel>
              <Select
                multiple
                value={formData.categories}
                label="Категории"
                onChange={(e) => setFormData({ ...formData, categories: e.target.value as string[] })}
              >
                {allCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Регионы</InputLabel>
              <Select
                multiple
                value={formData.regions}
                label="Регионы"
                onChange={(e) => setFormData({ ...formData, regions: e.target.value as string[] })}
              >
                {allRegions.map((reg) => (
                  <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Ключевые слова (через запятую)"
              fullWidth
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              helperText="Введите ключевые слова через запятую"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              }
              label="Активный профиль"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
