const aws = require("aws-sdk");
const s3 = new aws.S3();
class AwsS3{
    
    async delete(key){
        return await s3.deleteObject({
            Key:key,
            Bucket: process.env.BUCKET_NAME
        }).promise()
    }
    
}

module.exports = new AwsS3()