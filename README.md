# File Management and Backup Project

This project is a file management and backup system designed for seamless uploading, downloading, and sharing of files to and from AWS S3, with optional backup integration for Google Drive. It also supports generating and saving files as PDFs.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## Features

- **File Upload and Review**: Select files to upload from your device using Expo’s Document Picker and Image Picker.
- **Upload to S3**: Store images and documents in AWS S3 for centralized management.
- **File Download**: Retrieve files from S3 and save them locally.
- **Google Drive Integration**: Backup files to Google Drive with a single click.
- **PDF Generation**: Convert HTML content to a PDF and save it to your device.
- **Seamless Integration with Expo**: Leverages Expo’s libraries for easy integration across platforms.

## Technologies Used

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- [AWS SDK v2](https://www.npmjs.com/package/aws-sdk) for S3 integration
- [Expo Document Picker](https://docs.expo.dev/versions/latest/sdk/document-picker/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Expo File System](https://docs.expo.dev/versions/latest/sdk/filesystem/) and [Expo Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/) for file management
- [Expo Print](https://docs.expo.dev/versions/latest/sdk/print/) for generating PDFs

## Setup and Installation

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- AWS account and S3 bucket with access credentials

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Set up your environment variables (see below for required keys).

Environment Variables

Create a .env file in the root of your project with the following variables:

```bash
EXPO_PUBLIC_AWS_BUCKET_NAME=<your-aws-bucket-name>
EXPO_PUBLIC_AWS_REGION=<your-aws-region>
EXPO_PUBLIC_AWS_KEY=<your-aws-access-key-id>
EXPO_PUBLIC_AWS_SECRET=<your-aws-secret-access-key>
```

## Usage

1. Upload Files
- Select files via Document Picker or Image Picker.
- Choose to upload to AWS S3 with generated pre-signed URLs for each file.

2. Download Files
- Use the Download button under each image to save it from S3 to your device’s local storage.

3. Generate PDFs
- Generate a PDF from HTML content and save it directly to the device.

## Acknowledgments

- [Expo](https://expo.dev/) for cross-platform support
- [AWS SDK v2](https://www.npmjs.com/package/aws-sdk) for S3 integration

