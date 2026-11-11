import { articleOgImageFrom, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/article-og';

export const alt = "Google Ads for Real Estate Agents: Housing Rules, Campaign Split and Budget Math";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImageFrom({
    title: "Google Ads for Real Estate Agents: Housing Rules, Campaign Split and Budget Math",
    subtitle: "How to run Google Ads for real estate agents: Housing ad rules, buyer vs seller campaigns, lead quality, LSA, and a break-even budget per closed deal.",
    category: 'google-ads',
    readTime: '12 min read',
    chip: 'Industries',
  });
}
