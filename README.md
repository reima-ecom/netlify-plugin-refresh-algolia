# Algolia Index Refresh Build Plugin

Build plugin to update an Algolia index based on a JSON file that is rendered into the publish directory. The index is only updated on production builds.

**The specified index will be cleared and then replaced with the records in the the JSON file.**

## Installation and Configuration

There are two ways to install a plugin on a Netlify site: with the Netlify UI or with file-based installation.

### UI-based Installation

Currently not supported.

### File-based Installation

1. Create a `netlify.toml` in the root of your project. Your file should include the plugins section below:

    ```toml
    [build]
      command = "hugo"
      publish = "public"

    [[plugins]]
      package = "netlify-plugin-refresh-algolia"
        [plugins.inputs]
        appId = "ALGOLIA_APP"
        indexName = "algolia-index"
    ```

2. From your project's base directory, use `npm`, `yarn`, or any other Node.js package manager to add this plugin to `devDependencies` in `package.json`.

    ```
    npm install -D netlify-plugin-refresh-algolia
    ```

    or

    ```
    yarn add -D netlify-plugin-refresh-algolia
    ```

Read more about [file-based plugin installation](https://docs.netlify.com/configure-builds/build-plugins/#file-based-installation) in our docs.

### Configuration

The Algolia app and index needs to be configured in the `netlify.toml` file and the `ALGOLIA_ADMIN_KEY` build environment variable needs to be set for authentication. See `manifest.yml` for details on the required inputs.
