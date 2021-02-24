const algoliasearch = require("algoliasearch");
const path = require("path");

const updateIndex = async (appId, indexName, filePath, adminKey) => {
  const client = algoliasearch(appId, ALGOLIA_ADMIN_KEY);

  const resolvedPath = require.resolve(filePath, { paths: [process.cwd()] });
  const objects = require(resolvedPath);

  const index = client.initIndex(indexName);
  await index.replaceAllObjects(objects);

  console.log("Updated algolia index");
};

module.exports = {
  onSuccess: async (
    { inputs, constants: { PUBLISH_DIR }, netlifyConfig: { context }, utils },
  ) => {
    if (context !== "production") {
      console.log(`Skipping Algolia index refresh (context is ${context})`);
    }

    const { ALGOLIA_ADMIN_KEY } = process.env;
    const { appId, indexName, filePath } = inputs;

    if (!ALGOLIA_ADMIN_KEY) {
      utils.build.failPlugin("Environment variable ALGOLIA_ADMIN_KEY not set");
      return;
    }

    const fullPath = path.join(PUBLISH_DIR, filePath);
    console.log(
      `Refreshing Algolia index ${indexName} (in ${appId}) with data from ${fullPath}`,
    );

    try {
      await updateIndex(appId, indexName, fullPath, ALGOLIA_ADMIN_KEY);
    } catch (error) {
      console.log(error);
      utils.build.failPlugin(`Could not update index: ${error.message}`);
    }
  },
};
