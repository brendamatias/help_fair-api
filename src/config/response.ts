const success = (data: any) => ({ status: 200, data });
const created = (data: any) => ({ status: 201, data });
const noContent = () => ({ status: 204, data: null });

export default {
  success,
  created,
  noContent,
};
