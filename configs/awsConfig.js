import AWS from 'aws-sdk';

const awsBucket = process.env.EXPO_PUBLIC_AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    region: process.env.EXPO_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.EXPO_PUBLIC_AWS_KEY,
        secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET,
    },
});

export { s3, awsBucket };