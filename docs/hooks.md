# Hooks

Bud provides a system of 'hooks' to expose values for modification.

## bud.hooks.on

Hooks are defined as functions. Hook functions are registered with `bud.hooks.on`

`bud.hooks.on` takes two parameters:

- The `name` of the hook.
- A function to filter the associated value through.

### Usage

Add a new entry to the `webpack.externals` configuration:

```js
bud.hooks.on('build/externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

## bud.hooks.filter

Filters are registered with `bud.hooks.filter`.

`bud.hooks.filter` takes two parameters:

- The `name` of the `filter` to hook onto.
- The `value` which is being filtered

### Usage

A `value` is passed through the `my.filter.key` filter.

```js
const filteredValue = bud.hooks.filter("my.filter.key", value);
```

Now, the user and other extensions have access to this value and can modify it.

```js
bud.hooks.on("my.filter.key", (value) => value.shift());
```
