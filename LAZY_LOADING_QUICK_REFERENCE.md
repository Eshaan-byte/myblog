# Lazy Loading - Quick Reference

## Quick Start Examples

### Example 1: Lazy Loading Article Images
```tsx
import LazyImage from "@/components/LazyImage";

// Before:
<img src={article.coverImage} alt={article.title} className="w-full h-full" />

// After:
<LazyImage 
  src={article.coverImage} 
  alt={article.title}
  containerClassName="w-full h-full rounded-lg"
  className="w-full h-full object-cover"
/>
```

### Example 2: Lazy Loading Sections
```tsx
import LazyLoadSection from "@/components/LazyLoadSection";
import { SkeletonSection } from "@/components/skeletons";

// Before:
<SectionComponent />

// After:
<LazyLoadSection 
  fallback={<SkeletonSection variant="grid" count={4} />}
>
  <SectionComponent />
</LazyLoadSection>
```

### Example 3: Multiple Skeleton Variants
```tsx
// For image grid
<SkeletonSection variant="grid" count={6} />

// For carousel
<SkeletonSection variant="carousel" count={4} />

// For list/cards
<SkeletonSection variant="card" count={3} />

// For article cards specifically
<SkeletonArticleGrid />

// For hero section
<SkeletonHero />

// For sidebar
<SkeletonSidebar />
```

### Example 4: Avatar Images
```tsx
<LazyImage
  src={user.avatar}
  alt={user.name}
  containerClassName="w-10 h-10 rounded-full flex-shrink-0"
  className="w-full h-full object-cover rounded-full"
/>
```

### Example 5: Full Featured Post Card
```tsx
import LazyImage from "@/components/LazyImage";

<div className="rounded-2xl overflow-hidden h-[320px]">
  <LazyImage
    src={post.image}
    alt={post.title}
    containerClassName="h-full w-full"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
  <div className="absolute bottom-4 left-4">
    <h3>{post.title}</h3>
  </div>
</div>
```

## Skeleton Components Breakdown

### SkeletonCard Variants
```tsx
import { SkeletonCard } from "@/components/skeletons";

// Vertical card (default)
<SkeletonCard variant="vertical" />

// Horizontal card (thumbnail + text)
<SkeletonCard variant="horizontal" />

// Featured large card
<SkeletonCard variant="featured" />
```

### Custom Skeleton Grid
```tsx
import { SkeletonSection } from "@/components/skeletons";

<SkeletonSection 
  variant="grid"     // 'card', 'grid', 'carousel'
  count={6}          // Number of items
/>
```

## Common Patterns

### Pattern 1: Image with Fallback
```tsx
<LazyImage
  src={article.coverImage || defaultImage}
  alt={article.title}
  containerClassName="w-full h-48 rounded-lg"
  className="w-full h-full object-cover"
  onLoadingComplete={() => console.log("Loaded!")}
/>
```

### Pattern 2: Loading State Hook (for advanced usage)
```tsx
import { useState } from "react";
import LazyImage from "@/components/LazyImage";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div>
      {isLoading && <SkeletonCard />}
      <LazyImage
        src={imageUrl}
        alt="..."
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
```

### Pattern 3: Lazy Load Multiple Sections
```tsx
import LazyLoadSection from "@/components/LazyLoadSection";

<div className="space-y-16">
  {/* Visible immediately */}
  <HeroSection />
  <FeaturedSection />
  
  {/* Lazy loads on scroll */}
  <LazyLoadSection 
    fallback={<SkeletonSection variant="grid" />}
  >
    <TrendingSection />
  </LazyLoadSection>
  
  <LazyLoadSection 
    fallback={<SkeletonSection variant="grid" />}
  >
    <TutorialsSection />
  </LazyLoadSection>
  
  <LazyLoadSection 
    fallback={<SkeletonSection variant="carousel" />}
  >
    <ResourcesSection />
  </LazyLoadSection>
</div>
```

### Pattern 4: Image Grid with Lazy Loading
```tsx
import LazyImage from "@/components/LazyImage";

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {articles.map(article => (
    <div key={article.id} className="rounded-lg overflow-hidden">
      <LazyImage
        src={article.image}
        alt={article.title}
        containerClassName="w-full h-48"
        className="w-full h-full object-cover"
      />
      <div className="p-4">
        <h3>{article.title}</h3>
      </div>
    </div>
  ))}
</div>
```

### Pattern 5: Thumbnail in List Item
```tsx
<div className="flex gap-3">
  <LazyImage
    src={item.thumbnail}
    alt={item.title}
    containerClassName="w-16 h-16 flex-shrink-0 rounded"
    className="w-full h-full object-cover rounded"
  />
  <div>
    <h4>{item.title}</h4>
    <p>{item.description}</p>
  </div>
</div>
```

## CSS Classes Reference

### Container Classes
```css
/* Standard 16:9 ratio */
containerClassName="w-full h-screen"

/* Square image */
containerClassName="w-32 h-32"

/* Responsive height */
containerClassName="w-full h-48 md:h-64 lg:h-96"

/* With border radius */
containerClassName="rounded-lg"
containerClassName="rounded-full" /* for avatars */
containerClassName="rounded-2xl"
```

### Image Classes
```css
/* Object fit options */
className="w-full h-full object-cover"
className="w-full h-full object-contain"
className="w-full h-full object-fill"

/* With hover effects */
className="w-full h-full object-cover group-hover:scale-105 transition-transform"

/* Opacity effects */
className="w-full h-full object-cover opacity-50"
```

## Performance Tips

### 1. Use Appropriate Image Sizes
```tsx
// ✅ Use responsive image sizes
src={getImageUrl(width)}

// ❌ Loading huge images unnecessarily
src={largeHighResImage}
```

### 2. Specify Dimensions to Prevent Layout Shift
```tsx
// ✅ Good - prevents Cumulative Layout Shift
containerClassName="w-full h-64"

// ❌ Bad - causes layout shift
containerClassName="w-full" // height unknown
```

### 3. Use Appropriate Root Margin
```tsx
// In LazyImage.tsx, adjust:
rootMargin: "100px"  // Load earlier for above-fold
rootMargin: "50px"   // Default, balanced
rootMargin: "0px"    // Load only when visible
```

### 4. Compress Images Before Uploading
- Use TinyPNG, ImageOptim, or similar
- Target: 
  - Thumbnails: 50-100KB
  - Article images: 200-400KB
  - Hero images: 400-600KB

## Browser DevTools Debugging

### Check if LazyImage is working
1. Open DevTools → Network tab
2. Filter by images
3. Scroll page slowly
4. Verify images load as they enter viewport

### Monitor Performance
1. Open DevTools → Performance tab
2. Record page load
3. Look for rendering times
4. Compare with/without lazy loading

### Check Cumulative Layout Shift
1. DevTools → Lighthouse
2. Run audit
3. Look for CLS score (should be < 0.1)
4. Check for layout shift warnings

## Troubleshooting Checklist

- [ ] Images have correct src URLs
- [ ] Container has defined dimensions
- [ ] Using LazyImage component, not <img>
- [ ] Fallback/placeholder images are provided
- [ ] Sections wrapped with LazyLoadSection are below-the-fold
- [ ] Skeleton variants match content type
- [ ] No console errors in DevTools
- [ ] Network throttling shows progressive loading
- [ ] Images are compressed appropriately

## Further Reading

- [Lazy Loading Best Practices](https://web.dev/lazy-loading-best-practices/)
- [Optimize Images for Web](https://web.dev/serve-images-webp/)
- [React Performance](https://react.dev/learn/render-and-commit)
