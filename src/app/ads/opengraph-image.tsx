import { articleOgImageFrom, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/article-og';

export const alt = "Google Ads for Local Business: Which Campaign Type, What Budget, Which Industry Page";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImageFrom({
    title: "Google Ads for Local Business: Which Campaign Type, What Budget, Which Industry Page",
    subtitle: "Google Ads for local business: when to use Local Services Ads, Search or Performance Max, how to target your area, track calls and size a budget.",
    category: 'google-ads',
    readTime: '9 min read',
    chip: 'Industries',
  });
}
