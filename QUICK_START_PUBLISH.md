# Quick Publishing Guide

## One-Click Publish Commands

### Publish Patch Version (0.1.0 -> 0.1.1)
```bash
npm run publish:patch
```

### Publish Minor Version (0.1.0 -> 0.2.0)
```bash
npm run publish:minor
```

### Publish Major Version (0.1.0 -> 1.0.0)
```bash
npm run publish:major
```

## Manual Publishing Steps

### 1. Login to npm (if not logged in)
```bash
npm login
```

### 2. Build Project
```bash
npm run build
```

### 3. Update Version Number
```bash
# Method 1: Use npm command (will automatically update package.json and create git tag)
npm version patch   # or minor, major

# Method 2: Manually edit the version field in package.json
```

### 4. Publish
```bash
npm publish
```

## Pre-Publish Checks

```bash
# 1. Check login status
npm whoami

# 2. Preview what will be published
npm run preview

# 3. Check version number
cat package.json | grep version

# 4. Build and check
npm run build
ls dist/
```

## Verify Publication

After successful publication:

```bash
# View package information
npm view @blogflow/sdk

# Test installation
npm install @blogflow/sdk@latest
```

## Complete Example

```bash
# 1. Ensure logged in
npm whoami

# 2. Build
npm run build

# 3. Update version and publish
npm run publish:patch

# 4. Verify
npm view @blogflow/sdk
```

## Notes

1. **First Publication**: Ensure you are a member of the `@blogflow` organization with publish permissions
2. **Version Number**: Follow semantic versioning conventions
3. **Git Tags**: The `npm version` command will automatically create git tags, remember to push:
   ```bash
   git push && git push --tags
   ```

## Having Issues?

See detailed guide: `PUBLISH.md`
