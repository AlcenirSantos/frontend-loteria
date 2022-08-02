export function transformParams(
  params?: Record<string, any>,
  sort?: Record<string, API.SortOrder>,
) {
  if (sort) {
    const sortsKeys = Object.keys(sort);
    if (sortsKeys.length > 0) {
      const sortFunc =
        sort[sortsKeys[0]] === 'ascend'
          ? sort[sortsKeys[0]].slice(0, 3).toUpperCase()
          : sort[sortsKeys[0]].slice(0, 4).toUpperCase();

      return {
        ...params,
        page: params?.current ? params?.current - 1 : params?.current,
        sorter: sortsKeys.length > 0 ? `${sortsKeys[0].toUpperCase()}_${sortFunc}` : null,
        limit: params?.pageSize,
      };
    }
  }

  return {
    ...params,
    page: params?.current ? params?.current - 1 : params?.current,
    limit: params?.pageSize,
  };
}
