const FlattenData = (data) => {
  return data.map((item) => ({
    _id: item._id,
    name: `${item.user.name.first} ${item.user.name.last}`,
    age: item.user.age,
  }));
};
export default FlattenData;
