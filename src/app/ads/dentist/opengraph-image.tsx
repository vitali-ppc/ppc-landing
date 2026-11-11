import { articleOgImageFrom, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/article-og';

export const alt = "Google Ads for Dentists: Campaign Structure, Tracking and Budget Math";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImageFrom({
    title: "Google Ads for Dentists: Campaign Structure, Tracking and Budget Math",
    subtitle: "How to run Google Ads for a dental practice: separate campaigns by service, track booked appointments, respect health ad policy, set budget from cost per new patient.",
    category: 'google-ads',
    readTime: '10 min read',
    chip: 'Industries',
  });
}
