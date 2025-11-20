# Publishing Guide

This guide explains how to package and publish `@blogflow/sdk` to npm.

## Prerequisites

### 1. Ensure You're Logged into npm

```bash
# Check login status
npm whoami

# If not logged in, execute login
npm login

# Enter your npm username, password, and email
```

### 2. Ensure You Have Access to @blogflow Organization

If you haven't created the `@blogflow` organization yet:

1. Visit [npm website](https://www.npmjs.com/)
2. Log in to your account
3. Go to [Organizations](https://www.npmjs.com/org/create) to create an organization
4. Organization name: `blogflow`
5. Choose the free plan (Public packages)

Or, if you're already an organization member, ensure you have publish permissions.

### 3. Verify package.json Configuration

Ensure the configuration in `package.json` is correct:

```json
{
  "name": "@blogflow/sdk",
  "version": "0.1.0",
  "publishConfig": {
    "access": "public"
  }
}
```

## Publishing Steps

### Step 1: Update Version Number

Before publishing, update the version number. Follow [Semantic Versioning](https://semver.org/):

```bash
# Patch version (0.1.0 -> 0.1.1) - Bug fixes
npm version patch

# Minor version (0.1.0 -> 0.2.0) - New features
npm version minor

# Major version (0.1.0 -> 1.0.0) - Breaking changes
npm version major
```

Or manually edit the `version` field in `package.json`.

### Step 2: Build Project

```bash
npm run build
```

This will:
- Clean the `dist/` directory
- Compile TypeScript code
- Generate CommonJS and ESM formats
- Generate type definition files (.d.ts)
- Generate source maps

### Step 3: Check Build Results

```bash
# View dist directory contents
ls dist/

# You should see:
# - index.js (CommonJS)
# - index.mjs (ESM)
# - index.d.ts (TypeScript type definitions)
# - index.d.mts (ESM type definitions)
# - index.js.map (source map)
# - index.mjs.map (source map)
```

### Step 4: Test Installation (Optional but Recommended)

Before publishing, you can test local installation:

```bash
# In project root directory
npm pack

# This will generate a .tgz file, e.g.: blogflow-sdk-0.1.0.tgz
# You can test installation in another project:
# npm install /path/to/blogflow-sdk-0.1.0.tgz
```

### Step 5: Publish to npm

```bash
# Publish to npm
npm publish
```

If this is the first time publishing to the `@blogflow` organization, npm may prompt you to confirm.

### Step 6: Verify Publication

After successful publication, you can verify:

```bash
# View package information
npm view @blogflow/sdk

# Or visit
# https://www.npmjs.com/package/@blogflow/sdk
```

## Publishing Command Summary

```bash
# Complete publishing process (one command)
npm version patch && npm run build && npm publish

# Or execute step by step
npm version patch    # Update version number
npm run build        # Build
npm publish          # Publish
```

## Common Issues

### 1. Publication Failed: Organization Permission Required

**Error Message:**
```
npm ERR! 403 You do not have permission to publish "@blogflow/sdk"
```

**Solution:**
- Ensure you are a member of the `@blogflow` organization
- Ensure you have publish permissions
- Check that the `name` field in `package.json` is correct

### 2. Publication Failed: Version Already Exists

**Error Message:**
```
npm ERR! 403 You cannot publish over the previously published versions
```

**Solution:**
- Update version number: `npm version patch`

### 3. Publication Failed: Not Logged In

**Error Message:**
```
npm ERR! 401 Unauthorized
```

**Solution:**
```bash
npm login
```

### 4. How to Unpublish (Within 24 Hours)

If you discover an issue after publishing, you can unpublish within 24 hours:

```bash
# Unpublish specific version
npm unpublish @blogflow/sdk@0.1.0

# Note: After unpublishing, you must wait 24 hours before republishing the same version
```

## Automated Publishing (Optional)

You can use GitHub Actions to automate the publishing process. Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Version Management Recommendations

- **0.x.x** - Development phase, API may be unstable
- **1.x.x** - Stable version, API backward compatible
- **x.0.0** - Major changes, may break backward compatibility

Before each release:
1. Update CHANGELOG.md (if exists)
2. Update version number
3. Commit Git tags: `git tag v0.1.0 && git push --tags`

## Publishing Checklist

- [ ] Code tested
- [ ] Version number updated
- [ ] `package.json` configuration correct
- [ ] Ran `npm run build`
- [ ] Checked `dist/` directory contents
- [ ] Logged into npm (`npm whoami`)
- [ ] Have `@blogflow` organization permissions
- [ ] README.md updated (if needed)
- [ ] Ready to publish

## Support

If you have questions, please contact:
- **Author:** [Ausdata Science Pty Ltd](https://ausdata.ai)
- **Support:** [Ausdata Lab](https://ausdata.org)
