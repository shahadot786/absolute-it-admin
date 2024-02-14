/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { CategoryTable } from "@/components/tables/category-tables/category-table";
import { columns } from "@/components/tables/category-tables/columns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { COLLECTION, Category } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { collection, db, getDocs } from "@/firebase";

type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
};

type ParamsProps = {
  searchParams: SearchParams;
};

const breadcrumbItems = [
  { title: "Categories", link: "/dashboard/frontend/categories" },
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
          collection(db, COLLECTION.categories)
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setCategoryData(data);
        setTotalCategory(data.length);
        setPageCount(Math.ceil(data.length / pageLimit));
      } catch (error) {}
    }
    fetchData();
  }, []);

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
