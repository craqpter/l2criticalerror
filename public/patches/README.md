# Patch Files Directory

This directory contains the latest patch files for the Lineage 2 CriticalError server.

## Adding New Patches

To add a new patch:

1. **Archive your patch files** into either:
   - `system.rar` (RAR format)
   - `system.7z` (7-Zip format)

2. **Replace the existing file** in this directory with your new patch archive

3. **The website will automatically serve the new patch** when users click the "Latest Patch Release" button

## File Structure

The patch archive should contain a `system` folder with all the necessary game files that need to be updated in the client.

## Supported Formats

- **RAR**: `system.rar`
- **7-Zip**: `system.7z`

The website currently serves `system.7z` by default. If you want to use RAR format, you'll need to update the download link in the React component.

## Instructions for Users

When users download the patch, they will see an overlay with step-by-step instructions:

1. Download Complete - The patch file has been downloaded
2. Extract the Archive - Use 7-Zip, WinRAR, or any archive extractor
3. Install the Patch - Copy the extracted system folder to the client directory
4. Restart Client - Close and restart the Lineage 2 client

## Technical Notes

- The patch file is served statically from `/patches/system.7z`
- The download is triggered via JavaScript using a temporary anchor element
- The overlay provides clear instructions for users who may not be familiar with patching

