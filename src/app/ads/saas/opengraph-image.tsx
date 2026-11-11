import { articleOgImageFrom, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/article-og';

export const alt = "SaaS PPC: the Google Ads decisions that set your payback";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImageFrom({
    title: "SaaS PPC: the Google Ads decisions that set your payback",
    subtitle: "SaaS PPC decisions the playbooks skip: what to count as a conversion, competitor keywords and trademarks, brand budgets, payback math, SaaS negatives.",
    category: 'google-ads',
    readTime: '8 min read',
    chip: 'Industries',
  });
}
