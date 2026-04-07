'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import boncloud          from '@/assets/customers/boncloud.svg';
import ecloud            from '@/assets/customers/ecloud.svg';
import ctyun             from '@/assets/customers/ctyun.svg';
import tencent           from '@/assets/customers/tencent.svg';
import xiaomi            from '@/assets/customers/xiaomi.svg';
import pingan            from '@/assets/customers/pingan.svg';
import weipinhui         from '@/assets/customers/weipinhui.svg';
import kuaishou          from '@/assets/customers/kuaishou.svg';
import tigerbrokers      from '@/assets/customers/tigerbrokers.svg';
import zhongxinzhengquan from '@/assets/customers/zhongxinzhengquan.svg';
import sealos            from '@/assets/customers/sealos.svg';
import fastgpt           from '@/assets/customers/fastgpt.svg';
import kubesphere        from '@/assets/customers/kubesphere.svg';
import momenta           from '@/assets/customers/momenta.svg';
import logo360           from '@/assets/customers/logo360.svg';
import tilaa             from '@/assets/customers/tilaa.svg';
import olares            from '@/assets/customers/olares.svg';
import changan           from '@/assets/customers/changan.svg';
import stategrid         from '@/assets/customers/stategrid.svg';

const logos = [
  { img: boncloud,          title: 'BONC Cloud' },
  { img: ecloud,            title: 'China Mobile Cloud' },
  { img: ctyun,             title: 'China Telecom Cloud' },
  { img: tencent,           title: 'Tencent' },
  { img: xiaomi,            title: 'Xiaomi' },
  { img: pingan,            title: 'Ping An' },
  { img: weipinhui,         title: 'VIP.com' },
  { img: kuaishou,          title: 'Kwai' },
  { img: tigerbrokers,      title: 'Tiger Brokers' },
  { img: zhongxinzhengquan, title: 'CITIC Securities' },
  { img: sealos,            title: 'SealOS' },
  { img: fastgpt,           title: 'FastGPT' },
  { img: kubesphere,        title: 'KubeSphere' },
  { img: momenta,           title: 'Momenta' },
  { img: logo360,           title: '360' },
  { img: tilaa,             title: 'Tilaa' },
  { img: olares,            title: 'Olares' },
  { img: changan,           title: 'Changan Automobile' },
  { img: stategrid,         title: 'State Grid' },
];

export default function TrustedBy() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const border = theme.palette.divider;
  const t3     = isDark ? '#6e7681' : '#64748B';
  const logoFilter = isDark ? 'none' : 'brightness(0) opacity(0.5)';

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, overflow: 'hidden' }}>
      {/* Label */}
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '11px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: 'text.disabled',
          mb: 4,
        }}
      >
        Trusted by Engineering Teams at Scale
      </Typography>

      {/* Marquee — full width, no container */}
      <Box
        sx={{
          maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
            '&:hover': { animationPlayState: 'paused' },
            '@keyframes marquee': {
              '0%':   { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' },
            },
          }}
        >
          {[...logos, ...logos].map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                mx: 1.25, px: 2.25, py: 0.875,
                borderRadius: '999px',
                border: `1px solid ${border}`,
                bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Image
                src={item.img}
                alt={item.title}
                height={18}
                style={{ filter: logoFilter, opacity: 0.65, display: 'block' }}
              />
              <Typography component="span" sx={{ fontSize: '0.78rem', fontWeight: 500, color: t3, whiteSpace: 'nowrap' }}>
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
