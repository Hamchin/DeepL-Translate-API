# DeepL-Translate-API

## API

| Method | Endpoint |
| - | - |
| GET | /translate |

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
$ mkdir nodejs
$ npm install
$ mv package-lock.json node_modules ./nodejs
$ zip -r package.zip ./nodejs
```

## API Gateway

- Use Lambda Proxy Integration.
- Enable CORS.

### /translate - GET

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
