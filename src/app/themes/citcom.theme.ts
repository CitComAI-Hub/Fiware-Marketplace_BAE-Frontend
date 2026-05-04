import { NavLink, ThemeConfig } from './theme.interfaces';

const citcomHeaderLinks: NavLink[] = [
  {
    label: 'HEADER._home',
    url: '/dashboard',
    isRouterLink: true
  },
  {
    label: 'HEADER._browse',
    id: 'searchDropdown',
    children: [
      { label: 'HEADER._services', url: '/search', isRouterLink: true },
      { label: 'HEADER._catalogs', url: '/catalogues', isRouterLink: true }
    ]
  }
];

export const CITCOM_THEME_CONFIG: ThemeConfig = {
  name: 'CITCOM',
  displayName: 'Citcom AI Marketplace',
  browserTitle: 'Marketplace - Citcom.ai',
  assets: {
    logoUrl: 'assets/themes/citcom-ai/logo-citcom.png',
    faviconUrl: 'assets/themes/citcom-ai/favicon.ico',
    jumboBgUrl: 'assets/themes/citcom-ai/onboarding-hero.webp',
    cardDefaultBgUrl: 'assets/themes/citcom-ai/eu-co-funded.png'
  },
  links: {
    headerLinks: citcomHeaderLinks,
    linkedin: 'https://www.linkedin.com',
    youtube: 'https://www.youtube.com',
    twitter: 'https://x.com'
  },
  dashboard: {
    showFeaturedOfferings: true,
    showPlatformBenefits: false,
  }
};
