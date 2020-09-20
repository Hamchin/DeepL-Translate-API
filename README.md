# Google Translate

## API

#### Request

| Key | Type | Description |
| - | - | - |
| text | String | Text to be translated. |
| source | String | Language before translation. |
| target | String | Language after translation. |

#### Response

| Key | Type | Description |
| - | - | - |
| source | String | Text before translation. |
| target | String | Text after translation. |

# DeepL Translate

## Lambda Function

| Attribute | Content |
| - | - |
| Name | DeepLTranslateAPI |
| Runtime | Node.js 12.x |
| Memory | 1600 MB |
| Timeout | 30 seconds |
| File | index.js |

### Role

| Attribute | Content |
| - | - |
| Name | LambdaAccess2CloudWatchLogs |
| Policy | CloudWatchLogsFullAccess |

## Lambda Layer

| Attribute | Content |
| - | - |
| Name | Puppeteer |
| Runtime | Node.js 12.x |

To create zip file:

```
$ mkdir nodejs && cd $_
$ npm install chrome-aws-lambda
$ npm install puppeteer-core
$ cd ../
$ zip -r package.zip ./nodejs
```

## API Gateway

- Use Lambda Proxy Integration.
- Enable CORS.

### GET /translate

#### Request Parameters

| Key | Type | Description |
| - | - | - |
| text | String | Text to be translated. |
| source | String | Language before translation. |
| target | String | Language after translation. |

#### Response Body

| Key | Type | Description |
| - | - | - |
| source | String | Text before translation. |
| target | String | Text after translation. |
