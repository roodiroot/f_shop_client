export function convertToStrapiFilters(urlFilters: Record<string, string[]>) {
  const gqlFilters: Record<string, any> = {};

  let sort: string | null = null;
  let page: number | null = null;
  let pageSize: number | null = null;

  Object.entries(urlFilters).forEach(([key, values]) => {
    if (key === "sort") {
      sort = values[0] ?? null;
      return;
    }

    if (key === "page") {
      page = Number(values[0]) || 1;
      return;
    }

    if (key === "pageSize") {
      pageSize = Number(values[0]) || null;
      return;
    }

    if (values.length > 0) {
      gqlFilters[key] = { in: values };
    }
  });

  return {
    filters: gqlFilters,
    sort: sort ? [sort] : undefined,
    pagination: {
      page: page ?? 1,
      pageSize: pageSize ?? 12,
    },
  };
}
