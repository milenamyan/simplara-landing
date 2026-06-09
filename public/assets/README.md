# SIMPLARA Assets Folder

Place your brand assets here:

## Required Assets

1. **logo.png** - SIMPLARA brand logo
   - Recommended size: 512x512px
   - Format: PNG with transparency
   - Used in: Hero, Footer

2. **lumi.png** - LUMI mascot character
   - Recommended size: 1024x1024px
   - Format: PNG with transparency
   - Used in: Hero, Meet LUMI section

## Optional Assets

3. **og-image.png** - Open Graph image for social sharing
   - Recommended size: 1200x630px
   - Format: PNG or JPG

4. **favicon.ico** - Browser favicon
   - Size: 32x32px
   - Format: ICO

## Placeholders

Currently using emoji placeholders:
- 👔 for logo
- 🐱 for LUMI

Replace these by updating the import statements in the respective components.

## Integration Example

```tsx
import Image from "next/image";
import logo from "@/public/assets/logo.png";

<Image src={logo} alt="SIMPLARA" width={48} height={48} />
```
