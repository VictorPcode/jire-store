import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/react';
import axiosAPI from '../service/FetchServices'
import { ProductsSet } from '../service/interface'
import React, {useEffect, useState} from 'react'


const Grid = () => {
            
   const [products, setProducts] = useState<ProductsSet[]>([])
   useEffect(() => {
    axiosAPI.get('/products')
      .then((json) => {
        const response = json;
        const productSetter: ProductsSet[]  = []
        const dataProducts = response.data.map((item: ProductsSet) => (
          productSetter.push({
            image: item.image,
            price: item.price,
            title: item.title,
            id: item.id,
            description: item.description,
            category: item.category,
            rating: item.rating,
          })
        ))
        setProducts(productSetter);
      })
      .catch((err) => console.log(err));
      console.log(products)
  }, []);
   

  return (
 // En tu componente
   <React.Fragment>
            
            {products.map((item, index) => (
                <IonCard key={index}>
                <IonImg src={item.image} alt={item.title} />
                <IonCardHeader>
                  <IonCardTitle>{item.title}</IonCardTitle>
                  <IonCardSubtitle>Price: {item.price} $</IonCardSubtitle>
                </IonCardHeader>
          
                <IonCardContent>{item.description}</IonCardContent>
              </IonCard>
              ))}
             
  </React.Fragment>
  )
}

Grid.propTypes = {}

export default Grid

