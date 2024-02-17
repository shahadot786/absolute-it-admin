"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useImageUpload from "@/hooks/useImageUpload";
import Image from "next/image";
import { ImageModal } from "../modal/image-modal";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please write a category" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: {
    id: string;
    name: string;
    priority: string;
    icon: string;
  } | null;
}

interface CategoryPriority {
  id: number;
  name: string;
  slug: string;
}

const PriorityData: CategoryPriority[] = [
  {
    id: 1010,
    name: "Featured",
    slug: "featured",
  },
  {
    id: 2020,
    name: "High",
    slug: "high",
  },
  {
    id: 3030,
    name: "Medium",
    slug: "medium",
  },
  {
    id: 4040,
    name: "Low",
    slug: "low",
  },
];

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category." : "Add a new Category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const toastDescription = initialData
    ? "Category updated successfully"
    : "A new category will be created";
  const action = initialData ? "Save changes" : "Create";
  const { imageUrl, setImage, uploadImage, error } =
    useImageUpload("Category-Icon");

  const defaultValues = initialData
    ? initialData
    : {
        id: new Date().getTime().toString(),
        name: "",
        priority: "",
        icon: "",
      };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    uploadImage();
  };
  const onSubmit = async (data: CategoryFormValues) => {
    const updatedData = {
      ...data,
      id: new Date().getTime(),
      icon: imageUrl ? imageUrl : initialData?.icon,
    };

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
        if (imageUrl === "") {
          return;
        }
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
      setLoading(false);
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
      <ImageModal
        isOpen={openImage}
        onClose={() => setOpenImage(false)}
        onConfirm={() => setOpenImage(false)}
        loading={loading}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleUpload={handleUpload}
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
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={"Select a priority"}
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="bottom">
                      {PriorityData.map((priority) => (
                        <SelectItem
                          key={priority?.id}
                          value={`${priority?.slug}`}
                        >
                          {priority?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <div>
                <Button
                  onClick={() => setOpenImage(true)}
                  variant={"outline"}
                  disabled={loading}
                >
                  Upload Icon
                </Button>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    width={30}
                    height={30}
                    alt="Category Icon"
                    className="mt-1"
                  />
                )}
              </div>
            </FormItem>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
