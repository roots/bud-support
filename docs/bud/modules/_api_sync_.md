# Module: "api/sync"

## Functions

### sync

▸ **sync**(`_a`: any): _any_

Defined in api/sync.js:18

## bud.sync

Configure BrowserSync.

```js
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})
```

**Parameters:**

| Name | Type |
| ---- | ---- |
| `_a` | any  |

**Returns:** _any_