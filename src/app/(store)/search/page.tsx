import React from "react";

interface params {
  query: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: params;
}) {
  const { query } = await searchParams;
  return <div>Search for {query}</div>;
}
