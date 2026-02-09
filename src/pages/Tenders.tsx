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

  const mockTenders = [
    {
      id: 1,
      title: 'Veebirakenduse arendus riigiportaali jaoks',
      source: 'Riigihangete Portal',
      category: 'IT-teenused',
      region: 'Tallinn',
      value: '€45,000',
      deadline: '2024-02-15',
      status: 'active',
      matched: true,
    },
    {
      id: 2,
      title: 'Serveriseadmete hooldusteenused',
      source: 'E-procurement Portal',
      category: 'IT-teenused',
      region: 'Tartu',
      value: '€12,500',
      deadline: '2024-02-20',
      status: 'active',
      matched: false,
    },
    {
      id: 6,
      title: 'Kontorimööbli tarnimine',
      source: 'Riigihangete Portal',
      category: 'Mööbel',
      region: 'Narva',
      value: '€8,900',
      deadline: '2024-02-18',
      status: 'active',
      matched: false,
    },
    {
      id: 7,
      title: 'Digitaalse transformatsiooni konsultatsioon',
      source: 'E-procurement Portal',
      category: 'Konsultatsioon',
      region: 'Tallinn',
      value: '€65,000',
      deadline: '2024-02-25',
      status: 'active',
      matched: true,
    },
  ];

  const tenders = [...hankedTenders, ...mockTenders];

  const categories = ['Kõik', 'IT-teenused', 'Mööbel', 'Konsultatsioon', 'Ehitus', 'Betoonitööd'];
  const regions = ['Kõik', 'Tallinn', 'Tartu', 'Narva', 'Pärnu'];

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'Kõik' || tender.category === categoryFilter;
    const matchesRegion = !regionFilter || regionFilter === 'Kõik' || tender.region === regionFilter;
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
          Hangete nimekiri
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kõik leitud hangete nimekiri filtreerimise võimalusega
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
              placeholder="Otsi pealkirja järgi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Kategooria</InputLabel>
              <Select
                value={categoryFilter}
                label="Kategooria"
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
              <InputLabel>Piirkond</InputLabel>
              <Select
                value={regionFilter}
                label="Piirkond"
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
              Lähtesta
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
              <TableCell sx={{ fontWeight: 600 }}>Nimetus</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Allikas</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Kategooria</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Piirkond</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Summa</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tähtaeg</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Olek</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tegevused</TableCell>
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
                      label="Kokkulangevus"
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
            Hange ei leitud
          </Typography>
        </Paper>
      )}

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
                    Kirjeldus
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {selectedTender.description || 'Kirjeldus puudub'}
                  </Typography>
                </Box>

                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Tellija
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.buyer || 'Määramata'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Piirkond
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.region}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Summa
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontWeight: 600 }}>
                      {selectedTender.value}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      Esitamise tähtaeg
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                      {selectedTender.deadline}
                    </Typography>
                  </Grid>
                  {selectedTender.published_date && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                        Avaldamise kuupäev
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        {selectedTender.published_date}
                      </Typography>
                    </Grid>
                  )}
                  {selectedTender.cpv_code && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                        CPV kood
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
                        Leitud märksõnad
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
                        Dokumendid
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
                        Link hangile
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
              <Button onClick={() => setOpenDialog(false)}>Sulge</Button>
              {selectedTender.url && (
                <Button 
                  variant="contained" 
                  href={selectedTender.url} 
                  target="_blank"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.main} 100%)`,
                  }}
                >
                  Ava saidil
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
