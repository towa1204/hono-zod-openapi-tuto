# hono-zod-openapi-tuto

https://scrapbox.io/lsadsfj/Honoで簡単なREST_APIを開発する

### `ui/`

API仕様を確認できる

BASIC認証で保護

```
username: "user"
password: "password"
```

### `api/`

Bearer認証で保護

```
curl -X 'GET' 'http://localhost:8000/api/users/1212121' -H 'accept: application/json' -H 'Authorization: Bearer bearer-token'
```
