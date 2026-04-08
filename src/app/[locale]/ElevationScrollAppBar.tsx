'use client';

import SearchModal from '@/components/SearchModal';
import { SlackIconNoColor } from '@/components/icons';
import { useI18n } from '@/locales/client';
import { useGlobalStore } from '@/store/global';
import {
  AccountTree,
  Article as ArticleIcon,
  Extension as ExtensionIcon,
  Feed as FeedIcon,
  GitHub,
  Inventory2,
  LaunchOutlined,
  List as ListIcon,
  MenuOpen as MenuOpenIcon,
  MoreHoriz as MoreHorizIcon,
  Rocket,
  Search as SearchIcon,
  Storage,
  ViewInAr,
} from '@mui/icons-material';
import {
  AppBar,
  AppBarProps,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatabasesNav from './nav-databases';
import DocumentationNav from './nav-document';
import ThemeSwitcher from './theme-switch';
import {
  ElasticSearchIcon,
  KafkaIcon,
  MilvusIcon,
  MongodbIcon,
  MySQLIcon,
  PostgreSQLIcon,
  QdrantIcon,
  RabbitMQIcon,
  RedisIcon,
} from '@/components/icons';
import { DataArray, DataObjectOutlined, PermIdentityOutlined, PestControlOutlined } from '@mui/icons-material';

const searchBarStyles = {
  container: {
    minWidth: { xs: 120, sm: 200, md: 240 },
    maxWidth: { xs: 150, sm: 280, md: 320 },
    flex: 0,
  },
  textField: {
    width: '100%',
    '& .MuiInputBase-input::placeholder': {
      color: 'text.secondary',
      opacity: 0.8,
    },
  },
  inputRoot: {
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    fontSize: { xs: '0.8rem', sm: '0.875rem' },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '& input': {
      cursor: 'pointer',
      color: 'text.secondary',
      padding: { xs: '6px 8px', sm: '8.5px 14px' },
    },
  },
  searchIcon: {
    color: 'text.secondary',
    mr: { xs: 0.5, sm: 1 },
  },
  shortcutContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    opacity: 0.7,
  },
  shortcutKey: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'text.secondary',
    borderRadius: 1,
    padding: '2px 6px',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
};

// Height of bottom nav bar
export const BOTTOM_NAV_HEIGHT = 56;

// ── Bottom sheet: Documentation ──────────────────────────────────────────────
function DocsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useI18n();
  const items = [
    { title: t('navigation.user'), icon: <PermIdentityOutlined />, href: '/docs/preview/user_docs' },
    { title: 'KubeBlocks CLI', icon: <DataObjectOutlined />, href: '/docs/preview/cli' },
    { title: 'API Reference', icon: <DataArray />, href: '/docs/preview/user_docs/references/api-reference/cluster' },
    { title: t('navigation.reports'), icon: <PestControlOutlined />, href: '/reports' },
  ];
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box sx={{ pb: `${BOTTOM_NAV_HEIGHT}px` }}>
        <Typography variant="overline" sx={{ px: 2, pt: 2, pb: 1, display: 'block', color: 'text.secondary' }}>
          {t('navigation.documentation')}
        </Typography>
        <Divider />
        <List dense>
          {items.map((item) => (
            <ListItemButton key={item.href} component={Link} href={item.href} onClick={onClose} sx={{ py: 1.5 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

// ── Bottom sheet: Add-ons ─────────────────────────────────────────────────────
function AddonsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useI18n();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const toggle = (name: string) => setOpenCategories((p) => ({ ...p, [name]: !p[name] }));

  const iconProps = { sx: { fontSize: 22 } };
  const categories = [
    {
      name: 'Relational',
      items: [
        { title: 'MySQL', icon: <MySQLIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-mysql' },
        { title: 'PostgreSQL', icon: <PostgreSQLIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-postgresql' },
      ],
    },
    {
      name: 'NoSQL',
      items: [
        { title: 'Redis', icon: <RedisIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-redis' },
        { title: 'MongoDB', icon: <MongodbIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-mongodb' },
        { title: 'etcd', icon: <AccountTree {...iconProps} />, href: '/docs/preview/kubeblocks-for-etcd' },
        { title: 'ZooKeeper', icon: <ViewInAr {...iconProps} />, href: '/docs/preview/kubeblocks-for-zookeeper' },
      ],
    },
    {
      name: 'Analytics',
      items: [
        { title: 'ClickHouse', icon: <Storage {...iconProps} />, href: '/docs/preview/kubeblocks-for-clickhouse' },
      ],
    },
    {
      name: 'Message Queue',
      items: [
        { title: 'Kafka', icon: <KafkaIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-kafka' },
        { title: 'RabbitMQ', icon: <RabbitMQIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-rabbitmq' },
        { title: 'RocketMQ', icon: <Rocket {...iconProps} />, href: '/docs/preview/kubeblocks-for-rocketmq' },
      ],
    },
    {
      name: 'Vector / Search',
      items: [
        { title: 'Milvus', icon: <MilvusIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-milvus' },
        { title: 'Qdrant', icon: <QdrantIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-qdrant' },
        { title: 'ElasticSearch', icon: <ElasticSearchIcon {...iconProps} />, href: '/docs/preview/kubeblocks-for-elasticsearch' },
      ],
    },
    {
      name: 'Object Storage',
      items: [
        { title: 'MinIO', icon: <Inventory2 {...iconProps} />, href: '/docs/preview/kubeblocks-for-minio' },
      ],
    },
  ];

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box sx={{ pb: `${BOTTOM_NAV_HEIGHT}px`, maxHeight: '70vh', overflow: 'auto' }}>
        <Typography variant="overline" sx={{ px: 2, pt: 2, pb: 1, display: 'block', color: 'text.secondary' }}>
          {t('navigation.databases')}
        </Typography>
        <Divider />
        <List dense disablePadding>
          {categories.map((cat) => (
            <Box key={cat.name}>
              <ListItemButton onClick={() => toggle(cat.name)} sx={{ pl: 2 }}>
                <ListItemText
                  primary={cat.name}
                  slotProps={{ primary: { fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' } }}
                />
                {openCategories[cat.name]
                  ? <ListIcon fontSize="small" sx={{ opacity: 0.5 }} />
                  : <ExtensionIcon fontSize="small" sx={{ opacity: 0.3 }} />}
              </ListItemButton>
              <Collapse in={!!openCategories[cat.name]} timeout="auto" unmountOnExit>
                <List dense disablePadding>
                  {cat.items.map((item) => (
                    <ListItemButton key={item.href} component={Link} href={item.href} onClick={onClose} sx={{ pl: 4 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
          {/* More Add-ons */}
          <ListItemButton
            component={Link}
            href="https://github.com/apecloud/kubeblocks-addons/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            sx={{ pl: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}><GitHub sx={{ fontSize: 22 }} /></ListItemIcon>
            <ListItemText primary="More Add-ons" />
            <LaunchOutlined fontSize="small" sx={{ opacity: 0.5 }} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

// ── Bottom sheet: More ────────────────────────────────────────────────────────
function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box sx={{ pb: `${BOTTOM_NAV_HEIGHT}px` }}>
        <Typography variant="overline" sx={{ px: 2, pt: 2, pb: 1, display: 'block', color: 'text.secondary' }}>
          More
        </Typography>
        <Divider />
        <List dense>
          <ListItemButton component="a" href="https://kubeblocks.com/products/kubeblocks-enterprise" target="_blank" rel="noopener noreferrer" onClick={onClose} sx={{ py: 1.5 }}>
            <ListItemText primary="Enterprise" />
            <LaunchOutlined fontSize="small" sx={{ opacity: 0.6 }} />
          </ListItemButton>
          <ListItemButton component="a" href="https://github.com/apecloud/kubeblocks" target="_blank" rel="noopener noreferrer" onClick={onClose} sx={{ py: 1.5 }}>
            <ListItemIcon><GitHub /></ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItemButton>
          <ListItemButton component="a" href="https://kubeblockshq.slack.com/" target="_blank" rel="noopener noreferrer" onClick={onClose} sx={{ py: 1.5 }}>
            <ListItemIcon><SlackIconNoColor /></ListItemIcon>
            <ListItemText primary="Slack" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

// ── Mobile bottom navigation bar ──────────────────────────────────────────────
function MobileBottomNav({ onOpenSearch }: { onOpenSearch: () => void }) {
  const t = useI18n();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const scrollingDown = useScrollTrigger({ disableHysteresis: false, threshold: 10 });

  // Close sheets on navigation
  useEffect(() => { setActive(null); }, [pathname]);

  const handleChange = (_: React.SyntheticEvent, value: string) => {
    if (value === 'search') { onOpenSearch(); return; }
    if (value === 'blog') { return; } // handled by href
    setActive((prev) => (prev === value ? null : value));
  };

  return (
    <>
      <Slide appear={false} direction="up" in={!scrollingDown}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: 'block', md: 'none' },
        }}
      >
        <BottomNavigation value={active} onChange={handleChange} showLabels sx={{ height: BOTTOM_NAV_HEIGHT }}>
          <BottomNavigationAction label={t('navigation.documentation')} value="docs" icon={<ArticleIcon />} />
          <BottomNavigationAction label="Add-ons" value="addons" icon={<ExtensionIcon />} />
          <BottomNavigationAction
            label={t('navigation.blogs')}
            value="blog"
            icon={<FeedIcon />}
            component={Link}
            href="/blog"
          />
          <BottomNavigationAction label="More" value="more" icon={<MoreHorizIcon />} />
        </BottomNavigation>
      </Paper>
      </Slide>

      <DocsSheet open={active === 'docs'} onClose={() => setActive(null)} />
      <AddonsSheet open={active === 'addons'} onClose={() => setActive(null)} />
      <MoreSheet open={active === 'more'} onClose={() => setActive(null)} />
    </>
  );
}

// import LocaleSwitcher from "./locale-switch";

export const ElevationScrollAppBar = (props: AppBarProps) => {
  const pathname = usePathname();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const t = useI18n();
  const theme = useTheme();

  const { isMobile, setIsMobile, sidebarCollapsed, toggleSidebarCollapsed } = useGlobalStore();
  const isDocsPage = pathname.includes('/docs/');

  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setIsMobile(mobile);
    toggleSidebarCollapsed(mobile);
  }, [mobile, setIsMobile, toggleSidebarCollapsed]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // 监听快捷键
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <AppBar
        {...props}
        sx={{
          boxShadow: trigger ? `0 10px 10px rgba(0,0,0, 0.1)` : 'none',
          zIndex: theme.zIndex.drawer + 1,
          paddingInline: isMobile ? 1 : 0,
        }}
        position="fixed"
      >
        <Toolbar>
          {/* Docs sidebar toggle — mobile + docs page only */}
          {isDocsPage && (
            <IconButton
              color="inherit"
              aria-label="toggle docs sidebar"
              onClick={() => toggleSidebarCollapsed(!sidebarCollapsed)}
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 0.5 }}
            >
              {!sidebarCollapsed ? <MenuOpenIcon /> : <ListIcon />}
            </IconButton>
          )}

          <Stack direction="row" spacing={1}>
            <Link href="/" style={{ display: 'block' }} color="textPrimary">
              <Image
                src={theme.palette.mode === 'dark' ? '/logo-dark.png' : '/logo.png'}
                alt="KubeBlocks"
                width={165}
                height={36}
                style={{ display: 'block' }}
              />
            </Link>
          </Stack>

          {/* Desktop nav — hidden on mobile */}
          <Stack
            sx={{
              paddingInline: 4,
              flex: 1,
              display: { xs: 'none', md: 'flex' },
            }}
            component="nav"
            direction="row"
            alignItems="center"
            gap={1}
          >
            <DatabasesNav />
            <DocumentationNav />
            <Button
              component={Link}
              color="inherit"
              size="large"
              href="/blog"
              sx={{ paddingInline: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {t('navigation.blogs')}
            </Button>
            <Button
              size="large"
              color="inherit"
              href="https://kubeblocks.com/products/kubeblocks-enterprise"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ paddingInline: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              endIcon={<LaunchOutlined />}
            >
              Enterprise
            </Button>

            <Box sx={searchBarStyles.container}>
              <TextField
                size="small"
                placeholder="Search docs..."
                variant="outlined"
                onClick={() => setShowSearch(true)}
                slotProps={{
                  input: {
                    startAdornment: <SearchIcon sx={searchBarStyles.searchIcon} />,
                    endAdornment: (
                      <Box sx={searchBarStyles.shortcutContainer}>
                        <Box component="kbd" sx={searchBarStyles.shortcutKey}>⌘K</Box>
                      </Box>
                    ),
                    readOnly: true,
                    sx: searchBarStyles.inputRoot,
                  },
                }}
                sx={searchBarStyles.textField}
              />
            </Box>
          </Stack>

          {/* Spacer on mobile */}
          <Box sx={{ flex: 1, display: { xs: 'block', md: 'none' } }} />

          <Box sx={{ gap: { xs: 0.5, md: 2 }, display: 'flex', alignItems: 'center' }}>
            {/* Search icon — mobile only */}
            <IconButton
              color="inherit"
              aria-label="search"
              onClick={() => setShowSearch(true)}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <SearchIcon />
            </IconButton>

            {/* Social icons — desktop only */}
            <IconButton
              href="https://kubeblockshq.slack.com/"
              target="_blank"
              aria-label="Join KubeBlocks on Slack"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <SlackIconNoColor />
            </IconButton>
            <IconButton
              href="https://github.com/apecloud/kubeblocks"
              target="_blank"
              aria-label="KubeBlocks on GitHub"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <GitHub />
            </IconButton>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile bottom navigation */}
      <MobileBottomNav onOpenSearch={() => setShowSearch(true)} />

      <SearchModal open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};
