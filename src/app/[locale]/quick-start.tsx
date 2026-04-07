'use client';

import { Link } from '@/components/Link';
import { ArrowForward, ContentCopy, Done, Extension, Forum, GitHub, LibraryBooks } from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'grey.900',
        borderRadius: 2,
        mt: 1.5,
        '&:hover .copy-btn': { opacity: 1 },
      }}
    >
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <IconButton
          className="copy-btn"
          size="small"
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 0.2s',
            color: copied ? 'success.light' : 'grey.400',
            '&:hover': { color: 'grey.100' },
          }}
        >
          {copied ? <Done fontSize="small" /> : <ContentCopy fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2.5,
          overflowX: 'auto',
          fontSize: '0.8rem',
          lineHeight: 1.7,
          color: 'grey.100',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
        }}
      >
        {code}
      </Box>
    </Box>
  );
}

const engines = [
  {
    name: 'MySQL',
    chart: 'mysql-cluster',
    release: 'my-mysql',
    verify: 'my-mysql',
  },
  {
    name: 'PostgreSQL',
    chart: 'postgresql-cluster',
    release: 'my-pg',
    verify: 'my-pg',
  },
  {
    name: 'Redis',
    chart: 'redis-cluster',
    release: 'my-redis',
    verify: 'my-redis',
  },
  {
    name: 'MongoDB',
    chart: 'mongodb-cluster',
    release: 'my-mongodb',
    verify: 'my-mongodb',
  },
  {
    name: 'Kafka',
    chart: 'kafka-cluster',
    release: 'my-kafka',
    verify: 'my-kafka',
  },
];

function makeSteps(engine: typeof engines[0]) {
  return [
    {
      label: 'Add Helm repo',
      code: `helm repo add kubeblocks https://apecloud.github.io/helm-charts\nhelm repo update`,
    },
    {
      label: 'Install KubeBlocks',
      code: `helm install kubeblocks kubeblocks/kubeblocks \\\n  --namespace kb-system --create-namespace`,
    },
    {
      label: `Create a ${engine.name} cluster`,
      code: `helm install ${engine.release} kubeblocks/${engine.chart} \\\n  --namespace demo --create-namespace \\\n  --set replicas=2 \\\n  --set cpu=0.5 \\\n  --set memory=0.5 \\\n  --set storage=20`,
    },
    {
      label: 'Verify',
      code: `kubectl get cluster ${engine.verify} -n demo`,
      note: 'Wait until STATUS is Running.',
    },
  ];
}

const resourceLinks = [
  { icon: <LibraryBooks sx={{ fontSize: 16 }} />, label: 'Documentation', href: '/docs/preview/user_docs', external: false },
  { icon: <GitHub sx={{ fontSize: 16 }} />, label: 'GitHub', href: 'https://github.com/apecloud/kubeblocks', external: true },
  { icon: <Forum sx={{ fontSize: 16 }} />, label: 'Slack Community', href: 'https://kubeblockshq.slack.com/', external: true },
  { icon: <Extension sx={{ fontSize: 16 }} />, label: 'All Add-ons', href: 'https://github.com/apecloud/kubeblocks-addons', external: true },
];

export default function QuickStart() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeEngine, setActiveEngine] = useState(0);

  const steps = makeSteps(engines[activeEngine]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'primary.main', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'primary.main', display: 'block' } }}>Quick Start</Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Up and Running in Minutes
          </Typography>
          <Typography color="text.secondary">
            Requires a running Kubernetes cluster and{' '}
            <Link href="https://helm.sh/docs/intro/install/" target="_blank" underline="always">
              Helm 3
            </Link>
            .
          </Typography>
          <Box
            component={Link}
            href="https://labs.iximiuz.com/skill-paths/kubeblocks-skill-path-1f1a0a29"
            target="_blank"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              mt: 2, px: 2, py: 1, borderRadius: 1.5,
              border: '1px solid', borderColor: 'primary.main',
              bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(91,127,255,0.08)' : 'rgba(37,99,235,0.05)',
              fontSize: '0.875rem', color: 'primary.main', fontWeight: 500,
              textDecoration: 'none',
              transition: 'background .15s',
              '&:hover': { bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(91,127,255,0.14)' : 'rgba(37,99,235,0.1)' },
            }}
          >
            ⚡ No Kubernetes cluster? Try the hosted playground — no installation required
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 280px' }, gap: { xs: 4, md: 6 }, alignItems: 'start' }}>
          {/* Left: stepper */}
          <Box>
            {/* Engine selector */}
            <Stack direction="row" flexWrap="wrap" gap={1} mb={4}>
              {engines.map((engine, i) => (
                <Chip
                  key={engine.name}
                  label={engine.name}
                  variant={activeEngine === i ? 'filled' : 'outlined'}
                  color={activeEngine === i ? 'primary' : 'default'}
                  onClick={() => { setActiveEngine(i); setActiveStep(0); }}
                  sx={{ fontWeight: activeEngine === i ? 600 : 400 }}
                />
              ))}
              <Chip
                label="35+ more →"
                variant="outlined"
                component={Link}
                href="https://github.com/apecloud/kubeblocks-addons"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.secondary', borderStyle: 'dashed', cursor: 'pointer' }}
              />
            </Stack>

            <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
              {steps.map((step, index) => (
                <Step key={step.label} completed={activeStep > index}>
                  <StepLabel
                    onClick={() => setActiveStep(index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography fontWeight={activeStep === index ? 600 : 400}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <CodeBlock code={step.code} />
                    {step.note && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        {step.note}
                      </Typography>
                    )}
                    <Stack direction="row" spacing={1} mt={2}>
                      {index < steps.length - 1 && (
                        <Box
                          component="span"
                          onClick={() => setActiveStep(index + 1)}
                          sx={{ fontSize: '0.875rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
                        >
                          Next →
                        </Box>
                      )}
                      {index > 0 && (
                        <Box
                          component="span"
                          onClick={() => setActiveStep(index - 1)}
                          sx={{ fontSize: '0.875rem', color: 'text.secondary', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        >
                          Back
                        </Box>
                      )}
                    </Stack>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Right: resource links */}
          <Box sx={{ pt: { xs: 0, md: 7 } }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.disabled', mb: 1.5 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px', bgcolor: 'divider', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
              {resourceLinks.map((r) => (
                <Box
                  key={r.label}
                  component={Link}
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    px: 2, py: 1.5, bgcolor: 'background.paper',
                    color: 'text.secondary', textDecoration: 'none',
                    transition: 'background .15s, color .15s',
                    '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    {r.icon}
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{r.label}</Typography>
                  </Box>
                  <ArrowForward sx={{ fontSize: 14, opacity: 0.4 }} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
