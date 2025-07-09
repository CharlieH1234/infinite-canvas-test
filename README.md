# Infinite Canvas App

A cross-platform infinite canvas application that works on both mobile (iOS/Android) and web. The app allows users to create visual boards with images, drawings, and eventually connectors between elements.

![Infinite Canvas App](https://github.com/user-attachments/assets/240398a3-2ebf-4edc-bdf5-36812765e39b)

## Table of Contents

- [Project Overview](#project-overview)
- [Development Phases](#development-phases)
- [Task Tracker](#task-tracker)
- [Setup Instructions](#setup-instructions)
- [Architecture Decisions](#architecture-decisions)
- [Progress Tracking](#progress-tracking)
- [Known Issues](#known-issues)
- [Testing Checklist](#testing-checklist)
- [Foundation Components](#foundation-components)

## Project Overview

This project extends the [react-native-free-canvas](https://github.com/doublelam/react-native-free-canvas) repository with image management features and cloud collaboration capabilities. The application is built using React Native Skia for high-performance canvas rendering across all platforms.

### Core Requirements

#### Phase 1: Image Management (MVP)

**Image Upload**
- Image picker for mobile (camera roll/camera)
- File upload for web
- Support formats: JPEG, PNG, WebP
- Maximum file size: 10MB

**Image Manipulation**
- Add images to canvas at tap/click location
- Select images by tapping
- Move/reposition selected images
- Resize images with pinch gesture (mobile) or corner handles (web)
- Delete selected images
- Layer management (bring to front/send to back)

**Canvas Features**
- Maintain existing drawing tools from base repo
- Infinite canvas with smooth pan/zoom
- Canvas state persistence (local storage initially)
- Export canvas as image (PNG/JPEG)

#### Phase 2: Enhanced Features

**Selection & Multi-select**
- Lasso selection tool
- Multi-select with modifier keys (web) or long press (mobile)
- Group/ungroup elements

**Advanced Image Features**
- Image cropping
- Basic filters (brightness, contrast, saturation)
- Image rotation
- Opacity adjustment

**Connector Lines**
- Draw bezier curve connectors between images
- Snap connectors to image edges
- Adjustable line styles (color, width, dashed)

#### Phase 3: Collaboration & Cloud

**Supabase Integration**
- User authentication (email/password, OAuth)
- Canvas storage in PostgreSQL
- Image storage in Supabase Storage buckets
- Auto-save functionality with debouncing
- Version history with snapshots

**Sharing & Collaboration**
- Share canvas via Supabase-generated links
- Real-time collaboration using Supabase Realtime
- Presence indicators (who's viewing/editing)
- Permission management (view/edit roles)
- Export options (PDF, SVG)

### Technical Specifications

**Tech Stack**
- Framework: React Native with Expo (managed workflow)
- Canvas Engine: React Native Skia
- Navigation: Expo Router
- State Management: Zustand
- Gesture Handling: React Native Gesture Handler
- Image Picker: Expo Image Picker
- Storage:
  - Local: Expo SecureStore & AsyncStorage
  - Cloud: Supabase (PostgreSQL + Storage)
- Authentication: Supabase Auth
- Real-time: Supabase Realtime (for collaboration)
- Testing: Jest, React Native Testing Library

**Platform-Specific Considerations**
- iOS: Minimum iOS 13.0 (Expo requirement)
- Android: Minimum API 21 (Android 5.0)
- Web: Modern browsers (Chrome, Firefox, Safari, Edge)
- Expo SDK: Version 50 or later

**Performance Requirements**
- 60 FPS during canvas interactions
- Image loading should not block UI
- Lazy loading for off-screen images
- Memory management for large canvases

### Project Structure

```
src/
├── components/
│   ├── Canvas/
│   │   ├── InfiniteCanvas.tsx
│   │   ├── CanvasImage.tsx
│   │   └── CanvasControls.tsx
│   ├── ImagePicker/
│   ├── Toolbar/
│   └── LayerPanel/
├── hooks/
│   ├── useImageManager.ts
│   ├── useCanvasState.ts
│   ├── useSupabase.ts
│   └── useGestures.ts
├── lib/
│   ├── supabase.ts
│   └── storage.ts
├── utils/
│   ├── imageProcessing.ts
│   └── canvasHelpers.ts
└── types/
    └── canvas.types.ts
```

## Development Phases

### Setup Phase (Day 1)
- Fork and clone react-native-free-canvas
- Set up Expo development environment
- Create Supabase project and configure database
- Set up environment variables for Supabase
- Create project structure
- Set up TypeScript configuration
- Configure Expo Router
- Initialize testing framework
- Create README with PRD and task tracker

### Phase 1 Implementation (Days 2-5)
- Implement Expo Image Picker integration
- Create CanvasImage component
- Add image selection system
- Implement move/resize functionality
- Add delete functionality
- Implement layer management
- Set up Supabase Storage for images
- Add local storage persistence with AsyncStorage
- Implement export functionality with Expo MediaLibrary

### Phase 2 Implementation (Days 6-8)
- Add Supabase authentication
- Implement canvas saving to Supabase
- Add image upload to Supabase Storage
- Create canvas listing/loading functionality
- Implement auto-save with debouncing
- Add version history

### Testing Phase (Day 9)
- Unit tests for image management
- Integration tests for canvas interactions
- Test Supabase integration
- Platform-specific testing (iOS, Android, Web)
- Performance profiling
- Bug fixes and optimizations

### Documentation (Day 10)
- API documentation
- User guide
- Supabase setup guide
- Contributing guidelines
- Deployment instructions for Expo

## Task Tracker

### Setup Phase
- [x] Fork and clone react-native-free-canvas
- [x] Set up Expo development environment
- [x] Create Supabase project (setup files and guide created)
- [x] Set up database schema (SQL files created)
- [x] Create storage buckets (configuration files created)
- [x] Set up environment variables (.env.local template created)
- [x] Create project folder structure
- [x] Set up TypeScript configuration
- [x] Configure Expo Router
- [x] Initialize Jest testing framework

### Phase 1: Image Management
- [x] Implement Expo Image Picker for mobile
- [x] Implement file upload for web
- [x] Create CanvasImage component
- [x] Create useImageManager hook
- [x] Create useCanvasState hook for state management
- [x] Create LayerPanel component
- [x] Create Toolbar component
- [x] Create CanvasControls component
- [ ] Add image selection system
- [ ] Implement move functionality for images
- [ ] Implement resize functionality (pinch/handles)
- [ ] Add delete functionality for images
- [ ] Implement layer management (z-index control)
- [ ] Set up local storage with AsyncStorage
- [ ] Implement canvas export to PNG/JPEG

### Phase 2: Enhanced Features
- [ ] Implement lasso selection tool
- [ ] Add multi-select functionality
- [ ] Create group/ungroup functionality
- [ ] Implement image cropping
- [ ] Add basic image filters
- [ ] Add image rotation
- [ ] Implement opacity adjustment
- [ ] Create bezier curve connector system
- [ ] Add connector edge snapping
- [ ] Implement connector style options

### Phase 3: Collaboration & Cloud
- [ ] Set up Supabase authentication
- [ ] Implement canvas storage in PostgreSQL
- [ ] Configure image storage in Supabase
- [ ] Create auto-save functionality
- [ ] Implement version history system
- [ ] Add canvas sharing functionality
- [ ] Implement real-time collaboration
- [ ] Add presence indicators
- [ ] Create permission management system
- [ ] Implement advanced export options (PDF/SVG)

### Testing
- [ ] Unit tests for image management
- [ ] Integration tests for canvas interactions
- [ ] Supabase integration tests
- [ ] Platform-specific testing
- [ ] Performance profiling
- [ ] Cross-browser testing
- [ ] Stress testing with large canvases

## Setup Instructions

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Copy `.env.local.template` to `.env.local`
   - Fill in your Supabase credentials
4. Start the development server: `npm start` or `npx expo start`

### Environment Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Add them to your `.env.local` file:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### Database Setup
Execute the following SQL in your Supabase SQL editor to set up the required tables:

```sql
-- Create canvases table
CREATE TABLE canvases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create canvas versions table for history
CREATE TABLE canvas_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  canvas_id UUID REFERENCES canvases(id) ON DELETE CASCADE,
  version_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE canvases ENABLE ROW LEVEL SECURITY;
ALTER TABLE canvas_versions ENABLE ROW LEVEL SECURITY;

-- Canvas policies
CREATE POLICY "Users can view their own canvases" 
  ON canvases FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own canvases" 
  ON canvases FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own canvases" 
  ON canvases FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own canvases" 
  ON canvases FOR DELETE 
  USING (auth.uid() = user_id);

-- Canvas versions policies
CREATE POLICY "Users can view versions of their own canvases" 
  ON canvas_versions FOR SELECT 
  USING (auth.uid() = (SELECT user_id FROM canvases WHERE id = canvas_id));

CREATE POLICY "Users can create versions of their own canvases" 
  ON canvas_versions FOR INSERT 
  WITH CHECK (auth.uid() = (SELECT user_id FROM canvases WHERE id = canvas_id));
```

### Storage Setup
1. Create a new storage bucket called `canvas-images`
2. Set the following bucket policy:
   ```sql
   CREATE POLICY "Users can upload their own images"
     ON storage.objects FOR INSERT
     WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
   
   CREATE POLICY "Users can view their own images"
     ON storage.objects FOR SELECT
     USING (auth.uid()::text = (storage.foldername(name))[1]);
   ```

3. Install dependencies
```bash
npm install
```

4. Install core dependencies
```bash
npx expo install expo-image-picker expo-secure-store @react-native-async-storage/async-storage
npm install @supabase/supabase-js zustand
```

5. Ensure React Native Skia is properly configured for Expo
```bash
npx expo install @shopify/react-native-skia
```

6. Set up Supabase
   - Create a project at [supabase.com](https://supabase.com)
   - Add your Supabase URL and anon key to `.env.local`
   - Set up database schema and storage buckets (see below)

7. Start the project
```bash
npx expo start
```
Then press 'i' for iOS, 'a' for Android, or 'w' for web

### Supabase Configuration

Create the following database schema in your Supabase project:

```sql
-- Canvases table
CREATE TABLE canvases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Canvas versions for history
CREATE TABLE canvas_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  canvas_id UUID REFERENCES canvases(id) ON DELETE CASCADE,
  version_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sharing permissions
CREATE TABLE canvas_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  canvas_id UUID REFERENCES canvases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  permission TEXT CHECK (permission IN ('view', 'edit')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Create the following storage buckets:
- `canvas-images`: For uploaded images
- `canvas-exports`: For exported canvases
- `canvas-thumbnails`: For canvas preview images

## Architecture Decisions

### React Native Skia for Canvas Rendering
We chose to extend the react-native-free-canvas library which uses React Native Skia for several reasons:
- High-performance rendering across platforms
- Hardware acceleration for smooth interactions
- Unified API for iOS, Android and Web
- Excellent gesture handling integration
- Support for complex drawing operations

### Expo Managed Workflow
Expo provides a streamlined development experience:
- Quick setup across platforms
- Built-in polyfills for web support
- Simple deployment process
- Comprehensive native module access
- Consistent behavior across environments

### Zustand for State Management
Zustand was selected for state management due to:
- Minimal boilerplate compared to Redux
- Great performance with React Native
- Simple API with hooks-based approach
- Easy integration with persistence solutions
- Support for middleware and devtools

### Supabase for Backend
Supabase provides a complete backend solution:
- PostgreSQL database for robust storage
- Built-in authentication system
- Storage buckets for media files
- Realtime subscriptions for collaboration
- Row-level security for permissions

### Component Isolation Strategy
Components are organized by functionality:
- Canvas components focused on rendering
- Tool components for user interactions
- UI components for interface elements
- Hooks for shared functionality
- Utilities for helper functions

## Progress Tracking

### Current Sprint Status
- Sprint: Setup Phase
- Start Date: July 8, 2025
- End Date: July 18, 2025
- Completion: 70%

### Milestone Progress
- [x] Project Setup: 70%
- [ ] MVP Features: 20%
- [ ] Enhanced Features: 0%
- [ ] Cloud Collaboration: 0%
- [x] Documentation: 60%

### Recent Updates
- Project initialized with Expo configuration
- TypeScript configuration completed
- Jest testing framework set up
- Core component structure implemented
- Hooks for canvas state, gestures, and Supabase created
- Expo Router configured for navigation
- Project structure and architecture defined

## Project Structure

```
infinite-canvas-app/
├── assets/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Expo Router pages
│   │   ├── _layout.tsx     # Root layout with navigation setup
│   │   └── index.tsx       # Main canvas screen
│   ├── components/         # React components
│   │   ├── Canvas/         # Canvas-related components
│   │   │   ├── InfiniteCanvas.tsx
│   │   │   └── CanvasImage.tsx
│   │   ├── Controls/       # UI controls
│   │   │   ├── CanvasControls.tsx
│   │   │   └── ImagePickerButton.tsx
│   │   ├── LayerPanel/     # Layer management
│   │   │   └── LayerPanel.tsx
│   │   └── Toolbar/        # Tool selection
│   │       └── Toolbar.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useCanvasState.ts
│   │   ├── useGestures.ts
│   │   └── useSupabase.ts
│   ├── lib/                # External libraries and wrappers
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── .env.local              # Environment variables (gitignored)
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── eas.json                # EAS Build configuration
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Jest setup
├── metro.config.js         # Metro bundler configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Known Issues

*This section will be updated as issues are discovered during development.*

## Testing Checklist

### Unit Tests
- [ ] Canvas state management
- [ ] Image manipulation functions
- [ ] Selection system
- [ ] Connector logic
- [ ] Layer management

### Integration Tests
- [ ] Canvas-image interaction
- [ ] Selection and manipulation
- [ ] Persistence and loading
- [ ] Export functionality
- [ ] Multi-object operations

### Platform Tests
- [ ] iOS functionality
- [ ] Android functionality
- [ ] Web functionality
- [ ] Responsive layout
- [ ] Touch vs. mouse interactions

### Performance Tests
- [ ] Canvas with 100+ images
- [ ] Smooth pan/zoom at 60 FPS
- [ ] Memory usage monitoring
- [ ] Load time optimization
- [ ] Network efficiency (Supabase)

## Foundation Components

The base react-native-free-canvas library provides these features:

### Canvas Features
- Freehand drawing
- Pan and zoom capability
- Undo functionality
- Canvas clearing
- Stroke customization
- Path effects for smoother lines
- Export to base64/image

### Available Methods
- `reset()`: Clears the canvas
- `resetZoom(duration?)`: Resets canvas zoom level
- `undo(step?)`: Undoes drawing action(s)
- `toBase64(format?, quality?)`: Exports canvas as base64 string
- `getSnapshot()`: Creates image snapshot
- `toPaths()`: Gets array of drawn paths
- `drawPaths(paths)`: Draws paths onto canvas

For more details on the foundation library, see the [original documentation](https://github.com/doublelam/react-native-free-canvas).

---

*This README serves as the single source of truth for the Infinite Canvas App project, keeping both human developers and AI assistants aligned on project goals and current progress.*
