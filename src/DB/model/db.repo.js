export async function findOneDoc({ model, filter, projection, options } = {}) {
  return await model.findOne(filter, projection, options);
}
export async function createDoc({ model, insertedData, options } = {}) {
  return await model.create([insertedData], options);
}
