# Lazy Loading & Skeleton Loaders Implementation Guide

## Overview

Your website has been enhanced with comprehensive lazy loading and skeleton loader components to improve performance and user experience. This implementation includes:

1. **Image Lazy Loading** - Images load only when they enter the viewport
2. **Section Lazy Loading** - Below-the-fold sections load on scroll
3. **Skeleton Screens** - Beautiful placeholder loaders while content is loading
4. **Code Splitting Ready** - Components set up for React.lazy() and Suspense

## Components Added

### 1. Lazy Image Component (`src/components/LazyImage.tsx`)

The `LazyImage` component replaces standard `<img>` tags with intelligent lazy loading.

**Features:**
- Uses Intersection Observer API
- Shows animated skeleton while loading
- Caches images in memory
- Error handling with fallback UI
- 50px root margin for early loading

**Usage:**
```tsx
import LazyImage from "@/components/LazyImage";

<LazyImage
  src={imageUrl}
  alt="Description"
  containerClassName="w-full h-64 rounded-lg"
  className="w-full h-full object-cover"
  onLoadingComplete={() => console.log("Image loaded!")}
/>
```

### 2. Skeleton Components (`src/components/skeletons/`)

Multiple skeleton variants for different layouts:

- **SkeletonCard** - Card placeholder (vertical, horizontal, featured)
- **SkeletonArticleGrid** - Grid of 3 article cards
- **SkeletonHero** - Large hero section placeholder
- **SkeletonSidebar** - Sidebar with recommended articles
- **SkeletonSection** - Generic section placeholder (card, grid, carousel)

**Usage:**
```tsx
import { SkeletonSection } from "@/components/skeletons";

<Suspense fallback={<SkeletonSection variant="grid" count={4} />}>
  <YourComponent />
</Suspense>
```

### 3. Lazy Load Section Component (`src/components/LazyLoadSection.tsx`)

Wraps sections to load them only when visible on screen.

**Features:**
- Intersection Observer based
- Customizable root margin
- Fallback skeleton support
- Memory efficient

**Usage:**
```tsx
import LazyLoadSection from "@/components/LazyLoadSection";
import { SkeletonSection } from "@/components/skeletons";

<LazyLoadSection fallback={<SkeletonSection />}>
  <ExpensiveComponent />
</LazyLoadSection>
```

### 4. Lazy Component Loader (`src/components/LazyComponentLoader.tsx`)

Wraps components with Suspense and skeleton loaders (for future code splitting).

**Usage:**
```tsx
import LazyComponentLoader from "@/components/LazyComponentLoader";

<LazyComponentLoader
  component={MyComponent}
  skeletonVariant="grid"
  skeletonCount={6}
/>
```

## Updated Components

The following components now use `LazyImage`:

1. **PostCard** - All image variants (vertical, horizontal, featured)
2. **ArticleGrid** - Article thumbnails
3. **HeroArticle** - Background cover image
4. **FeaturedSection** - Featured article image
5. **RecommendedSidebar** - Recommended article images
6. **BestOfMonth** - Article cards in grid
7. **ArticlePage** - Main article cover + related articles
8. **Index Page** - Below-the-fold sections wrapped with LazyLoadSection

## Performance Improvements

### Image Loading
- **Before:** All images load immediately on page load
- **After:** Images load only when ~50px from viewport
- **Result:** Reduced initial load time, lower bandwidth usage

### Section Loading
- **Before:** All sections rendered on initial page load
- **After:** Below-the-fold sections render on scroll
- **Result:** Faster Time to Interactive (TTI), better Core Web Vitals

### Visual Experience
- **Skeleton Screens:** Smooth animations instead of sudden content pop
- **Perceived Performance:** Users see content appearing progressively
- **No Layout Shift:** Skeletons maintain proper dimensions

## Configuration

### Image Lazy Loading Options

Adjust the root margin in `LazyImage.tsx` to control when images start loading:

```tsx
rootMargin: "50px" // Load when 50px before entering viewport
// Increase for earlier loading, decrease for later loading
```

### Section Lazy Loading Options

Customize section loading behavior in `LazyLoadSection.tsx`:

```tsx
<LazyLoadSection
  options={{ 
    rootMargin: "100px", // Adjust preloading distance
    threshold: 0.1 // Percentage of element that must be visible
  }}
>
  <Component />
</LazyLoadSection>
```

## Browser Support

All components use native browser APIs:
- **Intersection Observer API** - Supported in all modern browsers (IE 11 polyfill available)
- **Image Loading** - Works with all image formats

## Best Practices

### 1. Use LazyImage for all user images
```tsx
// ✅ Good
<LazyImage src={userImage} alt="User avatar" />

// ❌ Avoid
<img src={userImage} alt="User avatar" />
```

### 2. Provide appropriate dimensions
```tsx
// ✅ Good - prevents layout shift
<LazyImage
  src={image}
  containerClassName="w-full h-64"
  className="w-full h-full object-cover"
/>

// ❌ Avoid - causes layout shift
<LazyImage src={image} />
```

### 3. Wrap below-the-fold sections
```tsx
// ✅ Good - lazy loads section
<LazyLoadSection fallback={<SkeletonSection />}>
  <ExpensiveSection />
</LazyLoadSection>

// ❌ Avoid - renders immediately
<ExpensiveSection />
```

### 4. Match skeleton to content
```tsx
// ✅ Good
<Suspense fallback={<SkeletonCard variant="featured" />}>
  <FeaturedArticle />
</Suspense>

// ❌ Avoid - mismatched skeleton
<Suspense fallback={<SkeletonCard variant="vertical" />}>
  <FeaturedArticle />
</Suspense>
```

## Future Enhancements

### Code Splitting with React.lazy()
```tsx
const TrendingSection = lazy(() => import("@/components/TrendingBlogSection"));

<Suspense fallback={<SkeletonSection variant="grid" />}>
  <TrendingSection />
</Suspense>
```

### Blurhash/LQIP Placeholders
Add low-quality image placeholders:
```tsx
<LazyImage
  src={fullQualityImage}
  placeholder={blurHashImage}
/>
```

### WebP Format Support
Serve multiple formats for better compression:
```tsx
<picture>
  <source srcSet={webpImage} type="image/webp" />
  <LazyImage src={jpgImage} alt="..." />
</picture>
```

## Testing & Monitoring

### Manual Testing
1. Open DevTools Network tab
2. Throttle to slow network
3. Scroll slowly through page
4. Observe images loading as they come into view
5. Check skeleton animations

### Performance Metrics
Monitor these metrics before/after:
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Cumulative Layout Shift (CLS)**
- **Time to Interactive (TTI)**

### Browser DevTools
- Use Lighthouse for audit scores
- Check Performance tab for rendering performance
- Use Coverage tab to identify unused code

## Troubleshooting

### Images not loading
1. Check browser console for errors
2. Verify image URLs are correct
3. Check CORS headers if cross-origin
4. Test with `loading="lazy"` as fallback

### Skeleton not showing
1. Verify component is wrapped in Suspense
2. Ensure fallback prop is provided
3. Check that component is actually async

### Performance still slow
1. Verify lazy loading is working (Network tab)
2. Check image file sizes (compress with tools like TinyPNG)
3. Consider reducing number of images on page
4. Monitor JavaScript bundle size

## Files Modified

- `src/components/PostCard.tsx` - Updated with LazyImage
- `src/components/ArticleGrid.tsx` - Updated with LazyImage
- `src/components/HeroArticle.tsx` - Updated with LazyImage
- `src/components/FeaturedSection.tsx` - Updated with LazyImage
- `src/components/RecommendedSidebar.tsx` - Updated with LazyImage
- `src/components/BestOfMonth.tsx` - Updated with LazyImage
- `src/pages/ArticlePage.tsx` - Updated with LazyImage + skeletons
- `src/pages/Index.tsx` - Wrapped sections with LazyLoadSection

## Files Created

- `src/components/LazyImage.tsx` - Lazy image loading component
- `src/components/LazyComponentLoader.tsx` - Component lazy loading wrapper
- `src/components/LazyLoadSection.tsx` - Section lazy loading wrapper
- `src/components/skeletons/SkeletonCard.tsx` - Card skeleton
- `src/components/skeletons/SkeletonArticleGrid.tsx` - Grid skeleton
- `src/components/skeletons/SkeletonHero.tsx` - Hero skeleton
- `src/components/skeletons/SkeletonSidebar.tsx` - Sidebar skeleton
- `src/components/skeletons/SkeletonSection.tsx` - Generic section skeleton
- `src/components/skeletons/index.ts` - Barrel export

## Need Help?

Refer to these resources:
- [MDN Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Suspense Documentation](https://react.dev/reference/react/Suspense)
- [React lazy() Documentation](https://react.dev/reference/react/lazy)
- [Web Performance Best Practices](https://web.dev/performance/
