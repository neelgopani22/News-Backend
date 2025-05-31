export const fetch = (model: any, agg_pipeline: any = []) => {
  return new Promise<any[]>((resolve, reject) => {
    const hasSortStage = agg_pipeline.some((stage: { [key: string]: any }) =>
      stage.hasOwnProperty("$sort")
    );
    // Clone the aggregation pipeline to avoid modifying the original input
    let modifiedAggPipeline = [...agg_pipeline];
    // If there's no $sort stage, add a default sort by createdAt
    if (!hasSortStage) {
      modifiedAggPipeline.push({ $sort: { createdAt: -1 } });
    }
    try {
      model
        .aggregate(modifiedAggPipeline)

        .then((list: any[]) => {
          resolve(list);
        })
        .catch((error: any) => {
          console.error(error);
          reject(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
