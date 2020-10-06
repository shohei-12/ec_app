import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import ImageArea from "../components/Products/ImageArea";
import { saveProduct } from "../reducks/products/operations";
import { db } from "../firebase";
import { SetSizeArea } from "../components/Products";
import { Categories } from "../reducks/products/types";

const ProductEdit: React.FC = () => {
  const dispatch = useDispatch();

  const id = window.location.pathname.split("/")[3];

  const initialCategories: Categories[] = [];
  const initialImages: { id: string; path: any }[] = [];
  const initialSizes: { size: string; quantity: number }[] = [];

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState(initialCategories),
    [gender, setGender] = useState(""),
    [images, setImages] = useState(initialImages),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState(initialSizes);

  const inputName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  useEffect(() => {
    if (id) {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()!;
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setImages(data.images);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list: Categories[] = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data() as Categories;
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label="商品名"
          multiline={false}
          required={true}
          rows="1"
          value={name}
          type="text"
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label="商品説明"
          multiline={true}
          required={true}
          rows="5"
          value={description}
          type="text"
          onChange={inputDescription}
        />
        <SelectBox
          label="カテゴリー"
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label="性別"
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label="価格"
          multiline={false}
          required={true}
          rows="1"
          value={price}
          type="number"
          onChange={inputPrice}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label="商品情報を保存"
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  images,
                  price,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
