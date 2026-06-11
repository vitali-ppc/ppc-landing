import { articleOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/article-og';
import { postBySlug } from '../../../lib/posts';

const SLUG = 'the-complete-guide-to-google-ads-quality-score-in-2025';

export const alt = postBySlug(SLUG)?.title ?? 'Kampaio';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return articleOgImage(SLUG);
}
