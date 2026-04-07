'use client';

import { Link } from '@/components/Link';
import { CheckCircleOutline, ContentCopy, Done } from '@mui/icons-material';
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

export default function QuickStart() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeEngine, setActiveEngine] = useState(0);

  const steps = makeSteps(engines[activeEngine]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px', mb: 1.5, fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'text.disabled', '&::before': { content: '""', width: '14px', height: '2px', borderRadius: '1px', bgcolor: 'text.disabled', display: 'block' } }}>Quick Start</Box>
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
        </Box>

        {/* Engine selector */}
        <Stack direction="row" flexWrap="wrap" gap={1} mb={4} justifyContent="center">
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
                StepIconComponent={activeStep > index ? () => (
                  <CheckCircleOutline color="success" sx={{ fontSize: 24 }} />
                ) : undefined}
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
                      sx={{
                        fontSize: '0.875rem',
                        color: 'primary.main',
                        cursor: 'pointer',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Next →
                    </Box>
                  )}
                  {index > 0 && (
                    <Box
                      component="span"
                      onClick={() => setActiveStep(index - 1)}
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Back
                    </Box>
                  )}
                </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Want more databases?{' '}
            <Link href="/docs/preview/user_docs" underline="always">
              Browse the full documentation
            </Link>
            {' '}or{' '}
            <Link
              href="https://github.com/apecloud/kubeblocks-addons"
              target="_blank"
              underline="always"
            >
              explore all Add-ons
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
