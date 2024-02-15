"use client";
import BreadCrumb from "@/components/breadcrumb";
import { CategoryForm } from "@/components/forms/category-form";
import { NAV_TITLE, ROUTE_LINK } from "@/constants/data";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const serializedData = searchParams.get("data") ?? "";
  const data =
    serializedData === ""
      ? null
      : JSON.parse(decodeURIComponent(serializedData));

  const breadcrumbItems = [
    { title: NAV_TITLE.categories, link: ROUTE_LINK.categories },
    { title: "Create", link: `${ROUTE_LINK.categories}/create` },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <CategoryForm initialData={data} />
    </div>
  );
}
