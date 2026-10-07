export async function findOne({ model, filter, projection, options } = {}) {
  const result = await model.findOne(filter, projection, options);
  return result;
}
export async function create({ model, data, options } = {}) {
  const result = await model.create([data], options);
  return result;
}
export async function findByIdAndUpdate({ model, id, data, options } = {}) {
  const result = await model.findByIdAndUpdate(id, data, options);
  return result;
}
export async function deleteOne({ model, filter, options } = {}) {
  const result = await model.deleteOne(filter, options);
  return result;
}
export async function updateMany({ model, filter, data, options } = {}) {
  const result = await model.updateMany(filter, data, options);
  return result;
}
export async function findByIdAndDelete({ model, id, options } = {}) {
  const result = await model.findByIdAndDelete(id, options);
  return result;
}
export async function find({ model, filter, projection, options } = {}) {
  const result = await model.find(filter, projection, options);
  return result;
}
export async function aggregate({ model, options } = {}) {
  const result = await model.aggregate(options);
  return result;
}
export async function deleteMany({ model, filter, options } = {}) {
  const result = await model.deleteMany(filter, options);
  return result;
}
