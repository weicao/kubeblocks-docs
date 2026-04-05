'use client';

import {
  BackupOutlined,
  CheckCircle,
  Close,
  MonitorHeartOutlined,
  SystemUpdateAltOutlined,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

const databases = ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'ElasticSearch', 'SQL Server'];

const painPoints = [
  { icon: <BackupOutlined fontSize="small" />, label: 'Separate backup' },
  { icon: <MonitorHeartOutlined fontSize="small" />, label: 'Separate monitoring' },
  { icon: <SystemUpdateAltOutlined fontSize="small" />, label: 'Separate upgrade' },
];

const unified = [
  { icon: <BackupOutlined fontSize="small" />, label: 'Unified backup' },
  { icon: <MonitorHeartOutlined fontSize="small" />, label: 'Unified monitoring' },
  { icon: <SystemUpdateAltOutlined fontSize="small" />, label: 'Unified upgrade' },
];

function BeforePanel() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        borderColor: 'error.light',
        bgcolor: isDark ? 'rgba(211,47,47,0.05)' : 'rgba(211,47,47,0.03)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Close sx={{ color: 'error.main', fontSize: 20 }} />
        <Typography fontWeight={700} color="error.main">
          Without KubeBlocks
        </Typography>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
        {databases.map((db) => (
          <Box
            key={db}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1.5,
              p: 1.5,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="body2" fontWeight={600} mb={1}>
              {db} Operator
            </Typography>
            <Stack spacing={0.5}>
              {painPoints.map((p) => (
                <Stack key={p.label} direction="row" spacing={0.75} alignItems="center">
                  <Box sx={{ color: 'text.disabled', display: 'flex' }}>{p.icon}</Box>
                  <Typography variant="caption" color="text.secondary">
                    {p.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      <Typography
        variant="caption"
        color="error.main"
        sx={{ mt: 2, display: 'block', fontWeight: 500 }}
      >
        {databases.length} operators × 3 concerns = {databases.length * 3} things to maintain
      </Typography>
    </Paper>
  );
}

function AfterPanel() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        borderColor: 'success.light',
        bgcolor: isDark ? 'rgba(46,125,50,0.05)' : 'rgba(46,125,50,0.03)',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
        <Typography fontWeight={700} color="success.main">
          With KubeBlocks
        </Typography>
      </Stack>

      {/* Databases row */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {databases.map((db) => (
          <Chip key={db} label={db} size="small" variant="outlined" />
        ))}
        <Chip label="+ 31 more" size="small" sx={{ color: 'text.secondary', borderStyle: 'dashed' }} />
      </Box>

      {/* Arrow */}
      <Box textAlign="center" sx={{ fontSize: '1.5rem', color: 'text.disabled', my: 1 }}>
        ↓
      </Box>

      {/* KubeBlocks box */}
      <Box
        sx={{
          border: 2,
          borderColor: 'primary.main',
          borderRadius: 2,
          p: 2,
          bgcolor: 'background.paper',
          mb: 2,
        }}
      >
        <Typography variant="body2" fontWeight={700} color="primary" mb={1.5} textAlign="center">
          KubeBlocks — Unified API
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        <Stack spacing={0.75}>
          {unified.map((u) => (
            <Stack key={u.label} direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ color: 'success.main', display: 'flex' }}>{u.icon}</Box>
              <Typography variant="caption" fontWeight={500}>
                {u.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Typography
        variant="caption"
        color="success.main"
        sx={{ fontWeight: 500, display: 'block' }}
      >
        35+ databases × 1 control plane = everything consistent
      </Typography>
    </Paper>
  );
}

export default function OperatorSprawl() {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            The Operator Sprawl Problem
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
            Every database operator ships its own API, backup tool, and upgrade procedure.
            KubeBlocks replaces them all with a single control plane.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }}>
            <BeforePanel />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AfterPanel />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
