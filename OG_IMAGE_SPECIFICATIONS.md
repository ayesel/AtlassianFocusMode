# Open Graph Preview Image Specifications

## Image Requirements

### Dimensions
- **Required Size**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **File Format**: PNG (recommended) or JPG
- **File Size**: Keep under 8MB, ideally under 1MB for faster loading
- **File Name**: `og-preview.png`

### Where to Place the Image
Place the image file in your `public` folder:
```
/public/og-preview.png
```

This will make it accessible at: `https://atlassianfocusmode.netlify.app/og-preview.png`

## Recommended Design for Your Preview Image

### Layout Structure
Create a preview image that showcases:

1. **Top Section (30% of image)**
   - JIRA Focus Mode logo/title prominently displayed
   - Atlassian-style branding (blue accent colors: #0052CC, #DEEBFF)
   - Tagline: "Cross-Organizational Knowledge Discovery"

2. **Middle Section (50% of image)**
   - Screenshot of the Focus Mode interface showing:
     - The main ticket view (PT-1)
     - The Focus Mode panel with insight cards
     - Visible team badges (Research, Platform, Product teams)
     - Search bar with AI-powered search indicator

3. **Bottom Section (20% of image)**
   - Key benefits/features:
     - "Surface hidden insights across teams"
     - "AI-powered knowledge discovery"
     - "Break down organizational silos"
   - Author credit: "UX Case Study by Ayre Davis"

### Visual Style Guidelines
- **Background**: Clean white or light gray (#F4F5F7)
- **Typography**: Sans-serif (preferably matching Atlassian's font stack)
- **Colors**: 
  - Primary: #0052CC (Atlassian blue)
  - Secondary: #36B37E (Success green)
  - Accent: #FFAB00 (Warning orange)
- **Ensure high contrast** for text readability
- **Include subtle shadows** for depth
- **Keep it clean and professional**

## Alternative Quick Solution

If you need a quick solution, you can:

1. Take a high-quality screenshot of your Focus Mode in action
2. Use a tool like Figma, Canva, or Photoshop to:
   - Resize to 1200x630px
   - Add a title overlay at the top
   - Add your name/credit at the bottom
   - Ensure the key features are visible and legible

## Testing Your Preview

After deploying, test your preview using:
1. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Implementation Checklist

- [ ] Create preview image (1200x630px)
- [ ] Save as `og-preview.png` in `/public` folder
- [ ] Deploy to Netlify
- [ ] Test with LinkedIn Post Inspector
- [ ] Clear cache if preview doesn't update immediately

## Notes

- LinkedIn caches preview images, so changes may take time to appear
- Use the LinkedIn Post Inspector to force a cache refresh
- Consider creating multiple versions for A/B testing
- The image should work without text (be visually compelling on its own)