# Shopify Starter Theme

A Shopify starter with age gating, email prompts and some other utilites.

## Dependencies

-   [Node](http://nodejs.org/)
-   [Yarn](https://yarnpkg.com/en/)
-   [Shopify CLI](https://github.com/Shopify/shopify-cli)

## Setup

1. Install dev dependencies via

```
$ yarn
```

2. Log into Shopify store via CLI:

```
$ shopify login --store shopify-store
```

3. Start the Shopify dev server.

In package.json add --store=your-shopify-store-name
```
npm start
```

4. Start the dev server in another terminal process.

```
$ yarn start
```

## Publishing

1. Upload just theme files, ignoring data, to the theme of choice.

```
$ yarn theme:push:theme
```

## Updating content

1. Download theme content from live site

```
$ yarn theme:pull:data
```