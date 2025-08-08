"use client";
import createProductsColumns from "@/components/dashboard/columns/product-columns";
import CreateProductDrawer from "@/components/dashboard/products/create-product-drawer";
import DeleteProductDialog from "@/components/dashboard/products/delete-product-dialog";
import ProductDetailsDrawer from "@/components/dashboard/products/product-details-drawer";
import UpdateProductDrawer from "@/components/dashboard/products/update-product-drawer";
import { TableDataView } from "@/components/dashboard/tables/table-data-view";
import { TableFilter } from "@/components/dashboard/tables/table-filter";
import { TablePagination } from "@/components/dashboard/tables/table-pagination";
import MainButton from "@/components/shared/main-button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useProducts from "@/hooks/dashboard/use-products";
import { useTable } from "@/hooks/dashboard/use-table";
import { Product } from "@/types/product";
import { IconBuildingStore } from "@tabler/icons-react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ProductTablePage() {
  const { products, isLoading, error } = useProducts();
  const t = useTranslations();
  const [tabValues, setTabValues] = useState<"allProducts">("allProducts");

  const [openDrawerFormCreate, setOpenDrawerFormCreate] =
    useState<boolean>(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<
    Product["select"] | null
  >(null);
  const [selectedProductUpdate, setSelectedProductUpdate] = useState<
    Product["select"] | null
  >(null);
  const [selectedProductsDelete, setSelectedProductsDelete] = useState<
    Product["select"][] | null
  >(null);
  console.log(products);

  const columns = createProductsColumns(t, {
    setSelectedProductDetails,
    setSelectedProductUpdate,
    setSelectedProductsDelete,
  });

  const { table, setData } = useTable({
    initialData: products!,
    columns,
  });

  if (isLoading) {
    return;
  }

  if (error) {
    throw new Error("Products not found", { cause: "PRODUCT_NOT_FOUND" });
  }

  const productsTabs = [
    {
      value: "allProducts",
      Icon: IconBuildingStore,
      onAction: () => {
        setTabValues("allProducts");
        setData(products);
      },
    },
  ];

  return (
    <Tabs defaultValue="allProducts">
      <MainButton
        text={t("createProduct")}
        className="w-fit"
        Icon={Plus}
        onClick={() => setOpenDrawerFormCreate(true)}
      />

      <TableFilter tabs={productsTabs} table={table} />
      <TabsContent
        value={tabValues}
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <TableDataView table={table} columns={columns} />
        <TablePagination table={table} />
      </TabsContent>

      {selectedProductsDelete && (
        <DeleteProductDialog
          open={!!selectedProductsDelete}
          products={selectedProductsDelete}
          setOpen={(open) => !open && setSelectedProductsDelete(null)}
        />
      )}

      {selectedProductDetails && (
        <ProductDetailsDrawer
          open={!!selectedProductDetails}
          setOpen={(open) => !open && setSelectedProductDetails(null)}
          product={selectedProductDetails}
        />
      )}

      {openDrawerFormCreate && (
        <CreateProductDrawer
          openDrawer={openDrawerFormCreate}
          setOpenDrawer={setOpenDrawerFormCreate}
        />
      )}

      {selectedProductUpdate && (
        <UpdateProductDrawer
          openDrawer={!!selectedProductUpdate}
          setOpenDrawer={(open) => !open && setSelectedProductUpdate(null)}
          product={selectedProductUpdate}
        />
      )}
    </Tabs>
  );
}
