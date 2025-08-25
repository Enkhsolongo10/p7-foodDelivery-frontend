export type Foods = {
  _id: string;
  foodName: string;
  price: number;  
  ingredients: string;
  image: string;
  category: string;
};

export type Category = {
  _id: string;
  categoryName: string;
};

export type FoodCardProps = {
  category: Category;
};

export type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients?: string;
  image?: string;   // optional болгож өг
  category?: string;
};



// export type FoodType = {
//   name: string;
//   category: string;
//   price: string;
//   image: string;
//   ingredients: string;
//   _id: string;
// };

// export type FormType = {
//   name: string;
//   price: string;
//   ingredients: string;
//   image: string;
//   category: string;
// };

// export type FoodCardProps = {
//   food: {
//     name: string;
//     price: number;
//     image?: string;
//     ingredients?: string;
//   };
// };


// export type Food = {
//   id: string;
//   name: string;
//   price: number;
//   image?: string;
//   ingredients?: string;
// };
