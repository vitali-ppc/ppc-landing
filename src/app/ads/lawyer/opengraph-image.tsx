import { articleOgImageFrom, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/article-og';

export const alt = "Google Ads for Lawyers: Practice-Area Campaigns, Case Tracking and Budget Math";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImageFrom({
    title: "Google Ads for Lawyers: Practice-Area Campaigns, Case Tracking and Budget Math",
    subtitle: "How to run Google Ads for a law firm: one campaign per practice area, Google's audience limits, LSA verification, signed-case tracking and a break-even budget.",
    category: 'google-ads',
    readTime: '10 min read',
    chip: 'Industries',
  });
}
