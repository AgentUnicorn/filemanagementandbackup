File Management and Backup Project
This project is a file management and backup system designed for seamless uploading, downloading, and sharing of files to and from AWS S3, with optional backup integration for Google Drive. It also supports generating and saving files as PDFs.

Table of Contents
Features
Technologies Used
Setup and Installation
Environment Variables
Usage
Project Structure
Acknowledgments
Features
File Upload and Review: Select files to upload from your device using Expo’s Document Picker and Image Picker.
Upload to S3: Store images and documents in AWS S3 for centralized management.
File Download: Retrieve files from S3 and save them locally.
Google Drive Integration: Backup files to Google Drive with a single click.
PDF Generation: Convert HTML content to a PDF and save it to your device.
Seamless Integration with Expo: Leverages Expo’s libraries for easy integration across platforms.
Technologies Used
React Native with Expo
AWS SDK v2 for S3 integration
Expo Document Picker
Expo Image Picker
Expo File System and Expo Media Library for file management
Expo Print for generating PDFs
Setup and Installation
Prerequisites
Node.js and npm
Expo CLI (npm install -g expo-cli)
AWS account and S3 bucket with access credentials
Installation
Clone the repository:

bash
Copy code
git clone <repo-url>
cd <repo-directory>
Install dependencies:

bash
Copy code
npm install
Set up your environment variables (see below for required keys).

Environment Variables
Create a .env file in the root of your project with the following variables:

plaintext
Copy code
EXPO_PUBLIC_AWS_BUCKET_NAME=<your-aws-bucket-name>
EXPO_PUBLIC_AWS_REGION=<your-aws-region>
EXPO_PUBLIC_AWS_KEY=<your-aws-access-key-id>
EXPO_PUBLIC_AWS_SECRET=<your-aws-secret-access-key>
To work with Google Drive, set up OAuth credentials and add GOOGLE_API_CLIENT_ID and GOOGLE_API_CLIENT_SECRET to the .env file.

Usage
1. Upload Files
   Select files via Document Picker or Image Picker.
   Choose to upload to AWS S3 with generated pre-signed URLs for each file.
2. Download Files
   Use the Download button under each image to save it from S3 to your device’s local storage.
3. Backup to Google Drive
   Select files to back up to Google Drive for additional redundancy.
4. Generate PDFs
   Generate a PDF from HTML content and save it directly to the device.
   Project Structure
   bash
   Copy code
   /project-root
   │
   ├── src
   │   ├── components
   │   │   ├── ImageUpload.js      # Component for uploading images
   │   │   ├── FileDownload.js     # Component for downloading files from S3
   │   │   ├── GoogleDriveUpload.js # Component for uploading files to Google Drive
   │   │   └── PdfGeneration.js    # Component for PDF generation using Expo Print
   │   ├── screens
   │   │   └── ImageDisplayScreen.js # Main screen showing uploaded images
   │   └── utils
   │       └── awsConfig.js         # AWS configuration and helpers
   │
   ├── .env                         # Environment variables
   └── README.md                    # Project documentation
   Acknowledgments
   Expo for cross-platform support
   AWS SDK for S3 integration
   React Native community for resources and support