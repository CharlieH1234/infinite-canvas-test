# Supabase Setup Guide for Infinite Canvas App

This guide will walk you through setting up your Supabase project for the Infinite Canvas App.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in or create an account
2. Click "New Project" and select a organization (or create a new one)
3. Enter project details:
   - Name: `infinite-canvas-app` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the region closest to your users
4. Click "Create new project" and wait for it to be created (this may take a few minutes)

## 2. Get API Credentials

1. Once your project is created, go to the project dashboard
2. In the left sidebar, click on the gear icon (Settings)
3. Click on "API" in the settings menu
4. You'll find your:
   - Project URL (`https://[project-id].supabase.co`)
   - `anon` public key
5. Copy these values to your `.env.local` file:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 3. Set Up Database Schema

1. In the Supabase dashboard, go to the "SQL Editor" section
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql` into the editor
4. Click "Run" to execute the SQL commands
5. Verify that the tables were created by checking the "Table Editor" section

## 4. Create Storage Bucket

1. In the Supabase dashboard, go to the "Storage" section
2. Click "Create a new bucket"
3. Enter the name: `canvas-images`
4. Make sure "Public bucket" is **unchecked** (we want private access)
5. Click "Create bucket"

## 5. Set Up Storage Policies

1. After creating the bucket, click on the "Policies" tab
2. Click "New Query" in the SQL Editor
3. Copy and paste the contents of `supabase/storage.sql` into the editor
4. Click "Run" to execute the SQL commands
5. Verify that the policies were applied by checking the policies tab in the Storage section

## 6. Enable Authentication (Optional for initial setup)

1. Go to the "Authentication" section in the Supabase dashboard
2. Under "Providers", enable the authentication methods you want to use:
   - Email (enabled by default)
   - OAuth providers like Google, GitHub, etc. (optional)
3. Configure any additional authentication settings as needed

## 7. Test the Connection

1. Make sure your `.env.local` file has the correct Supabase URL and anon key
2. Run your app with `npm start` or `npx expo start`
3. Verify that the app can connect to Supabase by checking the console logs

## Troubleshooting

- If you encounter CORS errors, make sure your app's URL is added to the allowed origins in the Supabase API settings
- For authentication issues, check that you're using the correct API keys
- For database errors, verify that the tables and policies were created correctly

## Next Steps

After completing this setup, you can proceed with implementing the remaining features of the Infinite Canvas App, knowing that your backend infrastructure is ready to support them.
