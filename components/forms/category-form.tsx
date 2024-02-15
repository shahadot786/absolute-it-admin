"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { useToast } from "../ui/use-toast";
import { AlertModal } from "../modal/alert-modal";
import { addDoc, collection, db, updateDoc, doc, deleteDoc } from "@/firebase";
import { COLLECTION } from "@/constants/data";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please write a category" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: {
    id: string;
    name: string;
  } | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category." : "Add a new Category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const toastDescription = initialData
    ? "Category updated successfully"
    : "A new category will be created";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        id: new Date().getTime().toString(),
        name: "",
      };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: CategoryFormValues) => {
    const updatedData = { ...data, id: new Date().getTime() };
    try {
      setLoading(true);
      if (initialData) {
        const updateRef = doc(
          db,
          COLLECTION.categories,
          initialData?.id?.toString()
        );
        await updateDoc(updateRef, updatedData);
      } else {
        // Add a new document with a generated id.
        await addDoc(collection(db, COLLECTION.categories), updatedData);
      }
      router.refresh();
      router.push(`/dashboard/frontend/categories`);
      toast({
        variant: "default",
        title: toastMessage,
        description: toastDescription,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteDoc(
        doc(db, COLLECTION.categories, initialData?.id ? initialData?.id : "")
      );
      router.refresh();
      router.push(`/dashboard/frontend/categories`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
