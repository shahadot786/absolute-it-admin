/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { CategoryTable } from "@/components/tables/category-tables/category-table";
import { columns } from "@/components/tables/category-tables/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { COLLECTION, Category, NAV_TITLE, ROUTE_LINK } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { collection, db, getDocs, orderBy, query } from "@/firebase";

type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
};

type ParamsProps = {
  searchParams: SearchParams;
};

const breadcrumbItems = [
  { title: NAV_TITLE.categories, link: ROUTE_LINK.categories },
];

export default function Page({ searchParams }: ParamsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [totalCategory, setTotalCategory] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, COLLECTION.categories), orderBy("id", "desc"))
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          icon: doc.data().icon,
        }));
        setCategoryData(data);
        setTotalCategory(data.length);
        setPageCount(Math.ceil(data.length / pageLimit));
      } catch (error) {}
    }
    fetchData();
  }, [getDocs]);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Categories(${totalCategory})`}
            description="Manage categories"
          />
          <Link
            href={"/dashboard/frontend/categories/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <CategoryTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalCategory={totalCategory}
          data={categoryData}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
