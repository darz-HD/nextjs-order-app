import Head from "next/head";
import { useRouter } from "next/router";
import NewProductForm from "../../components/products/NewProductForm";
import { Fragment } from "react";

function NewProductPage() {
  const router = useRouter();
  async function addProductHandler(enteredProductData) {
    //fetch from internal api created from api folder
    const response = await fetch("/api/new-product", {
      method: "POST",
      body: JSON.stringify(enteredProductData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);
    //redirect to homepage
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add Product</title>
        <meta name="description" content="Add your own meetups" />
      </Head>
      <NewProductForm onAddProduct={addProductHandler} />
    </Fragment>
  );
}

export default NewProductPage;
