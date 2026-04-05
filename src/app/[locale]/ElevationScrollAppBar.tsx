'use client';

import { ContactUs } from '@/components/ContactUs';
import SearchModal from '@/components/SearchModal';
import { SlackIconNoColor } from '@/components/icons';
import { useI18n } from '@/locales/client';
import { useGlobalStore } from '@/store/global';
import {
  AccountTree,
  ExpandLess,
  ExpandMore,
  GitHub,
  Inventory2,
  LaunchOutlined,
  Menu as MenuIcon,
  Rocket,
  Search as SearchIcon,
  Storage,
  ViewInAr,
} from '@mui/icons-material';
import {
  AppBar,
  AppBarProps,
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
  Stack,
  TextField,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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

// Mobile drawer width
const DRAWER_WIDTH = 280;

function MobileDrawer({
  open,
  onClose,
  onOpenSearch,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const t = useI18n();
  const [docsOpen, setDocsOpen] = useState(false);
  const [dbOpen, setDbOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const iconProps = { sx: { fontSize: 22 } };

  const toggleCategory = (name: string) =>
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));

  const dbCategories = [
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

  const documentations = [
    { title: t('navigation.user'), icon: <PermIdentityOutlined />, href: '/docs/preview/user_docs' },
    { title: 'KubeBlocks CLI', icon: <DataObjectOutlined />, href: '/docs/preview/cli' },
    { title: 'API Reference', icon: <DataArray />, href: '/docs/preview/user_docs/references/api-reference/cluster' },
    { title: t('navigation.reports'), icon: <PestControlOutlined />, href: '/reports' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
    >
      <Box sx={{ pt: 1 }}>
        {/* Search */}
        <ListItemButton onClick={() => { onClose(); onOpenSearch(); }}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary="Search docs..." />
        </ListItemButton>

        <Divider />

        {/* Documentation */}
        <ListItemButton onClick={() => setDocsOpen(!docsOpen)}>
          <ListItemText primary={t('navigation.documentation')} slotProps={{ primary: { fontWeight: 600 } }} />
          {docsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={docsOpen} timeout="auto" unmountOnExit>
          <List dense disablePadding>
            {documentations.map((item) => (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={onClose}
                sx={{ pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <Divider />

        {/* Databases / Add-ons */}
        <ListItemButton onClick={() => setDbOpen(!dbOpen)}>
          <ListItemText primary={t('navigation.databases')} slotProps={{ primary: { fontWeight: 600 } }} />
          {dbOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dbOpen} timeout="auto" unmountOnExit>
          <List dense disablePadding>
            {dbCategories.map((category) => (
              <Box key={category.name}>
                {/* Category header */}
                <ListItemButton onClick={() => toggleCategory(category.name)} sx={{ pl: 3 }}>
                  <ListItemText
                    primary={category.name}
                    slotProps={{ primary: { fontSize: '0.8rem', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' } }}
                  />
                  {openCategories[category.name] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </ListItemButton>
                <Collapse in={!!openCategories[category.name]} timeout="auto" unmountOnExit>
                  <List dense disablePadding>
                    {category.items.map((item) => (
                      <ListItemButton
                        key={item.href}
                        component={Link}
                        href={item.href}
                        onClick={onClose}
                        sx={{ pl: 5 }}
                      >
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
              sx={{ pl: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}><GitHub sx={{ fontSize: 22 }} /></ListItemIcon>
              <ListItemText primary="More Add-ons" slotProps={{ primary: { fontSize: '0.875rem' } }} />
              <LaunchOutlined fontSize="small" sx={{ opacity: 0.5 }} />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

        {/* Blog */}
        <ListItemButton component={Link} href="/blog" onClick={onClose}>
          <ListItemText primary={t('navigation.blogs')} slotProps={{ primary: { fontWeight: 600 } }} />
        </ListItemButton>

        <Divider />

        {/* Enterprise */}
        <ListItemButton component="a" href="https://kubeblocks.io/contact" target="_blank" rel="noopener noreferrer" onClick={onClose}>
          <ListItemText primary="Enterprise" slotProps={{ primary: { fontWeight: 600 } }} />
          <LaunchOutlined fontSize="small" sx={{ opacity: 0.6 }} />
        </ListItemButton>

        <Divider />

        {/* Social */}
        <Stack direction="row" spacing={1} sx={{ px: 2, py: 1.5 }}>
          <IconButton href="https://kubeblocks.slack.com" target="_blank" aria-label="Join KubeBlocks on Slack">
            <SlackIconNoColor />
          </IconButton>
          <IconButton href="https://github.com/apecloud/kubeblocks" target="_blank" aria-label="KubeBlocks on GitHub">
            <GitHub />
          </IconButton>
        </Stack>
      </Box>
    </Drawer>
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

  const { isMobile, setIsMobile, toggleSidebarCollapsed } = useGlobalStore();

  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobile(mobile);
    toggleSidebarCollapsed(mobile);
  }, [mobile, setIsMobile, toggleSidebarCollapsed]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
          {/* Hamburger — mobile only */}
          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

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
            <DocumentationNav />
            <DatabasesNav />
            <Button
              component={Link}
              color="inherit"
              size="large"
              href="/blog"
              sx={{
                paddingInline: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {t('navigation.blogs')}
            </Button>
            <ContactUs
              size="large"
              color="inherit"
              title="Trial Account Request"
              sx={{
                paddingInline: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              endIcon={<LaunchOutlined />}
            >
              Enterprise
            </ContactUs>

            <Box sx={searchBarStyles.container}>
              <TextField
                size="small"
                placeholder={mobile ? 'Search...' : 'Search docs...'}
                variant="outlined"
                onClick={() => setShowSearch(true)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <SearchIcon sx={searchBarStyles.searchIcon} />
                    ),
                    endAdornment: !mobile && (
                      <Box sx={searchBarStyles.shortcutContainer}>
                        <Box component="kbd" sx={searchBarStyles.shortcutKey}>
                          ⌘K
                        </Box>
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

          {/* Spacer on mobile to push icons right */}
          <Box sx={{ flex: 1, display: { xs: 'block', md: 'none' } }} />

          <Box
            sx={{
              gap: { xs: 0.5, md: 2 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
              href="https://kubeblocks.slack.com"
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
            {/* <LocaleSwitcher /> */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setShowSearch(true)}
      />

      <SearchModal open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};
