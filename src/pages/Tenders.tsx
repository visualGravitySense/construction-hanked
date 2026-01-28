import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  alpha,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { hankedTenders } from '../data/hankedTenders';

export default function Tenders() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [regionFilter, setRegionFilter] = React.useState('');
  const [selectedTender, setSelectedTender] = React.useState<any>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  // Данные из парсера hanked.ee + дополнительные примеры
  const mockTenders = [
    {
      id: 1,
      title: 'Разработка веб-приложения для государственного портала',
      source: 'Riigihangete Portal',
      category: 'IT-услуги',
      region: 'Таллинн',
      value: '€45,000',
      deadline: '2024-02-15',
      status: 'active',
      matched: true,
    },
    {
      id: 2,
      title: 'Услуги по обслуживанию серверного оборудования',
      source: 'E-procurement Portal',
      category: 'IT-услуги',
      region: 'Тарту',
      value: '€12,500',
      deadline: '2024-02-20',
      status: 'active',
      matched: false,
    },
    {
      id: 6,
      title: 'Поставка офисной мебели',
      source: 'Riigihangete Portal',
      category: 'Мебель',
      region: 'Нарва',
      value: '€8,900',
      deadline: '2024-02-18',
      status: 'active',
      matched: false,
    },
    {
      id: 7,
      title: 'Консалтинг по цифровой трансформации',
      source: 'E-procurement Portal',
      category: 'Консалтинг',
      region: 'Таллинн',
      value: '€65,000',
      deadline: '2024-02-25',
      status: 'active',
      matched: true,
    },
  ];

  // Объединяем реальные данные из парсера с моковыми данными
  const tenders = [...hankedTenders, ...mockTenders];

  const categories = ['Все', 'IT-услуги', 'Мебель', 'Консалтинг', 'Строительство', 'Бетонные работы'];
  const regions = ['Все', 'Таллинн', 'Тарту', 'Нарва', 'Пярну'];

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'Все' || tender.category === categoryFilter;
    const matchesRegion = !regionFilter || regionFilter === 'Все' || tender.region === regionFilter;
    return matchesSearch && matchesCategory && matchesRegion;
  });

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
          Тендеры
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Список всех найденных тендеров с возможностью фильтрации
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: 3, 
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={categoryFilter}
                label="Категория"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Регион</InputLabel>
              <Select
                value={regionFilter}
                label="Регион"
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                {regions.map((reg) => (
                  <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('');
                setRegionFilter('');
              }}
            >
              Сбросить
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer 
        component={Paper}
        sx={{
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.1)} 100%)`,
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Название</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Источник</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Категория</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Регион</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Сумма</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Срок</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Статус</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTenders.map((tender) => (
              <TableRow 
                key={tender.id} 
                hover
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.04),
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {tender.title}
                  </Typography>
                  {tender.matched && (
                    <Chip
                      label="Совпадение"
                      color="success"
                      size="small"
                      sx={{ 
                        mt: 0.5,
                        fontWeight: 600,
                        boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}`,
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {tender.source}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={tender.category} 
                    size="small"
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.1)} 100%)`,
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>{tender.region}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color="primary">
                    {tender.value}
                  </Typography>
                </TableCell>
                <TableCell>{tender.deadline}</TableCell>
                <TableCell>
                  <Chip
                    label={tender.status}
                    color={tender.status === 'active' ? 'success' : 'default'}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => {
                      setSelectedTender(tender);
                      setOpenDialog(true);
                    }}
                    sx={{
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.1),
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredTenders.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Тендеры не найдены
          </Typography>
        </Paper>
      )}

      {/* Диалог с деталями тендера */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedTender && (
          <>
            <DialogTitle sx={{ fontWeight: 600, color: '#212121' }}>
              {selectedTender.title}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
                    Описание
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {selectedTender.description || 'Описание отсутствует'}
                  </Typography>
                </Box>

                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Заказчик
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.buyer || 'Не указан'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Регион
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.region}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Сумма
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontWeight: 600 }}>
                      {selectedTender.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Срок подачи
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.deadline}
                    </Typography>
                  </Grid>
                  {selectedTender.published_date && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                        Дата публикации
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {selectedTender.published_date}
                      </Typography>
                    </Grid>
                  )}
                  {selectedTender.cpv_code && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                        CPV код
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {selectedTender.cpv_code}
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                {selectedTender.matched_keywords && selectedTender.matched_keywords.length > 0 && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
                        Найденные ключевые слова
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedTender.matched_keywords.map((keyword: string, idx: number) => (
                          <Chip key={idx} label={keyword} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </>
                )}

                {selectedTender.documents && selectedTender.documents.length > 0 && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
                        Документы
                      </Typography>
                      <List dense>
                        {selectedTender.documents.map((doc: any, idx: number) => (
                          <ListItem key={idx}>
                            <ListItemText
                              primary={
                                <Link href={doc.url} target="_blank" rel="noopener">
                                  {doc.name}
                                </Link>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </>
                )}

                {selectedTender.url && (
                  <>
                    <Divider />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#212121' }}>
                        Ссылка на тендер
                      </Typography>
                      <Link href={selectedTender.url} target="_blank" rel="noopener">
                        {selectedTender.url}
                      </Link>
                    </Box>
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Закрыть</Button>
              {selectedTender.url && (
                <Button 
                  variant="contained" 
                  href={selectedTender.url} 
                  target="_blank"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                  }}
                >
                  Открыть на сайте
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
